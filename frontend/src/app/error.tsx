"use client";

import { useEffect } from "react";
import { Button, Card } from "@/components/ui";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Card className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="text-on-surface-variant">{error.message || "Unable to load this page right now."}</p>
        <div className="flex justify-center gap-3">
          <Button onClick={reset}>Retry</Button>
          <Button variant="secondary" onClick={() => window.location.assign("/")}>
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
