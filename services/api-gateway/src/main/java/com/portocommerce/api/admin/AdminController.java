package com.portocommerce.api.admin;

import com.portocommerce.api.inventory.InventoryRepository;
import com.portocommerce.api.order.OrderRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/inventory")
public class AdminController {
  private final InventoryRepository inventoryRepository;
  private final OrderRepository orderRepository;

  public AdminController(InventoryRepository inventoryRepository, OrderRepository orderRepository) {
    this.inventoryRepository = inventoryRepository;
    this.orderRepository = orderRepository;
  }

  @GetMapping
  @PreAuthorize("hasRole('ADMIN')")
  public Map<String, Object> dashboard() {
    long orders = orderRepository.count();
    BigDecimal revenue = orderRepository.findAll().stream().map(o -> o.getTotal()).reduce(BigDecimal.ZERO, BigDecimal::add);
    long lowStock = inventoryRepository.findAll().stream().filter(i -> (i.getOnHand() - i.getReserved()) <= 5).count();

    List<Map<String, Object>> kpis = List.of(
      Map.of("label", "Revenue", "value", "$" + revenue.intValue(), "trend", "up"),
      Map.of("label", "Orders", "value", String.valueOf(orders), "trend", "up"),
      Map.of("label", "Stock Alerts", "value", String.valueOf(lowStock), "trend", "flat")
    );
    List<Map<String, Object>> inventory = inventoryRepository.findAll().stream().map(i -> {
      int stock = i.getOnHand() - i.getReserved();
      String status = stock <= 0 ? "out_of_stock" : stock <= 5 ? "low_stock" : "in_stock";
      return Map.<String, Object>of(
        "productId", i.getProductId(),
        "sku", i.getSku(),
        "stock", stock,
        "lowStock", stock <= 5,
        "status", status
      );
    }).toList();
    return Map.of("kpis", kpis, "inventory", inventory);
  }
}
