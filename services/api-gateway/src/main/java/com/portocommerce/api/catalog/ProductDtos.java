package com.portocommerce.api.catalog;

import java.math.BigDecimal;
import java.util.List;

public class ProductDtos {
  public record Price(BigDecimal amount, String currency) {}
  public record Rating(double average, int count) {}
  public record Variant(String id, String color, String size, boolean inStock) {}
  public record Product(
    String id,
    String slug,
    String name,
    String description,
    Price price,
    List<String> images,
    Rating rating,
    List<String> badges,
    List<Variant> variants
  ) {}
  public record PaginatedProducts(List<Product> items, int page, int pageSize, long total) {}
}
