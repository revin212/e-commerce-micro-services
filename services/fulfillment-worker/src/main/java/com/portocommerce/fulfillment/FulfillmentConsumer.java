package com.portocommerce.fulfillment;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class FulfillmentConsumer {
  private final KafkaTemplate<String, String> kafkaTemplate;

  public FulfillmentConsumer(KafkaTemplate<String, String> kafkaTemplate) {
    this.kafkaTemplate = kafkaTemplate;
  }

  @KafkaListener(topics = "payment.authorized", groupId = "fulfillment-worker")
  public void onPaymentAuthorized(String payload) {
    String orderId = extractOrderId(payload);
    if (orderId == null) return;
    kafkaTemplate.send("fulfillment.created", orderId, "{\"orderId\":\"" + orderId + "\",\"status\":\"created\"}");
    kafkaTemplate.send("shipment.dispatched", orderId, "{\"orderId\":\"" + orderId + "\",\"status\":\"shipped\"}");
  }

  private String extractOrderId(String payload) {
    int idx = payload.indexOf("\"orderId\":\"");
    if (idx < 0) return null;
    int start = idx + 11;
    int end = payload.indexOf('"', start);
    return end > start ? payload.substring(start, end) : null;
  }
}
