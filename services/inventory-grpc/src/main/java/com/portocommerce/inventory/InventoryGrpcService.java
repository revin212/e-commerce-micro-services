package com.portocommerce.inventory;

import com.portocommerce.contracts.inventory.*;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@GrpcService
public class InventoryGrpcService extends InventoryServiceGrpc.InventoryServiceImplBase {
  private final InventoryRepository inventoryRepository;
  private final KafkaTemplate<String, String> kafkaTemplate;

  public InventoryGrpcService(InventoryRepository inventoryRepository, KafkaTemplate<String, String> kafkaTemplate) {
    this.inventoryRepository = inventoryRepository;
    this.kafkaTemplate = kafkaTemplate;
  }

  @Override
  public void checkAvailability(CheckAvailabilityRequest request, StreamObserver<CheckAvailabilityResponse> responseObserver) {
    var item = inventoryRepository.findById(request.getProductId());
    int remaining = item.map(i -> i.getOnHand() - i.getReserved()).orElse(0);
    responseObserver.onNext(CheckAvailabilityResponse.newBuilder().setAvailable(remaining >= request.getQuantity()).setRemaining(Math.max(remaining, 0)).build());
    responseObserver.onCompleted();
  }

  @Override
  @Transactional
  public void reserveStock(ReserveStockRequest request, StreamObserver<ReserveStockResponse> responseObserver) {
    for (ReserveLine line : request.getLinesList()) {
      InventoryRecord item = inventoryRepository.findById(line.getProductId()).orElse(null);
      if (item == null || (item.getOnHand() - item.getReserved()) < line.getQuantity()) {
        responseObserver.onError(Status.FAILED_PRECONDITION.withDescription("Insufficient stock").asRuntimeException());
        return;
      }
    }
    request.getLinesList().forEach(line -> {
      InventoryRecord item = inventoryRepository.findById(line.getProductId()).orElseThrow();
      item.setReserved(item.getReserved() + line.getQuantity());
      inventoryRepository.save(item);
    });
    String reservationId = "res_" + UUID.randomUUID();
    kafkaTemplate.send("inventory.reservation.created", request.getOrderId(), "{\"orderId\":\"" + request.getOrderId() + "\",\"reservationId\":\"" + reservationId + "\"}");
    responseObserver.onNext(ReserveStockResponse.newBuilder().setReservationId(reservationId).setStatus("reserved").build());
    responseObserver.onCompleted();
  }

  @Override
  public void releaseReservation(ReleaseReservationRequest request, StreamObserver<ReleaseReservationResponse> responseObserver) {
    kafkaTemplate.send("inventory.reservation.released", request.getReservationId(), "{\"reservationId\":\"" + request.getReservationId() + "\"}");
    responseObserver.onNext(ReleaseReservationResponse.newBuilder().setStatus("released").build());
    responseObserver.onCompleted();
  }
}
