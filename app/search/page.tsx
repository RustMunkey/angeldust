import { listProducts } from "@/lib/quickdash";
import { qdProductToStorefront } from "@/lib/products";
import { CategoryGrid } from "@/components/category-grid";
import { Footer } from "@/components/footer";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const res = query
    ? await listProducts({ search: query, limit: 40 }).catch(() => null)
    : null;

  const products = (res?.products ?? []).map((p) => qdProductToStorefront(p, true));

  return (
    <main className="pt-[140px] bg-black min-h-screen">
      <div className="px-4 sm:px-20 md:px-32 py-12">
        <div className="mb-10">
          <h1 className="text-2xl font-serif text-white mb-1">
            {query ? `Results for "${query}"` : "Search"}
          </h1>
          {query && (
            <p className="text-sm text-white/40">
              {products.length === 0
                ? "No products found."
                : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
            </p>
          )}
        </div>

        {query && <CategoryGrid products={products} />}
      </div>
      <Footer />
    </main>
  );
}
