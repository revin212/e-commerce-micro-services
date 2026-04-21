import { NextResponse } from "next/server";
import { endpoints } from "@/lib/api/client/endpoints";
import { gatewayRequest } from "@/lib/server/gateway";
import { clearSessionToken, getSessionToken } from "@/lib/server/session";

type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

function decodeRoleFromJwt(token: string): string {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { role?: string };
    return decoded.role ?? "customer";
  } catch {
    return "customer";
  }
}

export async function GET() {
  const token = await getSessionToken();
  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const accountResponse = await gatewayRequest(endpoints.account, { method: "GET" }, token);
  if (!accountResponse.ok) {
    await clearSessionToken();
    return NextResponse.json({ user: null }, { status: 200 });
  }
  const account = (await accountResponse.json()) as {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  const user: SessionUser = {
    id: account.id,
    name: `${account.firstName} ${account.lastName}`.trim(),
    email: account.email,
    role: decodeRoleFromJwt(token),
  };
  return NextResponse.json({ user }, { status: 200 });
}
