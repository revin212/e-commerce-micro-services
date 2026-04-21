import { ApiClientError } from "@/lib/api/client/errors";
import { waitMockLatency } from "./latency";
import { mockHandlers } from "./handlers";

const resolveDynamicMock = (path: string): unknown => {
  if (path === "/cart") {
    return {
      items: [
        { productId: "p_1", name: "Atelier Lamp", quantity: 1, price: 189 },
        { productId: "p_2", name: "Contour Vase", quantity: 2, price: 59 },
      ],
      subtotal: 307,
      shipping: 12,
      tax: 26,
      total: 345,
    };
  }
  if (path.startsWith("/cart/")) {
    return { items: [], subtotal: 0, shipping: 0, tax: 0, total: 0 };
  }
  if (path === "/checkout") {
    return { orderId: "ord_1001", status: "confirmed" };
  }
  if (path === "/orders") {
    return [{ id: "ord_1001", status: "shipped", eta: "Apr 25", total: 345 }];
  }
  if (path.startsWith("/orders/")) {
    return {
      id: "ord_1001",
      status: "shipped",
      eta: "Apr 25",
      total: 345,
      timeline: ["processing", "packed", "shipped", "delivered"],
      address: "29 Mercer St, New York, NY",
    };
  }
  if (path === "/account") {
    return {
      id: "u_1",
      firstName: "Revin",
      lastName: "Dennis",
      email: "revin@example.com",
      phone: "+1 555 193 9921",
    };
  }
  if (path === "/admin/inventory") {
    return {
      kpis: [
        { label: "Revenue", value: "$128000", trend: "up" },
        { label: "Orders", value: "1423", trend: "up" },
        { label: "Stock Alerts", value: "12", trend: "flat" },
      ],
      inventory: [
        { productId: "p_1", sku: "ATL-001", stock: 22, lowStock: false, status: "in_stock" },
        { productId: "p_2", sku: "VAS-002", stock: 3, lowStock: true, status: "low_stock" },
      ],
    };
  }
  return null;
};

export async function mockClient<T>(path: string): Promise<T> {
  await waitMockLatency();
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (params.get("__mock") === "error") {
      throw new ApiClientError("Forced mock error");
    }
  }
  const payload = mockHandlers[path] ?? resolveDynamicMock(path);
  if (!payload) {
    throw new ApiClientError(`No mock handler for ${path}`, { status: 404 });
  }
  return payload as T;
}
