package com.portocommerce.api.checkout;

import com.portocommerce.api.order.OrderEntity;
import com.portocommerce.api.order.OrderItemEntity;
import com.portocommerce.api.order.OrderRepository;
import com.portocommerce.contracts.inventory.InventoryServiceGrpc;
import com.portocommerce.contracts.inventory.ReleaseReservationRequest;
import com.portocommerce.contracts.inventory.ReserveLine;
import com.portocommerce.contracts.inventory.ReserveStockRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RestController
@RequestMapping("/checkout")
public class CheckoutController {
  private final StringRedisTemplate redisTemplate;
  private final OrderRepository orderRepository;
  private final InventoryServiceGrpc.InventoryServiceBlockingStub inventoryStub;
  private final KafkaTemplate<String, String> kafkaTemplate;

  public CheckoutController(
    StringRedisTemplate redisTemplate,
    OrderRepository orderRepository,
    InventoryServiceGrpc.InventoryServiceBlockingStub inventoryStub,
    KafkaTemplate<String, String> kafkaTemplate
  ) {
    this.redisTemplate = redisTemplate;
    this.orderRepository = orderRepository;
    this.inventoryStub = inventoryStub;
    this.kafkaTemplate = kafkaTemplate;
  }

  public record CheckoutRequest(@NotBlank String address, @NotBlank String shippingMethodId, @NotBlank String paymentMethod) {}
  public record CheckoutResponse(String orderId, String status) {}

  @PostMapping
  @Transactional
  public CheckoutResponse checkout(@Valid @RequestBody CheckoutRequest request, Authentication authentication) {
    String userEmail = resolveUserEmail(authentication);
    String cartKey = "cart:" + userEmail;
    Map<Object, Object> entries = redisTemplate.opsForHash().entries(cartKey);
    if (entries.isEmpty()) {
      throw new ResponseStatusException(BAD_REQUEST, "Cart is empty");
    }
    String orderId = "ord_" + (System.currentTimeMillis() % 1_000_000);

    List<ReserveLine> lines = new ArrayList<>();
    List<OrderItemEntity> orderItems = new ArrayList<>();
    BigDecimal total = BigDecimal.ZERO;
    for (Map.Entry<Object, Object> entry : entries.entrySet()) {
      String[] parts = String.valueOf(entry.getValue()).split("\\|");
      int qty = Integer.parseInt(parts[1]);
      BigDecimal price = BigDecimal.valueOf(Long.parseLong(parts[2]));
      lines.add(ReserveLine.newBuilder().setProductId(String.valueOf(entry.getKey())).setQuantity(qty).build());
      OrderItemEntity item = new OrderItemEntity();
      item.setProductId(String.valueOf(entry.getKey()));
      item.setName(parts[0]);
      item.setQuantity(qty);
      item.setPrice(price);
      orderItems.add(item);
      total = total.add(price.multiply(BigDecimal.valueOf(qty)));
    }

    var reserveResponse = inventoryStub.reserveStock(
      ReserveStockRequest.newBuilder()
        .setOrderId(orderId)
        .addAllLines(lines)
        .build()
    );
    String reservationId = reserveResponse.getReservationId();

    try {
      OrderEntity order = new OrderEntity();
      order.setId(orderId);
      order.setUserEmail(userEmail);
      order.setStatus("processing");
      order.setTimeline("processing,packed,shipped,delivered");
      order.setEta(LocalDate.now().plusDays(4).format(DateTimeFormatter.ofPattern("MMM d")));
      order.setAddress(request.address());
      order.setTotal(total.add(BigDecimal.valueOf(12)).add(total.multiply(BigDecimal.valueOf(0.085))));
      orderItems.forEach(i -> i.setOrder(order));
      order.setItems(orderItems);
      orderRepository.save(order);

      kafkaTemplate.send("order.placed", orderId, "{\"orderId\":\"" + orderId + "\",\"reservationId\":\"" + reservationId + "\"}");
      redisTemplate.delete(cartKey);
      return new CheckoutResponse(orderId, "confirmed");
    } catch (RuntimeException ex) {
      inventoryStub.releaseReservation(ReleaseReservationRequest.newBuilder().setReservationId(reservationId).build());
      throw ex;
    }
  }

  private String resolveUserEmail(Authentication authentication) {
    return authentication == null ? "guest" : authentication.getName();
  }
}
