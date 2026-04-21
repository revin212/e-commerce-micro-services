"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { endpoints } from "@/lib/api/client/endpoints";
import { api } from "@/lib/api/client/fetcher";
import type { AuthResponse } from "@/lib/api/contracts/auth";
import { Button, Card, Input } from "@/components/ui";
import { useAuthStore } from "@/lib/store/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      if ((process.env.NEXT_PUBLIC_API_MODE ?? "mock") === "mock") {
        const mockAuth = await api.post<AuthResponse>(endpoints.authRegister, { firstName, lastName, email, password });
        setUser(mockAuth.user);
        router.push("/account/profile");
        return;
      }
      const response = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const payload = (await response.json()) as { user?: { id: string; name: string; email: string }; message?: string };
      if (!response.ok || !payload.user) {
        throw new Error(payload.message ?? "Unable to create account");
      }
      setUser(payload.user);
      router.push("/account/profile");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to create account");
    } finally {
      setSubmitting(false);
      router.refresh();
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <Card className="space-y-4">
        <h1 className="text-3xl font-semibold">Register</h1>
        <Input placeholder="First name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
        <Input placeholder="Last name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
        <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        {error ? <p className="text-sm text-error">{error}</p> : null}
        <Button className="w-full" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Creating..." : "Create Account"}
        </Button>
        <Link href="/login" className="block text-center text-sm text-primary hover:underline">Already have an account?</Link>
      </Card>
    </div>
  );
}
