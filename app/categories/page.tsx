import { listCategories } from "@/lib/quickdash";
import { qdCategoryToStorefront } from "@/lib/products";
import { AllCategoriesGrid } from "@/components/all-categories-grid";
import { Footer } from "@/components/footer";

export default async function CategoriesPage() {
  const res = await listCategories({ withCount: true }).catch(() => null);
  const categories = (res?.categories ?? []).map(qdCategoryToStorefront);

  return (
    <main className="pt-[140px] bg-black min-h-screen">
      <div className="px-4 sm:px-20 md:px-32 py-12">
        <nav className="text-xs text-white/30 mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-white/60 transition-colors">Home</a>
          <span>/</span>
          <span className="text-white/50">Categories</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-5xl text-white mb-10">Shop by Category</h1>

        <AllCategoriesGrid categories={categories} />
      </div>

      <Footer />
    </main>
  );
}
