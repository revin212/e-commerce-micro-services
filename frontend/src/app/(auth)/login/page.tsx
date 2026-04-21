"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { endpoints } from "@/lib/api/client/endpoints";
import { ApiClientError } from "@/lib/api/client/errors";
import { api } from "@/lib/api/client/fetcher";
import type { AuthResponse } from "@/lib/api/contracts/auth";
import { Button, Card, Input } from "@/components/ui";
import { useAuthStore } from "@/lib/store/auth";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      if ((process.env.NEXT_PUBLIC_API_MODE ?? "mock") === "mock") {
        const mockAuth = await api.post<AuthResponse>(endpoints.authLogin, { email, password });
        setUser(mockAuth.user);
        router.push("/account/profile");
        return;
      }
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = (await response.json()) as { user?: { id: string; name: string; email: string }; message?: string };
      if (!response.ok || !payload.user) {
        throw new ApiClientError(payload.message ?? "Unable to sign in", { status: response.status, data: payload });
      }
      setUser(payload.user);
      router.push("/account/profile");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to sign in");
    } finally {
      setSubmitting(false);
      router.refresh();
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <Card className="space-y-4">
        <h1 className="text-3xl font-semibold">Login</h1>
        <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        {error ? <p className="text-sm text-error">{error}</p> : null}
        <Button onClick={handleSubmit} className="w-full" disabled={submitting}>
          {submitting ? "Signing In..." : "Sign In"}
        </Button>
        <div className="flex justify-between text-sm">
          <Link href="/register" className="text-primary hover:underline">Create account</Link>
          <Link href="/forgot-password" className="text-primary hover:underline">Forgot password</Link>
        </div>
      </Card>
    </div>
  );
}
