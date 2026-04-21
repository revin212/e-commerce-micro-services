import { NextRequest, NextResponse } from "next/server";
import type { AuthResponse, RegisterRequest } from "@/lib/api/contracts/auth";
import { endpoints } from "@/lib/api/client/endpoints";
import { gatewayRequest } from "@/lib/server/gateway";
import { setSessionToken } from "@/lib/server/session";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as RegisterRequest;
  const response = await gatewayRequest(endpoints.authRegister, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) {
    return NextResponse.json(payload, { status: response.status });
  }
  const auth = payload as AuthResponse;
  await setSessionToken(auth.token);
  return NextResponse.json({ user: auth.user }, { status: 200 });
}
