"use client";

import { Toast } from "@/components/ui";
import { useUiStore } from "@/lib/store/ui";

export function Providers({ children }: { children: React.ReactNode }) {
  const { toast } = useUiStore();
  return (
    <>
      {children}
      {toast ? (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast message={toast} />
        </div>
      ) : null}
    </>
  );
}
