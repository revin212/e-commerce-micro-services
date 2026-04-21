import { Button, Card, Input } from "@/components/ui";

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <Card className="space-y-4">
        <h1 className="text-3xl font-semibold">Forgot password</h1>
        <p className="text-sm text-on-surface-variant">We will send a secure reset link to your email.</p>
        <Input type="email" placeholder="Email" />
        <Button className="w-full">Send reset link</Button>
      </Card>
    </div>
  );
}
