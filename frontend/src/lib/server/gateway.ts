import "server-only";

const gatewayBaseUrl = (process.env.API_GATEWAY_BASE_URL ?? "http://localhost:8080").replace(/\/$/, "");

function buildHeaders(initHeaders: HeadersInit | undefined, authToken?: string): Headers {
  const headers = new Headers(initHeaders ?? {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (authToken) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }
  return headers;
}

export async function gatewayRequest(
  path: string,
  init: RequestInit = {},
  authToken?: string,
): Promise<Response> {
  return fetch(`${gatewayBaseUrl}${path}`, {
    ...init,
    headers: buildHeaders(init.headers, authToken),
    cache: "no-store",
  });
}
