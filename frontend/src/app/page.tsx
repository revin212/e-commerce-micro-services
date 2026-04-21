import Link from "next/link";
import { api } from "@/lib/api/client/fetcher";
import type { ListProductsResponse } from "@/lib/api/contracts/products";
import { Button } from "@/components/ui";
import { AtelierCarousel, ProductCard } from "@/components/product";

export default async function Home() {
  const products = await api.get<ListProductsResponse>("/products");
  return (
    <div className="mx-auto max-w-7xl space-y-12 px-6 py-10">
      <section className="rounded-xl bg-surface-container-low p-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Elevate Your Lifestyle</h1>
        <p className="mx-auto mt-4 max-w-2xl text-on-surface-variant">
          Curated essentials for the modern aesthetic. Discover objects that transcend the ordinary.
        </p>
        <Link href="/shop" className="mt-8 inline-block">
          <Button>Explore the Collection</Button>
        </Link>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Curated Categories</h2>
          <Link href="/shop" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <AtelierCarousel>
          {products.items.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price.amount}
              image={product.images[0]}
            />
          ))}
        </AtelierCarousel>
      </section>
    </div>
  );
}
