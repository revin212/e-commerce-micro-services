package com.portocommerce.api.catalog;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
public class ProductEntity {
  @Id
  private String id;
  @Column(unique = true, nullable = false)
  private String slug;
  private String name;
  @Column(length = 2000)
  private String description;
  private BigDecimal priceAmount;
  private String currency = "USD";
  private String imageUrls;
  private Double ratingAverage;
  private Integer ratingCount;
  private String badges;

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
  private List<ProductVariantEntity> variants = new ArrayList<>();

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }
  public String getSlug() { return slug; }
  public void setSlug(String slug) { this.slug = slug; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public BigDecimal getPriceAmount() { return priceAmount; }
  public void setPriceAmount(BigDecimal priceAmount) { this.priceAmount = priceAmount; }
  public String getCurrency() { return currency; }
  public void setCurrency(String currency) { this.currency = currency; }
  public String getImageUrls() { return imageUrls; }
  public void setImageUrls(String imageUrls) { this.imageUrls = imageUrls; }
  public Double getRatingAverage() { return ratingAverage; }
  public void setRatingAverage(Double ratingAverage) { this.ratingAverage = ratingAverage; }
  public Integer getRatingCount() { return ratingCount; }
  public void setRatingCount(Integer ratingCount) { this.ratingCount = ratingCount; }
  public String getBadges() { return badges; }
  public void setBadges(String badges) { this.badges = badges; }
  public List<ProductVariantEntity> getVariants() { return variants; }
  public void setVariants(List<ProductVariantEntity> variants) { this.variants = variants; }
}
