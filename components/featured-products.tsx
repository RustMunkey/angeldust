"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft01Icon, ArrowRight01Icon, FavouriteIcon, ShoppingBasket02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLanguage } from "@/components/language-provider";

const products = [
  { id: 1,  image: "/hero/makeup-1.jpg",  brand: "Charlotte Tilbury", name: { es: "Barra de labios Matte Revolution", en: "Matte Revolution Lipstick" }, price: { MXN: 890, USD: 45, CAD: 61 } },
  { id: 2,  image: "/hero/makeup-2.jpg",  brand: "NARS",               name: { es: "Base Natural Radiant Longwear", en: "Natural Radiant Longwear Foundation" }, price: { MXN: 1250, USD: 63, CAD: 86 } },
  { id: 3,  image: "/hero/makeup-3.jpg",  brand: "Rare Beauty",        name: { es: "Rubor Soft Pinch", en: "Soft Pinch Liquid Blush" }, price: { MXN: 720, USD: 36, CAD: 49 } },
  { id: 4,  image: "/hero/makeup-4.jpg",  brand: "Fenty Beauty",       name: { es: "Corrector Pro Filt'r", en: "Pro Filt'r Concealer" }, price: { MXN: 680, USD: 34, CAD: 46 } },
  { id: 5,  image: "/hero/makeup-5.jpg",  brand: "MAC",                name: { es: "Polvo Studio Fix", en: "Studio Fix Powder" }, price: { MXN: 780, USD: 39, CAD: 53 } },
  { id: 6,  image: "/hero/makeup-6.jpg",  brand: "Urban Decay",        name: { es: "Paleta Naked Midnight", en: "Naked Midnight Palette" }, price: { MXN: 1890, USD: 95, CAD: 129 } },
  { id: 7,  image: "/hero/makeup_7.jpg",  brand: "Benefit",            name: { es: "Máscara They're Real", en: "They're Real Mascara" }, price: { MXN: 650, USD: 33, CAD: 44 } },
  { id: 8,  image: "/hero/makeup-8.jpg",  brand: "Too Faced",          name: { es: "Mejor Sexo Base", en: "Better Than Sex Foundation" }, price: { MXN: 1100, USD: 55, CAD: 75 } },
  { id: 9,  image: "/hero/makeup-9.jpg",  brand: "Morphe",             name: { es: "Paleta de ojos 35O", en: "35O Eyeshadow Palette" }, price: { MXN: 950, USD: 48, CAD: 65 } },
  { id: 10, image: "/hero/makeup-10.jpg", brand: "NYX",                name: { es: "Labial Soft Matte Lip Cream", en: "Soft Matte Lip Cream" }, price: { MXN: 290, USD: 15, CAD: 20 } },
  { id: 11, image: "/hero/makeup-11.jpg", brand: "Charlotte Tilbury",  name: { es: "Iluminador Hollywood Glow", en: "Hollywood Glow Highlighter" }, price: { MXN: 1350, USD: 68, CAD: 92 } },
  { id: 12, image: "/hero/makeup-12.jpg", brand: "NARS",               name: { es: "Delineador Eyeliner Stylo", en: "Eyeliner Stylo" }, price: { MXN: 580, USD: 29, CAD: 39 } },
  { id: 13, image: "/hero/makeup-13.jpg", brand: "Fenty Beauty",       name: { es: "Brillo de labios Gloss Bomb", en: "Gloss Bomb Lip Gloss" }, price: { MXN: 490, USD: 25, CAD: 34 } },
  { id: 14, image: "/hero/makeup-14.jpg", brand: "Rare Beauty",        name: { es: "Base Liquid Touch", en: "Liquid Touch Foundation" }, price: { MXN: 980, USD: 49, CAD: 67 } },
  { id: 15, image: "/hero/makeup-15.jpg", brand: "MAC",                name: { es: "Labial Ruby Woo", en: "Ruby Woo Lipstick" }, price: { MXN: 520, USD: 26, CAD: 35 } },
  { id: 16, image: "/hero/makeup-16.jpg", brand: "Urban Decay",        name: { es: "Setting Spray All Nighter", en: "All Nighter Setting Spray" }, price: { MXN: 760, USD: 38, CAD: 52 } },
  { id: 17, image: "/hero/makeup-17.jpg", brand: "Benefit",            name: { es: "Bronzer Hoola", en: "Hoola Bronzer" }, price: { MXN: 840, USD: 42, CAD: 57 } },
  { id: 18, image: "/hero/makeup-18.jpg", brand: "Too Faced",          name: { es: "Paleta Natural Eyes", en: "Natural Eyes Palette" }, price: { MXN: 1150, USD: 58, CAD: 79 } },
  { id: 19, image: "/hero/makeup-19.jpg", brand: "Morphe",             name: { es: "Brocha Set Vegan", en: "Vegan Brush Set" }, price: { MXN: 1050, USD: 53, CAD: 72 } },
  { id: 20, image: "/hero/makeup-20.jpg", brand: "NYX",                name: { es: "Primer Studio Perfect", en: "Studio Perfect Primer" }, price: { MXN: 340, USD: 17, CAD: 23 } },
];

const currencySymbol = { MXN: "$", USD: "$", CAD: "CA$" };

export function FeaturedProducts() {
  const { language, currency } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumbLeft, setThumbLeft] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(20);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -600 : 600, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollable = el.scrollWidth - el.clientWidth;
    const progress = el.scrollLeft / scrollable;
    const thumb = (el.clientWidth / el.scrollWidth) * 100;
    setThumbWidth(thumb);
    setThumbLeft(progress * (100 - thumb));
  };

  return (
    <section className="pt-20 pb-10">
      <div className="flex items-end justify-between px-4 sm:px-20 md:px-32 mb-10">
        <h2 className="font-serif text-2xl sm:text-4xl text-white">
          {language === "es" ? "Productos Destacados" : "Featured Products"}
        </h2>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => scroll("left")} className="hidden md:flex p-2 rounded-full border border-white/20 text-white hover:border-white/50 transition-colors cursor-pointer">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
          </button>
          <button type="button" onClick={() => scroll("right")} className="hidden md:flex p-2 rounded-full border border-white/20 text-white hover:border-white/50 transition-colors cursor-pointer">
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </button>
          <a href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors md:ml-2">
            {language === "es" ? "Ver todo →" : "View all →"}
          </a>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="w-full overflow-x-auto no-scrollbar scroll-smooth"
      >
        <div className="flex gap-4 pl-4 sm:pl-20 md:pl-32 pr-4 sm:pr-20 md:pr-32 w-max">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer flex-none w-52">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3 bg-stone-900">
                <Image
                  src={product.image}
                  alt={product.name.en}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <HugeiconsIcon icon={FavouriteIcon} size={20} strokeWidth={1.5} className="absolute top-2.5 right-2.5 text-black hover:text-black/60 transition-colors cursor-pointer drop-shadow-md" />
              </div>
              <p className="text-xs text-white/40 mb-0.5">{product.brand}</p>
              <p className="text-sm text-white leading-snug min-h-[2.75rem]">
                {language === "es" ? product.name.es : product.name.en}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/70">
                  {currencySymbol[currency]}{product.price[currency].toLocaleString()}
                  {currency === "MXN" && " MXN"}
                </p>
                <HugeiconsIcon icon={ShoppingBasket02Icon} size={18} strokeWidth={1.5} className="text-white/60 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom scrollbar at bottom of section */}
      <div className="relative h-[3px] mx-4 sm:mx-20 md:mx-32 mt-10 bg-white/10">
        <div
          className="absolute top-0 h-full bg-white/40"
          style={{ left: `${thumbLeft}%`, width: `${thumbWidth}%` }}
        />
      </div>
    </section>
  );
}
