"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button, Chip, Drawer, Input } from "@/components/ui";
import { useCartStore } from "@/lib/store/cart";
import { useSearchStore } from "@/lib/store/search";

export function AppHeader() {
  const pathname = usePathname();
  const { items } = useCartStore();
  const { setOverlayOpen } = useSearchStore();
  return (
    <header className="sticky top-0 z-40 glass-surface shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-primary">PortoCommerce</Link>
        <nav className="hidden gap-5 text-sm md:flex">
          {[
            ["/shop", "Shop"],
            ["/orders", "Orders"],
            ["/account/profile", "Account"],
            ["/admin", "Admin"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className={pathname.startsWith(href) ? "text-primary" : "text-on-surface-variant"}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setOverlayOpen(true)}>Search</Button>
          <Link href="/cart" className="rounded-DEFAULT bg-surface-container-high px-3 py-2 text-sm">Cart ({items.length})</Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-surface-container-low py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-6 text-sm text-on-surface-variant md:flex-row">
        <p>© 2026 PortoCommerce. The Digital Atelier.</p>
        <div className="flex gap-4">
          <Link href="/shop">Shop</Link>
          <Link href="/account/profile">Account</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </footer>
  );
}

export function SearchOverlay() {
  const { overlayOpen, setOverlayOpen, query, setQuery, recent } = useSearchStore();
  if (!overlayOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-on-surface/30 p-6 backdrop-blur-glass">
      <div className="mx-auto max-w-3xl rounded-xl bg-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Search</h2>
          <button onClick={() => setOverlayOpen(false)} aria-label="close">x</button>
        </div>
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search curated goods..." />
        <div className="mt-4 flex flex-wrap gap-2">
          {(recent.length ? recent : ["Linen", "Lamp", "Ceramic"]).map((term) => (
            <Chip key={term}>{term}</Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AccountSidebar() {
  const pathname = usePathname();
  const links = [
    ["/account/profile", "Profile"],
    ["/account/addresses", "Addresses"],
    ["/account/payment", "Payment"],
    ["/account/wishlist", "Wishlist"],
  ];
  return (
    <aside className="space-y-2 rounded-lg bg-surface-container-low p-4">
      {links.map(([href, label]) => (
        <Link key={href} href={href} className={`block rounded-DEFAULT px-3 py-2 text-sm ${pathname === href ? "bg-surface-bright text-primary" : "text-on-surface-variant"}`}>
          {label}
        </Link>
      ))}
    </aside>
  );
}

export function AdminSidebar() {
  return (
    <aside className="space-y-2 rounded-lg bg-surface-container-low p-4">
      <Link href="/admin" className="block rounded-DEFAULT px-3 py-2 text-sm">Dashboard</Link>
      <Link href="/admin/inventory" className="block rounded-DEFAULT px-3 py-2 text-sm">Inventory</Link>
    </aside>
  );
}

export function CheckoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between rounded-lg bg-surface-container-low px-4 py-3">
        <Link href="/cart">Return to Cart</Link>
        <p className="font-semibold text-primary">Secure Checkout</p>
      </div>
      {children}
    </div>
  );
}

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items } = useCartStore();
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Cart Preview</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <h3 className="mb-3 text-lg font-semibold">Cart</h3>
        <div className="space-y-2 text-sm">
          {items.length === 0 ? <p>No items yet.</p> : items.map((item) => <p key={item.id}>{item.name} x {item.quantity}</p>)}
        </div>
      </Drawer>
    </>
  );
}
