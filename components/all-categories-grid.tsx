"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import type { StorefrontCategory } from "@/lib/products";

const placeholders: StorefrontCategory[] = [
  { id: "1", slug: "makeup",    image: "/hero/makeup-11.jpg", nameEs: "Maquillaje",      nameEn: "Makeup" },
  { id: "2", slug: "skincare",  image: "/hero/makeup-13.jpg", nameEs: "Cuidado de piel", nameEn: "Skincare" },
  { id: "3", slug: "fragrance", image: "/hero/makeup-15.jpg", nameEs: "Fragancias",      nameEn: "Fragrance" },
  { id: "4", slug: "hair",      image: "/hero/makeup-16.jpg", nameEs: "Cabello",         nameEn: "Hair" },
  { id: "5", slug: "bath",      image: "/hero/makeup-18.jpg", nameEs: "Baño y cuerpo",   nameEn: "Bath & Body" },
];

interface Props {
  categories: StorefrontCategory[];
}

export function AllCategoriesGrid({ categories: qdCategories }: Props) {
  const { language } = useLanguage();
  const withImages = qdCategories.filter((c) => c.image);
  const categories = withImages.length >= 2 ? qdCategories : placeholders;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categories/${cat.slug}`}
          className="relative overflow-hidden rounded-xl group h-[220px] sm:h-[280px] block"
        >
          {cat.image ? (
            <Image
              src={cat.image}
              alt={language === "es" ? cat.nameEs : cat.nameEn}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-stone-900" />
          )}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-end p-6">
            <span className="font-serif text-3xl text-white">
              {language === "es" ? cat.nameEs : cat.nameEn}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
