"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

interface EditorialBannerProps {
  image: string;
  label: { es: string; en: string };
  title: { es: string; en: string };
  body: { es: string; en: string };
  cta: { es: string; en: string };
  flip?: boolean;
}

function Banner({ image, label, title, body, cta, flip }: EditorialBannerProps) {
  const { language } = useLanguage();

  const imageEl = (
    <div className="relative w-full h-[260px] md:w-1/2 md:h-full shrink-0">
      <Image src={image} alt="" fill className="object-cover" />
    </div>
  );

  const contentEl = (
    <div className="relative w-full md:w-1/2 bg-white flex flex-col justify-end p-8 md:p-14">
      <span className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-4">
        {language === "es" ? label.es : label.en}
      </span>
      <h2 className="font-serif text-3xl md:text-5xl text-stone-900 leading-tight mb-5 whitespace-pre-line">
        {language === "es" ? title.es : title.en}
      </h2>
      <p className="text-stone-500 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
        {language === "es" ? body.es : body.en}
      </p>
      <div>
        <a
          href="#"
          className="inline-block px-8 py-3.5 bg-rose-800 text-white text-sm font-medium tracking-wide hover:bg-rose-700 transition-colors rounded-full"
        >
          {language === "es" ? cta.es : cta.en}
        </a>
      </div>
    </div>
  );

  return (
    <div className="relative w-full rounded-2xl overflow-hidden flex flex-col md:flex-row md:h-[600px]">
      {imageEl}
      {contentEl}
    </div>
  );
}

export function EditorialBanner() {
  return (
    <section className="px-4 sm:px-20 md:px-32 py-20 flex flex-col gap-6">
      <Banner
        image="/hero/makeup-12.jpg"
        label={{ es: "Colección destacada", en: "Featured Collection" }}
        title={{ es: "The Charlotte\nTilbury Edit", en: "The Charlotte\nTilbury Edit" }}
        body={{
          es: "Descubre la colección completa de la maestra del maquillaje. Desde bases hasta labiales icónicos.",
          en: "Discover the full collection from the master of makeup. From foundations to iconic lip colours.",
        }}
        cta={{ es: "Explorar colección", en: "Shop the Edit" }}
      />
      <Banner
        image="/hero/makeup-14.jpg"
        label={{ es: "Nueva temporada", en: "New Season" }}
        title={{ es: "The Skincare\nEdit", en: "The Skincare\nEdit" }}
        body={{
          es: "Las mejores rutinas de cuidado de piel de las marcas más buscadas del momento.",
          en: "The best skincare routines from the most sought-after brands right now.",
        }}
        cta={{ es: "Ver skincare", en: "Shop Skincare" }}
        flip
      />
    </section>
  );
}
