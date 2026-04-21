package com.portocommerce.api.order;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class OrderEventConsumer {
  private final OrderRepository orderRepository;

  public OrderEventConsumer(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  @KafkaListener(topics = "payment.authorized", groupId = "api-gateway")
  @Transactional
  public void onPaymentAuthorized(String payload) {
    updateStatus(extractOrderId(payload), "packed");
  }

  @KafkaListener(topics = "shipment.dispatched", groupId = "api-gateway")
  @Transactional
  public void onShipmentDispatched(String payload) {
    updateStatus(extractOrderId(payload), "shipped");
  }

  private void updateStatus(String orderId, String status) {
    if (orderId == null) return;
    orderRepository.findById(orderId).ifPresent(order -> {
      order.setStatus(status);
      orderRepository.save(order);
    });
  }

  private String extractOrderId(String payload) {
    int idx = payload.indexOf("\"orderId\":\"");
    if (idx < 0) return null;
    int start = idx + 11;
    int end = payload.indexOf('"', start);
    return end > start ? payload.substring(start, end) : null;
  }
}
