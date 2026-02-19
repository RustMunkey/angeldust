import { HeroCarousel } from "@/components/hero-carousel";
import { FeaturedProducts } from "@/components/featured-products";
import { FeaturedCategories } from "@/components/featured-categories";
import { BrandMarquee } from "@/components/brand-marquee";
import { EditorialBanner } from "@/components/editorial-banner";
import { NewArrivals } from "@/components/new-arrivals";
import { TrustStrip } from "@/components/trust-strip";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { listProducts, listCategories } from "@/lib/quickdash";
import { qdProductToStorefront, qdCategoryToStorefront } from "@/lib/products";

export default async function Page() {
  const [productsRes, categoriesRes] = await Promise.all([
    listProducts({ limit: 20, sort: "createdAt", order: "desc" }).catch(() => null),
    listCategories({ withCount: true }).catch(() => null),
  ]);

  const products = (productsRes?.products ?? []).map((p) => qdProductToStorefront(p, true));
  const categories = (categoriesRes?.categories ?? []).map(qdCategoryToStorefront);

  return (
    <main className="pt-[140px] bg-black">
      <HeroCarousel />
      <div className="relative z-10 bg-black rounded-t-3xl -mt-8">
        <FeaturedProducts products={products} />
        <FeaturedCategories categories={categories} />
        <BrandMarquee />
        <EditorialBanner />
        <NewArrivals products={products} />
        <TrustStrip />
        <CtaSection />
        <Footer />
      </div>
    </main>
  );
}
