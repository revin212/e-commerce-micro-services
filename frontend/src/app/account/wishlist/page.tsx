import { AccountSidebar } from "@/components/layout";
import { Card } from "@/components/ui";
import { ProductCard, ProductGrid } from "@/components/product";

export default function AccountWishlistPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[260px_1fr]">
      <AccountSidebar />
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Wishlist</h1>
        <Card>
          <ProductGrid>
            <ProductCard id="1" slug="atelier-lamp" name="Atelier Lamp" price={189} />
            <ProductCard id="2" slug="contour-vase" name="Contour Vase" price={59} />
          </ProductGrid>
        </Card>
      </div>
    </div>
  );
}
