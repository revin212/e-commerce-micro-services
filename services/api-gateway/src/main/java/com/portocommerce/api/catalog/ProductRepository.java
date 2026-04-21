package com.portocommerce.api.catalog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductEntity, String> {
  Optional<ProductEntity> findBySlug(String slug);
  Page<ProductEntity> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
