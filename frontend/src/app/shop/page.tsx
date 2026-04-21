import { ProductCard, ProductGrid } from "@/components/product";
import { Chip, Input, Pagination, Select, Switch } from "@/components/ui";
import { api } from "@/lib/api/client/fetcher";
import type { ListProductsResponse } from "@/lib/api/contracts/products";

export default async function ShopPage() {
  const products = await api.get<ListProductsResponse>("/products");
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-4 rounded-lg bg-surface-container-low p-4">
        <h2 className="font-semibold">Filters</h2>
        <Input placeholder="Max price" />
        <div className="space-y-2 text-sm text-on-surface-variant">
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Lighting</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Furniture</label>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">In Stock only</span>
          <Switch checked={true} />
        </div>
      </aside>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <Chip>Lighting</Chip>
            <Chip>In stock</Chip>
          </div>
          <Select defaultValue="featured">
            <option value="featured">Featured</option>
            <option value="price_asc">Price: Low to high</option>
          </Select>
        </div>
        <ProductGrid>
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
        </ProductGrid>
        <Pagination page={1} total={1} />
      </div>
    </div>
  );
}
