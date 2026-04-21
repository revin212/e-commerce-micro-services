import "server-only";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? "porto_session";
const SESSION_COOKIE_TTL_SECONDS = Number(process.env.SESSION_COOKIE_TTL_SECONDS ?? 60 * 60 * 24 * 7);

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
}

export async function setSessionToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_COOKIE_TTL_SECONDS,
  });
}

export async function clearSessionToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
