package com.portocommerce.api.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;

@Configuration
@EnableKafka
public class KafkaConfig {
  @Bean NewTopic orderPlacedTopic() { return new NewTopic("order.placed", 1, (short) 1); }
  @Bean NewTopic paymentAuthorizedTopic() { return new NewTopic("payment.authorized", 1, (short) 1); }
  @Bean NewTopic paymentFailedTopic() { return new NewTopic("payment.failed", 1, (short) 1); }
  @Bean NewTopic fulfillmentCreatedTopic() { return new NewTopic("fulfillment.created", 1, (short) 1); }
  @Bean NewTopic shipmentDispatchedTopic() { return new NewTopic("shipment.dispatched", 1, (short) 1); }
  @Bean NewTopic productChangedTopic() { return new NewTopic("product.changed", 1, (short) 1); }
}
