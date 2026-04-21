"use client";

import Image from "next/image";
import { useState } from "react";
import { Accordion, Badge, Button, Card, QuantityStepper, StarRating } from "@/components/ui";
import { formatCurrency } from "@/lib/design/format";

type ProductCardProps = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
};

export function ProductCard({ name, price, image = "/next.svg" }: ProductCardProps) {
  return (
    <Card className="space-y-3">
      <div className="relative h-44 rounded-lg bg-surface-container-high">
        <Image src={image} alt={name} fill className="object-cover p-2" />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-on-surface-variant">{formatCurrency(price)}</p>
        <StarRating rating={4.5} />
      </div>
      <Button className="w-full">Quick Add</Button>
    </Card>
  );
}

export function ProductGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-6 md:grid-cols-3">{children}</div>;
}

export function AtelierCarousel({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-6 md:grid-cols-3">{children}</div>;
}

export function ProductGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(images[0] ?? "/next.svg");
  return (
    <div className="grid gap-3 md:grid-cols-[96px_1fr]">
      <div className="flex gap-2 md:flex-col">
        {images.map((src) => (
          <button key={src} onClick={() => setActive(src)} className="h-20 w-20 rounded-DEFAULT bg-surface-container-high p-1">
            <Image src={src} alt="thumbnail" width={80} height={80} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <div className="relative h-96 rounded-xl bg-surface-container-high">
        <Image src={active} alt="product image" fill className="object-cover p-4" />
      </div>
    </div>
  );
}

export function VariantPicker() {
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Sand");
  return (
    <div className="space-y-3">
      <div>
        <p className="mb-2 text-sm text-on-surface-variant">Color</p>
        <div className="flex gap-2">
          {["Sand", "Graphite"].map((item) => (
            <Button key={item} variant={item === color ? "primary" : "secondary"} onClick={() => setColor(item)}>{item}</Button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm text-on-surface-variant">Size</p>
        <div className="flex gap-2">
          {["S", "M", "L", "XL"].map((item) => (
            <Button key={item} variant={item === size ? "primary" : "secondary"} disabled={item === "XL"} onClick={() => setSize(item)}>{item}</Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LowStockBanner() {
  return (
    <div className="rounded-DEFAULT bg-error-container px-3 py-2 text-sm text-error">
      Only 3 left in stock.
    </div>
  );
}

export function ProductDetailsPanel() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="space-y-4">
      <Badge>New</Badge>
      <VariantPicker />
      <LowStockBanner />
      <QuantityStepper value={quantity} onChange={setQuantity} />
      <Button className="w-full">Add to Cart</Button>
      <Accordion title="Shipping">Arrives in 2-4 business days.</Accordion>
      <Accordion title="Materials">Premium coated alloy.</Accordion>
    </div>
  );
}
