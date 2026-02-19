"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import type { StorefrontCategory } from "@/lib/products";

// Bento spans assigned by position (first category gets the big slot)
const bentoSpans = [
  "col-span-2 row-span-1 md:row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

const placeholders: StorefrontCategory[] = [
  { id: "1", slug: "makeup",    image: "/hero/makeup-11.jpg", nameEs: "Maquillaje",      nameEn: "Makeup" },
  { id: "2", slug: "skincare",  image: "/hero/makeup-13.jpg", nameEs: "Cuidado de piel", nameEn: "Skincare" },
  { id: "3", slug: "fragrance", image: "/hero/makeup-15.jpg", nameEs: "Fragancias",      nameEn: "Fragrance" },
  { id: "4", slug: "hair",      image: "/hero/makeup-16.jpg", nameEs: "Cabello",         nameEn: "Hair" },
  { id: "5", slug: "bath",      image: "/hero/makeup-18.jpg", nameEs: "Baño y cuerpo",   nameEn: "Bath & Body" },
];

interface Props {
  categories?: StorefrontCategory[];
}

export function FeaturedCategories({ categories: qdCategories = [] }: Props) {
  const { language } = useLanguage();

  // Use real categories if we have them (up to 5 with images), otherwise placeholders
  const withImages = qdCategories.filter((c) => c.image);
  const categories = withImages.length >= 2 ? withImages.slice(0, 5) : placeholders;

  return (
    <section className="px-4 sm:px-20 md:px-32 py-20">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-serif text-2xl sm:text-4xl text-white">
          {language === "es" ? "Categorías" : "Shop by Category"}
        </h2>
        <Link href="/categories" className="text-sm text-white/40 hover:text-white/70 transition-colors">
          {language === "es" ? "Ver todo →" : "View all →"}
        </Link>
      </div>

      <div className="flex flex-col gap-3 md:grid md:grid-cols-4 md:grid-rows-2 md:h-[600px]">
        {categories.map((cat, i) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className={`relative overflow-hidden rounded-xl group h-[200px] md:h-auto ${bentoSpans[i] ?? "col-span-1 row-span-1"}`}
          >
            {cat.image && (
              <Image
                src={cat.image}
                alt={language === "es" ? cat.nameEs : cat.nameEn}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-end p-5">
              <span className="font-serif text-2xl text-white">
                {language === "es" ? cat.nameEs : cat.nameEn}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
