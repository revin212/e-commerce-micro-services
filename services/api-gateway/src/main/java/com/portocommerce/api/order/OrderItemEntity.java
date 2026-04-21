package com.portocommerce.api.order;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItemEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;
  private String productId;
  private String name;
  private Integer quantity;
  private BigDecimal price;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "order_id")
  private OrderEntity order;

  public String getId() { return id; }
  public String getProductId() { return productId; }
  public void setProductId(String productId) { this.productId = productId; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public Integer getQuantity() { return quantity; }
  public void setQuantity(Integer quantity) { this.quantity = quantity; }
  public BigDecimal getPrice() { return price; }
  public void setPrice(BigDecimal price) { this.price = price; }
  public OrderEntity getOrder() { return order; }
  public void setOrder(OrderEntity order) { this.order = order; }
}
