package com.portocommerce.api.inventory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
  private final InventoryRepository inventoryRepository;

  public InventoryController(InventoryRepository inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  @GetMapping
  public List<Map<String, Object>> list() {
    return inventoryRepository.findAll().stream().map(item -> {
      int stock = item.getOnHand() - item.getReserved();
      String status = stock <= 0 ? "out_of_stock" : stock <= 5 ? "low_stock" : "in_stock";
      return Map.<String, Object>of(
        "productId", item.getProductId(),
        "sku", item.getSku(),
        "stock", stock,
        "lowStock", stock <= 5,
        "status", status
      );
    }).toList();
  }
}
