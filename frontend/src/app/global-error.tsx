"use client";

import Link from "next/link";
import { Button, Card } from "@/components/ui";

export default function GlobalError() {
  return (
    <html>
      <body className="bg-surface p-6">
        <div className="mx-auto max-w-3xl py-16">
          <Card className="space-y-4 text-center">
            <h1 className="text-3xl font-semibold">Something went wrong</h1>
            <p className="text-on-surface-variant">Try refreshing the page or return home.</p>
            <Link href="/"><Button>Back to Home</Button></Link>
          </Card>
        </div>
      </body>
    </html>
  );
}
