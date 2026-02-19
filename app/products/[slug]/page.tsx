import { notFound } from "next/navigation";
import { getProduct } from "@/lib/quickdash";
import { ProductGallery } from "@/components/product-gallery";
import { ProductInfo } from "@/components/product-info";
import { Footer } from "@/components/footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const res = await getProduct(slug).catch(() => null);
  if (!res?.product) notFound();

  const { product } = res;

  return (
    <main className="pt-[140px] bg-black min-h-screen">
      <div className="px-4 sm:px-20 md:px-32 py-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-white/30 mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-white/60 transition-colors">Home</a>
          <span>/</span>
          {product.category && (
            <>
              <a href={`/categories/${product.category.slug}`} className="hover:text-white/60 transition-colors">
                {product.category.name}
              </a>
              <span>/</span>
            </>
          )}
          <span className="text-white/50">{product.name}</span>
        </nav>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          <ProductGallery images={product.images} thumbnail={product.thumbnail} name={product.name} />
          <ProductInfo product={product} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
