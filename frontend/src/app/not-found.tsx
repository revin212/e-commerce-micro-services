import Link from "next/link";
import { Button, Card } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Card className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="text-on-surface-variant">The page you requested does not exist.</p>
        <Link href="/"><Button>Back to Home</Button></Link>
      </Card>
    </div>
  );
}
