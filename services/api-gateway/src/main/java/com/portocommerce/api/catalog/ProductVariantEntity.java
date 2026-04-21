package com.portocommerce.api.catalog;

import jakarta.persistence.*;

@Entity
@Table(name = "product_variants")
public class ProductVariantEntity {
  @Id
  private String id;
  private String color;
  private String size;
  private Boolean inStock;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id")
  private ProductEntity product;

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }
  public String getColor() { return color; }
  public void setColor(String color) { this.color = color; }
  public String getSize() { return size; }
  public void setSize(String size) { this.size = size; }
  public Boolean getInStock() { return inStock; }
  public void setInStock(Boolean inStock) { this.inStock = inStock; }
  public ProductEntity getProduct() { return product; }
  public void setProduct(ProductEntity product) { this.product = product; }
}
