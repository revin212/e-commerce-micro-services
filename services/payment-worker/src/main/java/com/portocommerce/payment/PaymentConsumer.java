package com.portocommerce.payment;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class PaymentConsumer {
  private final KafkaTemplate<String, String> kafkaTemplate;

  public PaymentConsumer(KafkaTemplate<String, String> kafkaTemplate) {
    this.kafkaTemplate = kafkaTemplate;
  }

  @KafkaListener(topics = "order.placed", groupId = "payment-worker")
  public void onOrderPlaced(String payload) {
    String orderId = extractOrderId(payload);
    if (orderId == null) return;
    kafkaTemplate.send("payment.authorized", orderId, "{\"orderId\":\"" + orderId + "\",\"status\":\"authorized\"}");
  }

  private String extractOrderId(String payload) {
    int idx = payload.indexOf("\"orderId\":\"");
    if (idx < 0) return null;
    int start = idx + 11;
    int end = payload.indexOf('"', start);
    return end > start ? payload.substring(start, end) : null;
  }
}
