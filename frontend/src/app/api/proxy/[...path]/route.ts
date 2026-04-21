import { NextRequest, NextResponse } from "next/server";
import { gatewayRequest } from "@/lib/server/gateway";
import { getSessionToken } from "@/lib/server/session";
import { endpoints } from "@/lib/api/client/endpoints";

function toGatewayPath(segments: string[], searchParams: URLSearchParams): string {
  const basePath = `/${segments.join("/")}`;
  const query = searchParams.toString();
  return query ? `${basePath}?${query}` : basePath;
}

async function forward(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const token = await getSessionToken();
  const normalizedPath = `/${path.join("/")}`;
  if (normalizedPath === endpoints.adminInventory && !token) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }
  const rawBody = request.method === "GET" || request.method === "DELETE" ? undefined : await request.text();
  const requestId = request.headers.get("x-request-id");
  const response = await gatewayRequest(
    toGatewayPath(path, request.nextUrl.searchParams),
    {
      method: request.method,
      body: rawBody,
      headers: requestId ? { "x-request-id": requestId } : undefined,
    },
    token ?? undefined,
  );
  const text = await response.text();
  return new NextResponse(text, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "application/json",
    },
  });
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return forward(request, context);
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return forward(request, context);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return forward(request, context);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return forward(request, context);
}
