import { ApiClientError } from "@/lib/api/client/errors";
import { waitMockLatency } from "./latency";
import { mockHandlers } from "./handlers";
import orders from "./fixtures/orders.json";
import orderDetail from "./fixtures/order-detail.json";

type OrderSummary = {
  id: string;
  status: string;
  eta: string;
  total: number;
};

const resolveDynamicMock = (path: string): unknown => {
  if (path.startsWith("/orders/")) {
    const orderId = path.replace("/orders/", "");
    const match = (orders as OrderSummary[]).find((order) => order.id === orderId);
    if (!match) return null;
    return {
      ...orderDetail,
      ...match,
      id: match.id,
      status: match.status,
      eta: match.eta,
      total: match.total,
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
    throw new ApiClientError(`No mock handler for ${path}`, 404);
  }
  return payload as T;
}
