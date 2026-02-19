"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft01Icon, ArrowRight01Icon, FavouriteIcon, ShoppingBasket02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLanguage } from "@/components/language-provider";

const products = [
  { id: 1,  image: "/hero/makeup-20.jpg", brand: "Pat McGrath",         name: { es: "Base Sublime Perfection", en: "Sublime Perfection Foundation" }, price: { MXN: 1890, USD: 95, CAD: 129 }, isNew: true },
  { id: 2,  image: "/hero/makeup-19.jpg", brand: "Hourglass",           name: { es: "Polvo Ambient Lighting", en: "Ambient Lighting Powder" }, price: { MXN: 1650, USD: 83, CAD: 113 }, isNew: true },
  { id: 3,  image: "/hero/makeup-18.jpg", brand: "ILIA",                name: { es: "Sérum con Color Super Serum", en: "Super Serum Skin Tint" }, price: { MXN: 1100, USD: 55, CAD: 75 }, isNew: true },
  { id: 4,  image: "/hero/makeup-17.jpg", brand: "Tower 28",            name: { es: "Brillo ShineOn Lip Jelly", en: "ShineOn Lip Jelly" }, price: { MXN: 480, USD: 24, CAD: 33 }, isNew: true },
  { id: 5,  image: "/hero/makeup-16.jpg", brand: "Milk Makeup",         name: { es: "Blush Cream Bionic", en: "Bionic Blush" }, price: { MXN: 720, USD: 36, CAD: 49 }, isNew: true },
  { id: 6,  image: "/hero/makeup-15.jpg", brand: "Charlotte Tilbury",   name: { es: "Paleta Luxury Eye", en: "Luxury Eye Palette" }, price: { MXN: 2100, USD: 106, CAD: 144 }, isNew: true },
  { id: 7,  image: "/hero/makeup-14.jpg", brand: "Rare Beauty",         name: { es: "Corrector Perfect Strokes", en: "Perfect Strokes Concealer" }, price: { MXN: 790, USD: 40, CAD: 54 }, isNew: true },
  { id: 8,  image: "/hero/makeup-13.jpg", brand: "Fenty Beauty",        name: { es: "Highlighter Trophy Wife", en: "Trophy Wife Highlighter" }, price: { MXN: 680, USD: 34, CAD: 46 }, isNew: true },
  { id: 9,  image: "/hero/makeup-12.jpg", brand: "Dior Beauty",         name: { es: "Labial Rouge Dior", en: "Rouge Dior Lipstick" }, price: { MXN: 1350, USD: 68, CAD: 92 }, isNew: true },
  { id: 10, image: "/hero/makeup-11.jpg", brand: "Tom Ford Beauty",     name: { es: "Gloss de Labios", en: "Lip Gloss" }, price: { MXN: 1480, USD: 74, CAD: 101 }, isNew: true },
  { id: 11, image: "/hero/makeup-10.jpg", brand: "YSL Beauty",          name: { es: "Labial Loulou", en: "Loulou Lipstick" }, price: { MXN: 980, USD: 49, CAD: 67 }, isNew: true },
  { id: 12, image: "/hero/makeup-9.jpg",  brand: "Lancôme",             name: { es: "Máscara Monsieur Big", en: "Monsieur Big Mascara" }, price: { MXN: 890, USD: 45, CAD: 61 }, isNew: true },
];

const currencySymbol = { MXN: "$", USD: "$", CAD: "CA$" };

export function NewArrivals() {
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
          {language === "es" ? "Nuevos Lanzamientos" : "New Arrivals"}
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

      <div ref={scrollRef} onScroll={onScroll} className="w-full overflow-x-auto no-scrollbar scroll-smooth">
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
                <span className="absolute top-2 left-2 text-[10px] uppercase tracking-widest bg-white text-stone-900 px-2 py-0.5 font-medium rounded-full">
                  {language === "es" ? "Nuevo" : "New"}
                </span>
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

      <div className="relative h-[3px] mx-4 sm:mx-20 md:mx-32 mt-10 bg-white/10">
        <div
          className="absolute top-0 h-full bg-white/40"
          style={{ left: `${thumbLeft}%`, width: `${thumbWidth}%` }}
        />
      </div>
    </section>
  );
}
