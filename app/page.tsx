"use client";

import { HeroCarousel } from "@/components/hero-carousel";
import { FeaturedProducts } from "@/components/featured-products";
import { FeaturedCategories } from "@/components/featured-categories";
import { BrandMarquee } from "@/components/brand-marquee";
import { EditorialBanner } from "@/components/editorial-banner";
import { NewArrivals } from "@/components/new-arrivals";
import { TrustStrip } from "@/components/trust-strip";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";

export default function Page() {
  const { language } = useLanguage();

  return (
    <main className="pt-[140px] bg-black">
      <HeroCarousel language={language} />
      <div className="relative z-10 bg-black rounded-t-3xl -mt-8">
        <FeaturedProducts />
        <FeaturedCategories />
        <BrandMarquee />
        <EditorialBanner />
        <NewArrivals />
        <TrustStrip />
        <CtaSection />
        <Footer />
      </div>
    </main>
  );
}
