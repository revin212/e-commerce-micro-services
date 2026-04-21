import Link from "next/link";
import { Button, Card, Input } from "@/components/ui";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <Card className="space-y-4">
        <h1 className="text-3xl font-semibold">Register</h1>
        <Input placeholder="First name" />
        <Input placeholder="Last name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full">Create Account</Button>
        <Link href="/login" className="block text-center text-sm text-primary hover:underline">Already have an account?</Link>
      </Card>
    </div>
  );
}
