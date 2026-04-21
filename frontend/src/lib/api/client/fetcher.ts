import { mockClient } from "@/lib/api/mocks";
import type { ApiMode } from "@/lib/api/contracts/common";
import { ApiClientError } from "@/lib/api/client/errors";

const mode = (
  process.env.NEXT_PUBLIC_API_MODE ?? (process.env.NODE_ENV === "production" ? "real" : "mock")
) as ApiMode;
const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api/proxy";

function stripTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function createRequestId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

async function resolveBaseUrl(): Promise<string> {
  const baseUrl = stripTrailingSlash(configuredBaseUrl);
  if (typeof window !== "undefined") {
    return baseUrl;
  }
  if (baseUrl.startsWith("http://") || baseUrl.startsWith("https://")) {
    return baseUrl;
  }
  const { headers } = await import("next/headers");
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  if (!host) {
    throw new ApiClientError("Unable to determine request host for server-side API call");
  }
  return `${protocol}://${host}${baseUrl}`;
}

async function parseError(response: Response): Promise<ApiClientError> {
  const contentType = response.headers.get("content-type") ?? "";
  let payload: unknown = undefined;
  if (contentType.includes("application/json")) {
    payload = await response.json();
  } else {
    payload = await response.text();
  }
  const message =
    typeof payload === "object" && payload && "message" in payload
      ? String((payload as { message?: unknown }).message ?? `Request failed with status ${response.status}`)
      : `Request failed with status ${response.status}`;
  return new ApiClientError(message, { status: response.status, data: payload });
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const baseUrl = await resolveBaseUrl();
  const headers = new Headers(init?.headers ?? {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (!headers.has("x-request-id")) {
    headers.set("x-request-id", createRequestId());
  }
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) {
    throw await parseError(response);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return undefined as T;
  }
  return (await response.json()) as T;
}

export const api = {
  get: <T>(path: string) => (mode === "mock" ? mockClient<T>(path) : request<T>(path, { method: "GET" })),
  post: <T>(path: string, body?: unknown) =>
    mode === "mock" ? mockClient<T>(path) : request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    mode === "mock" ? mockClient<T>(path) : request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => (mode === "mock" ? mockClient<T>(path) : request<T>(path, { method: "DELETE" })),
};
