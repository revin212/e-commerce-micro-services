package com.portocommerce.api.search;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "products")
public class ProductSearchDocument {
  @Id
  private String id;
  private String slug;
  private String name;
  private String description;

  public ProductSearchDocument() {}
  public ProductSearchDocument(String id, String slug, String name, String description) {
    this.id = id;
    this.slug = slug;
    this.name = name;
    this.description = description;
  }
  public String getId() { return id; }
  public String getSlug() { return slug; }
  public String getName() { return name; }
  public String getDescription() { return description; }
}
