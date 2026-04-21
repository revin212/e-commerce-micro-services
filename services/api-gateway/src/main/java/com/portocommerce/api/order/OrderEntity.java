package com.portocommerce.api.order;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class OrderEntity {
  @Id
  private String id;
  private String userEmail;
  private String status;
  private String eta;
  private BigDecimal total;
  private String address;
  private String timeline;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
  private List<OrderItemEntity> items = new ArrayList<>();

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }
  public String getUserEmail() { return userEmail; }
  public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
  public String getStatus() { return status; }
  public void setStatus(String status) { this.status = status; }
  public String getEta() { return eta; }
  public void setEta(String eta) { this.eta = eta; }
  public BigDecimal getTotal() { return total; }
  public void setTotal(BigDecimal total) { this.total = total; }
  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }
  public String getTimeline() { return timeline; }
  public void setTimeline(String timeline) { this.timeline = timeline; }
  public List<OrderItemEntity> getItems() { return items; }
  public void setItems(List<OrderItemEntity> items) { this.items = items; }
}
