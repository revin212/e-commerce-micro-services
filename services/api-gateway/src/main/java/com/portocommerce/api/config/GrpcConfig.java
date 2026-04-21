package com.portocommerce.api.config;

import com.portocommerce.contracts.inventory.InventoryServiceGrpc;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GrpcConfig {
  @Bean
  ManagedChannel inventoryChannel(
    @Value("${app.grpc.inventory-host}") String host,
    @Value("${app.grpc.inventory-port}") int port
  ) {
    return ManagedChannelBuilder.forAddress(host, port).usePlaintext().build();
  }

  @Bean
  InventoryServiceGrpc.InventoryServiceBlockingStub inventoryStub(ManagedChannel inventoryChannel) {
    return InventoryServiceGrpc.newBlockingStub(inventoryChannel);
  }
}
