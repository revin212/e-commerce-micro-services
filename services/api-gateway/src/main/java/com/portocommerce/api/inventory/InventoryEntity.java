package com.portocommerce.api.inventory;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventory")
public class InventoryEntity {
  @Id
  private String productId;
  private String sku;
  private Integer onHand;
  private Integer reserved;

  public String getProductId() { return productId; }
  public void setProductId(String productId) { this.productId = productId; }
  public String getSku() { return sku; }
  public void setSku(String sku) { this.sku = sku; }
  public Integer getOnHand() { return onHand; }
  public void setOnHand(Integer onHand) { this.onHand = onHand; }
  public Integer getReserved() { return reserved; }
  public void setReserved(Integer reserved) { this.reserved = reserved; }
}
