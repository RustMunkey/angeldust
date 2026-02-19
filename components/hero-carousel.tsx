"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

const slides = [
  {
    id: 1,
    image: "/hero/makeup-1.jpg",
    gradient: "from-rose-950 via-rose-900 to-stone-900",
    label: { es: "Nueva colección", en: "New Collection" },
    title: { es: "Primavera 2025", en: "Spring 2025" },
    subtitle: {
      es: "Descubre los nuevos tonos de la temporada",
      en: "Discover the new shades of the season",
    },
    cta: { es: "Ver colección", en: "Shop Now" },
  },
  {
    id: 2,
    image: "/hero/makeup-2.jpg",
    gradient: "from-stone-900 via-pink-950 to-rose-900",
    label: { es: "Exclusivo", en: "Exclusive" },
    title: { es: "Charlotte Tilbury", en: "Charlotte Tilbury" },
    subtitle: {
      es: "La colección completa disponible ahora",
      en: "The full collection available now",
    },
    cta: { es: "Explorar", en: "Explore" },
  },
  {
    id: 3,
    image: "/hero/makeup-3.jpg",
    gradient: "from-neutral-900 via-stone-800 to-rose-950",
    label: { es: "Oferta especial", en: "Special Offer" },
    title: { es: "Hasta 40% de descuento", en: "Up to 40% Off" },
    subtitle: {
      es: "En las mejores marcas de skincare",
      en: "On top skincare brands",
    },
    cta: { es: "Ver ofertas", en: "Shop Sale" },
  },
  {
    id: 4,
    image: "/hero/makeup-4.jpg",
    gradient: "from-rose-900 via-stone-900 to-neutral-900",
    label: { es: "Tendencia", en: "Trending" },
    title: { es: "Skincare minimalista", en: "Minimalist Skincare" },
    subtitle: {
      es: "Rutinas simples, resultados extraordinarios",
      en: "Simple routines, extraordinary results",
    },
    cta: { es: "Ver rutinas", en: "View Routines" },
  },
];

export function HeroCarousel() {
  const { language } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="relative w-full h-[calc(100vh-140px)] min-h-[500px] overflow-hidden">
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={cn(
                "relative flex-none w-full h-full bg-gradient-to-br",
                slide.gradient
              )}
            >
              {/* Photo */}
              <Image
                src={slide.image}
                alt=""
                fill
                className="object-cover opacity-40 mix-blend-luminosity"
                priority={slide.id === 1}
              />

              {/* Noise texture overlay */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-20 md:px-32">
                <span className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">
                  {language === "es" ? slide.label.es : slide.label.en}
                </span>
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">
                  {language === "es" ? slide.title.es : slide.title.en}
                </h1>
                <p className="text-white/60 text-base sm:text-lg mb-8 max-w-md">
                  {language === "es" ? slide.subtitle.es : slide.subtitle.en}
                </p>
                <div>
                  <button className="px-8 py-3 bg-rose-800 text-white text-sm font-medium tracking-wide hover:bg-rose-700 transition-colors border-0 outline-none cursor-pointer rounded-full">
                    {language === "es" ? slide.cta.es : slide.cta.en}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300",
              i === selectedIndex ? "bg-rose-800 w-6" : "bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
