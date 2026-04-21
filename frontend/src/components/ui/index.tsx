"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/design/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const styles = {
    primary: "bg-ctaGradient text-on-primary hover:opacity-95",
    secondary: "bg-surface-container-highest text-on-surface",
    tertiary: "text-primary underline-offset-4 hover:underline bg-transparent",
  };
  return (
    <button
      className={cn(
        "rounded-DEFAULT px-4 py-2 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-DEFAULT bg-surface-container-low px-3 py-2 text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        className,
      )}
      {...props}
    />
  );
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-lg bg-surface-container-lowest p-4 shadow-ambient", className)} {...props} />;
}

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("rounded-full bg-surface-container-high px-2 py-0.5 text-xs", className)} {...props} />;
}

export function Chip({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("rounded-full bg-surface-container-high px-3 py-1 text-xs text-on-surface-variant", className)}
      {...props}
    />
  );
}

export function Checkbox({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type="checkbox" className={cn("h-4 w-4 accent-primary", className)} {...props} />;
}

export function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange?: (next: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange?.(!checked)}
      className={cn("h-6 w-11 rounded-full transition", checked ? "bg-primary" : "bg-surface-container-high")}
      aria-pressed={checked}
    >
      <span className={cn("block h-5 w-5 rounded-full bg-white transition", checked ? "translate-x-5" : "translate-x-0.5")} />
    </button>
  );
}

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn("rounded-DEFAULT bg-surface-container-low px-3 py-2 text-sm", className)} {...props} />;
}

export function StarRating({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return <div aria-label={`Rating ${rating}`}>{Array.from({ length: 5 }).map((_, i) => <span key={i}>{"★".repeat(i < full ? 1 : 0)}{"☆".repeat(i < full ? 0 : 1)}</span>)}</div>;
}

export function Breadcrumbs({ items }: { items: Array<{ href: string; label: string }> }) {
  return (
    <nav className="text-sm text-on-surface-variant">
      {items.map((item, idx) => (
        <span key={item.href}>
          <Link href={item.href}>{item.label}</Link>
          {idx < items.length - 1 ? " / " : ""}
        </span>
      ))}
    </nav>
  );
}

export function Pagination({ page, total, onChange }: { page: number; total: number; onChange?: (p: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" onClick={() => onChange?.(Math.max(1, page - 1))}>Prev</Button>
      <span className="text-sm">{page} / {total}</span>
      <Button variant="secondary" onClick={() => onChange?.(Math.min(total, page + 1))}>Next</Button>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded bg-surface-container-high", className)} />;
}

export function QuantityStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" aria-label="decrease quantity" onClick={() => onChange(Math.max(1, value - 1))}>-</Button>
      <span>{value}</span>
      <Button variant="secondary" aria-label="increase quantity" onClick={() => onChange(value + 1)}>+</Button>
    </div>
  );
}

export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="rounded-DEFAULT bg-surface-container-low p-3">
      <summary className="cursor-pointer font-medium">{title}</summary>
      <div className="pt-2 text-sm text-on-surface-variant">{children}</div>
    </details>
  );
}

export function Tabs({
  tabs,
  value,
  onChange,
}: {
  tabs: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2" role="tablist">
      {tabs.map((tab) => (
        <button key={tab} role="tab" aria-selected={tab === value} onClick={() => onChange(tab)} className={cn("rounded-DEFAULT px-3 py-2 text-sm", tab === value ? "bg-surface-bright" : "bg-surface-container-low")}>
          {tab}
        </button>
      ))}
    </div>
  );
}

export function Toast({ message }: { message: string }) {
  return <div role="status" className="rounded-DEFAULT bg-on-surface px-4 py-2 text-on-primary">{message}</div>;
}

export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-on-surface/30 p-4">
      <div className="w-full max-w-lg rounded-lg bg-surface-container-lowest p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="close">x</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Drawer({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-on-surface/30" onClick={onClose}>
      <aside className="h-full w-full max-w-md bg-surface p-4" onClick={(e) => e.stopPropagation()}>
        {children}
      </aside>
    </div>
  );
}

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex flex-wrap gap-4">
      {steps.map((step, index) => (
        <li key={step} className={cn("text-sm", index === current ? "text-primary" : "text-on-surface-variant")}>
          {index + 1}. {step}
        </li>
      ))}
    </ol>
  );
}

export function RowActionsMenu({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  const renderedItems = useMemo(() => items, [items]);
  return (
    <div className="relative">
      <Button variant="tertiary" onClick={() => setOpen((prev) => !prev)}>...</Button>
      {open && (
        <div className="absolute right-0 mt-1 rounded-DEFAULT bg-surface-container-lowest p-2 shadow-ambient">
          {renderedItems.map((item) => (
            <button key={item} className="block px-2 py-1 text-sm">{item}</button>
          ))}
        </div>
      )}
    </div>
  );
}
