package com.portocommerce.api.order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, String> {
  List<OrderEntity> findByUserEmailOrderByIdDesc(String userEmail);
}
