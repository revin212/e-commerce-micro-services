package com.portocommerce.api.search;

import com.portocommerce.api.catalog.ProductRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class ProductIndexer {
  private final ProductRepository productRepository;
  private final ProductSearchRepository searchRepository;

  public ProductIndexer(ProductRepository productRepository, ProductSearchRepository searchRepository) {
    this.productRepository = productRepository;
    this.searchRepository = searchRepository;
  }

  @org.springframework.context.event.EventListener(ApplicationReadyEvent.class)
  @Transactional(readOnly = true)
  public void seedIndex() {
    productRepository.findAll().forEach(p ->
      searchRepository.save(new ProductSearchDocument(p.getId(), p.getSlug(), p.getName(), p.getDescription()))
    );
  }

  @KafkaListener(topics = "product.changed", groupId = "api-gateway")
  @Transactional(readOnly = true)
  public void onProductChanged(String payload) {
    int idx = payload.indexOf("\"productId\":\"");
    if (idx < 0) return;
    int start = idx + 13;
    int end = payload.indexOf('"', start);
    if (end <= start) return;
    String productId = payload.substring(start, end);
    productRepository.findById(productId).ifPresent(p ->
      searchRepository.save(new ProductSearchDocument(p.getId(), p.getSlug(), p.getName(), p.getDescription()))
    );
  }
}
