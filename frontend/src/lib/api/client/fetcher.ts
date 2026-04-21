import { mockClient } from "@/lib/api/mocks";
import type { ApiMode } from "@/lib/api/contracts/common";

const mode = (process.env.NEXT_PUBLIC_API_MODE ?? "mock") as ApiMode;
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

async function realClient<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Request failed for ${path}`);
  }
  return (await response.json()) as T;
}

export const api = {
  get: <T>(path: string) => (mode === "mock" ? mockClient<T>(path) : realClient<T>(path)),
};
