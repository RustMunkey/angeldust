import { notFound } from "next/navigation";
import { listProducts, listCategories } from "@/lib/quickdash";
import { qdProductToStorefront } from "@/lib/products";
import { CategoryGrid } from "@/components/category-grid";
import { Footer } from "@/components/footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [categoriesRes, productsRes] = await Promise.all([
    listCategories().catch(() => null),
    listProducts({ category: slug, limit: 48 }).catch(() => null),
  ]);

  const category = categoriesRes?.categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = (productsRes?.products ?? []).map((p) => qdProductToStorefront(p));

  return (
    <main className="pt-[140px] bg-black min-h-screen">
      <div className="px-4 sm:px-20 md:px-32 py-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-white/30 mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-white/60 transition-colors">Home</a>
          <span>/</span>
          <span className="text-white/50">{category.name}</span>
        </nav>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="font-serif text-3xl sm:text-5xl text-white mb-3">{category.name}</h1>
          {category.description && (
            <p className="text-white/50 text-sm max-w-xl">{category.description}</p>
          )}
          <p className="text-white/30 text-xs mt-2">{products.length} products</p>
        </div>

        <CategoryGrid products={products} />
      </div>

      <Footer />
    </main>
  );
}
