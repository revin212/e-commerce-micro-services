"use client";

import { SearchOverlay } from "@/components/layout";
import { useSearchStore } from "@/lib/store/search";
import { useEffect } from "react";

export default function SearchPage() {
  const { setOverlayOpen } = useSearchStore();
  useEffect(() => {
    setOverlayOpen(true);
    return () => setOverlayOpen(false);
  }, [setOverlayOpen]);
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-on-surface-variant">Search overlay is active.</p>
      <SearchOverlay />
    </div>
  );
}
