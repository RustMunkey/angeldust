"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

const categories = [
  { key: "makeup",    image: "/hero/makeup-11.jpg", name: { es: "Maquillaje", en: "Makeup" },         span: "col-span-2 row-span-1 md:row-span-2" },
  { key: "skincare",  image: "/hero/makeup-13.jpg", name: { es: "Cuidado de piel", en: "Skincare" },   span: "col-span-1 row-span-1" },
  { key: "fragrance", image: "/hero/makeup-15.jpg", name: { es: "Fragancias", en: "Fragrance" },       span: "col-span-1 row-span-1" },
  { key: "hair",      image: "/hero/makeup-16.jpg", name: { es: "Cabello", en: "Hair" },               span: "col-span-1 row-span-1" },
  { key: "bath",      image: "/hero/makeup-18.jpg", name: { es: "Baño y cuerpo", en: "Bath & Body" },  span: "col-span-1 row-span-1" },
];

export function FeaturedCategories() {
  const { language } = useLanguage();

  return (
    <section className="px-4 sm:px-20 md:px-32 py-20">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-serif text-2xl sm:text-4xl text-white">
          {language === "es" ? "Categorías" : "Shop by Category"}
        </h2>
        <a href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors">
          {language === "es" ? "Ver todo →" : "View all →"}
        </a>
      </div>

      <div className="flex flex-col gap-3 md:grid md:grid-cols-4 md:grid-rows-2 md:h-[600px]">
        {categories.map((cat) => (
          <a
            key={cat.key}
            href="#"
            className={`relative overflow-hidden rounded-xl group h-[200px] md:h-auto ${cat.span}`}
          >
            <Image
              src={cat.image}
              alt={cat.name.en}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-end p-5">
              <span className="font-serif text-2xl text-white">
                {language === "es" ? cat.name.es : cat.name.en}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
