import { notFound } from "next/navigation";
import { Breadcrumbs, Button } from "@/components/ui";
import { ProductDetailsPanel, ProductGallery, ProductGrid, ProductCard } from "@/components/product";
import { api } from "@/lib/api/client/fetcher";
import type { Product } from "@/lib/api/contracts/products";

type Params = { slug: string };

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = await api.get<Product>(`/products/${slug}`);
  if (!product) notFound();
  const related = await api.get<{ items: Product[] }>("/products");

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/shop", label: "Shop" }, { href: `/product/${slug}`, label: product.name }]} />
      <section className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-on-surface-variant">{product.description}</p>
          <ProductDetailsPanel />
          <Button className="w-full">Buy Now</Button>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Complete the Look</h2>
        <ProductGrid>
          {related.items.map((item) => (
            <ProductCard key={item.id} id={item.id} slug={item.slug} name={item.name} price={item.price.amount} image={item.images[0]} />
          ))}
        </ProductGrid>
      </section>
    </div>
  );
}
