package com.portocommerce.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import java.nio.file.Path;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertTrue;

class ContractParityTest {
  private final ObjectMapper mapper = new ObjectMapper();
  private final Path fixtureDir = Path.of("../../frontend/public/fixtures");

  @Test
  void productsFixtureHasExpectedShape() throws Exception {
    assertTopLevelKeys("products.json", Set.of("items", "page", "pageSize", "total"));
  }

  @Test
  void cartFixtureHasExpectedShape() throws Exception {
    assertTopLevelKeys("cart.json", Set.of("items", "subtotal", "shipping", "tax", "total"));
  }

  @Test
  void checkoutFixtureHasExpectedShape() throws Exception {
    JsonNode node = mapper.readTree("{\"orderId\":\"ord_1001\",\"status\":\"confirmed\"}");
    assertTrue(keys(node).containsAll(Set.of("orderId", "status")));
  }

  @Test
  void ordersFixtureHasExpectedShape() throws Exception {
    JsonNode node = mapper.readTree(fixtureDir.resolve("orders.json").toFile());
    JsonNode first = node.get(0);
    assertTrue(keys(first).containsAll(Set.of("id", "status", "eta", "total")));
  }

  private void assertTopLevelKeys(String fixtureName, Set<String> expected) throws Exception {
    JsonNode node = mapper.readTree(fixtureDir.resolve(fixtureName).toFile());
    assertTrue(keys(node).containsAll(expected));
  }

  private Set<String> keys(JsonNode node) {
    Set<String> out = new HashSet<>();
    Iterator<String> iterator = node.fieldNames();
    iterator.forEachRemaining(out::add);
    return out;
  }
}
