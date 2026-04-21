"use client";

import Link from "next/link";
import { Button, Card, Input } from "@/components/ui";
import { useAuthStore } from "@/lib/store/auth";

export default function LoginPage() {
  const { login } = useAuthStore();
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <Card className="space-y-4">
        <h1 className="text-3xl font-semibold">Login</h1>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button onClick={() => login({ id: "u_1", name: "Revin Dennis", email: "revin@example.com" }, "mock_token_123")} className="w-full">
          Sign In
        </Button>
        <div className="flex justify-between text-sm">
          <Link href="/register" className="text-primary hover:underline">Create account</Link>
          <Link href="/forgot-password" className="text-primary hover:underline">Forgot password</Link>
        </div>
      </Card>
    </div>
  );
}
