package com.portocommerce.api.catalog;

import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/products")
public class ProductController {
  private final ProductRepository productRepository;

  public ProductController(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @GetMapping
  public ProductDtos.PaginatedProducts listProducts(
    @RequestParam(required = false) String q,
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "12") int pageSize
  ) {
    var pageable = PageRequest.of(Math.max(page - 1, 0), pageSize);
    var pageResult = (q == null || q.isBlank())
      ? productRepository.findAll(pageable)
      : productRepository.findByNameContainingIgnoreCase(q, pageable);
    List<ProductDtos.Product> items = pageResult.getContent().stream().map(this::mapProduct).toList();
    return new ProductDtos.PaginatedProducts(items, page, pageSize, pageResult.getTotalElements());
  }

  @GetMapping("/{slug}")
  public ProductDtos.Product productBySlug(@PathVariable String slug) {
    return productRepository.findBySlug(slug).map(this::mapProduct).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Product not found"));
  }

  private ProductDtos.Product mapProduct(ProductEntity entity) {
    List<String> images = entity.getImageUrls() == null || entity.getImageUrls().isBlank() ? List.of() : Arrays.stream(entity.getImageUrls().split(",")).toList();
    List<String> badges = entity.getBadges() == null || entity.getBadges().isBlank() ? List.of() : Arrays.stream(entity.getBadges().split(",")).toList();
    List<ProductDtos.Variant> variants = entity.getVariants().stream()
      .map(v -> new ProductDtos.Variant(v.getId(), v.getColor(), v.getSize(), Boolean.TRUE.equals(v.getInStock())))
      .toList();
    ProductDtos.Rating rating = entity.getRatingAverage() == null ? null : new ProductDtos.Rating(entity.getRatingAverage(), entity.getRatingCount() == null ? 0 : entity.getRatingCount());
    return new ProductDtos.Product(
      entity.getId(),
      entity.getSlug(),
      entity.getName(),
      entity.getDescription(),
      new ProductDtos.Price(entity.getPriceAmount(), entity.getCurrency()),
      images,
      rating,
      badges,
      variants
    );
  }
}
