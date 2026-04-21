package com.portocommerce.api.cart;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart")
public class CartController {
  private final StringRedisTemplate redisTemplate;

  public CartController(StringRedisTemplate redisTemplate) {
    this.redisTemplate = redisTemplate;
  }

  public record CartItem(String productId, String name, int quantity, int price) {}
  public record CartResponse(List<CartItem> items, int subtotal, int shipping, int tax, int total) {}
  public record UpsertCartRequest(@NotBlank String productId, @NotBlank String name, @Min(1) int quantity, @Min(0) int price) {}

  @GetMapping
  public CartResponse get(Authentication authentication) {
    List<CartItem> items = readItems(cartKey(authentication));
    return summarize(items);
  }

  @PostMapping
  public CartResponse add(@Valid @RequestBody UpsertCartRequest request, Authentication authentication) {
    List<CartItem> items = readItems(cartKey(authentication));
    items.removeIf(i -> i.productId().equals(request.productId()));
    items.add(new CartItem(request.productId(), request.name(), request.quantity(), request.price()));
    writeItems(cartKey(authentication), items);
    return summarize(items);
  }

  @PatchMapping
  public CartResponse update(@Valid @RequestBody UpsertCartRequest request, Authentication authentication) {
    return add(request, authentication);
  }

  @DeleteMapping("/{productId}")
  public CartResponse remove(@PathVariable String productId, Authentication authentication) {
    List<CartItem> items = readItems(cartKey(authentication));
    items.removeIf(i -> i.productId().equals(productId));
    writeItems(cartKey(authentication), items);
    return summarize(items);
  }

  private String cartKey(Authentication authentication) {
    String user = authentication == null ? "guest" : authentication.getName();
    return "cart:" + user;
  }

  private List<CartItem> readItems(String key) {
    Map<Object, Object> entries = redisTemplate.opsForHash().entries(key);
    List<CartItem> items = new ArrayList<>();
    entries.forEach((k, v) -> {
      String[] parts = String.valueOf(v).split("\\|");
      items.add(new CartItem(String.valueOf(k), parts[0], Integer.parseInt(parts[1]), Integer.parseInt(parts[2])));
    });
    return items;
  }

  private void writeItems(String key, List<CartItem> items) {
    redisTemplate.delete(key);
    items.forEach(item -> redisTemplate.opsForHash().put(key, item.productId(), item.name() + "|" + item.quantity() + "|" + item.price()));
  }

  private CartResponse summarize(List<CartItem> items) {
    int subtotal = items.stream().mapToInt(i -> i.price() * i.quantity()).sum();
    int shipping = items.isEmpty() ? 0 : 12;
    int tax = Math.round(subtotal * 0.085f);
    int total = subtotal + shipping + tax;
    return new CartResponse(items, subtotal, shipping, tax, total);
  }
}
