package com.portocommerce.api.search;

import com.portocommerce.api.catalog.ProductController;
import com.portocommerce.api.catalog.ProductRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/search")
public class SearchController {
  private final ProductRepository productRepository;
  private final ProductController productController;

  public SearchController(ProductRepository productRepository, ProductController productController) {
    this.productRepository = productRepository;
    this.productController = productController;
  }

  @GetMapping
  public Map<String, Object> search(@RequestParam(defaultValue = "") String q) {
    var results = (q.isBlank() ? productRepository.findAll() : productRepository.findByNameContainingIgnoreCase(q, org.springframework.data.domain.PageRequest.of(0, 10)).getContent())
      .stream().map(p -> productController.productBySlug(p.getSlug())).toList();
    return Map.of(
      "query", q,
      "suggestions", List.of("linen", "lamp", "lounge chair"),
      "collections", List.of("Lighting", "Furniture", "Decor"),
      "results", results
    );
  }
}
