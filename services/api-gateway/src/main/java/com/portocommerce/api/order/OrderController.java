package com.portocommerce.api.order;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/orders")
public class OrderController {
  private final OrderRepository orderRepository;

  public OrderController(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  @GetMapping
  public List<Map<String, Object>> list(Authentication authentication) {
    String email = resolveUserEmail(authentication);
    return orderRepository.findByUserEmailOrderByIdDesc(email).stream().map(o -> Map.<String, Object>of(
      "id", o.getId(),
      "status", o.getStatus(),
      "eta", o.getEta(),
      "total", o.getTotal()
    )).toList();
  }

  @GetMapping("/{id}")
  public Map<String, Object> byId(@PathVariable String id, Authentication authentication) {
    OrderEntity order = orderRepository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Order not found"));
    String email = resolveUserEmail(authentication);
    if (!email.equals(order.getUserEmail())) {
      throw new ResponseStatusException(NOT_FOUND, "Order not found");
    }
    return Map.of(
      "id", order.getId(),
      "status", order.getStatus(),
      "eta", order.getEta(),
      "total", order.getTotal(),
      "timeline", Arrays.asList(order.getTimeline().split(",")),
      "address", order.getAddress()
    );
  }

  private String resolveUserEmail(Authentication authentication) {
    return authentication == null ? "guest" : authentication.getName();
  }
}
