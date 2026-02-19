"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft01Icon, ArrowRight01Icon, FavouriteIcon, ShoppingBasket02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLanguage } from "@/components/language-provider";
import type { StorefrontProduct } from "@/lib/products";

const placeholders: StorefrontProduct[] = [
  { id: "1",  slug: "sublime-perfection-foundation", image: "/hero/makeup-20.jpg", brand: "Pat McGrath",       nameEs: "Base Sublime Perfection",    nameEn: "Sublime Perfection Foundation", priceMXN: 1890, priceUSD: 95,  priceCAD: 129, isNew: true },
  { id: "2",  slug: "ambient-lighting-powder",       image: "/hero/makeup-19.jpg", brand: "Hourglass",        nameEs: "Polvo Ambient Lighting",     nameEn: "Ambient Lighting Powder",       priceMXN: 1650, priceUSD: 83,  priceCAD: 113, isNew: true },
  { id: "3",  slug: "super-serum-skin-tint",         image: "/hero/makeup-18.jpg", brand: "ILIA",             nameEs: "Sérum con Color Super Serum", nameEn: "Super Serum Skin Tint",         priceMXN: 1100, priceUSD: 55,  priceCAD: 75,  isNew: true },
  { id: "4",  slug: "shineon-lip-jelly",             image: "/hero/makeup-17.jpg", brand: "Tower 28",         nameEs: "Brillo ShineOn Lip Jelly",   nameEn: "ShineOn Lip Jelly",             priceMXN: 480,  priceUSD: 24,  priceCAD: 33,  isNew: true },
  { id: "5",  slug: "bionic-blush",                  image: "/hero/makeup-16.jpg", brand: "Milk Makeup",      nameEs: "Blush Cream Bionic",         nameEn: "Bionic Blush",                  priceMXN: 720,  priceUSD: 36,  priceCAD: 49,  isNew: true },
  { id: "6",  slug: "luxury-eye-palette",            image: "/hero/makeup-15.jpg", brand: "Charlotte Tilbury",nameEs: "Paleta Luxury Eye",          nameEn: "Luxury Eye Palette",            priceMXN: 2100, priceUSD: 106, priceCAD: 144, isNew: true },
  { id: "7",  slug: "perfect-strokes-concealer",     image: "/hero/makeup-14.jpg", brand: "Rare Beauty",      nameEs: "Corrector Perfect Strokes",  nameEn: "Perfect Strokes Concealer",     priceMXN: 790,  priceUSD: 40,  priceCAD: 54,  isNew: true },
  { id: "8",  slug: "trophy-wife-highlighter",       image: "/hero/makeup-13.jpg", brand: "Fenty Beauty",     nameEs: "Highlighter Trophy Wife",    nameEn: "Trophy Wife Highlighter",       priceMXN: 680,  priceUSD: 34,  priceCAD: 46,  isNew: true },
  { id: "9",  slug: "rouge-dior-lipstick",           image: "/hero/makeup-12.jpg", brand: "Dior Beauty",      nameEs: "Labial Rouge Dior",          nameEn: "Rouge Dior Lipstick",           priceMXN: 1350, priceUSD: 68,  priceCAD: 92,  isNew: true },
  { id: "10", slug: "lip-gloss-tom-ford",            image: "/hero/makeup-11.jpg", brand: "Tom Ford Beauty",  nameEs: "Gloss de Labios",            nameEn: "Lip Gloss",                     priceMXN: 1480, priceUSD: 74,  priceCAD: 101, isNew: true },
  { id: "11", slug: "loulou-lipstick",               image: "/hero/makeup-10.jpg", brand: "YSL Beauty",       nameEs: "Labial Loulou",              nameEn: "Loulou Lipstick",               priceMXN: 980,  priceUSD: 49,  priceCAD: 67,  isNew: true },
  { id: "12", slug: "monsieur-big-mascara",          image: "/hero/makeup-9.jpg",  brand: "Lancôme",          nameEs: "Máscara Monsieur Big",       nameEn: "Monsieur Big Mascara",          priceMXN: 890,  priceUSD: 45,  priceCAD: 61,  isNew: true },
];

const currencySymbol = { MXN: "$", USD: "$", CAD: "CA$" };

interface Props {
  products?: StorefrontProduct[];
}

export function NewArrivals({ products: qdProducts = [] }: Props) {
  const { language, currency } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumbLeft, setThumbLeft] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(20);

  const products = qdProducts.length > 0 ? qdProducts : placeholders;

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

  const getPrice = (p: StorefrontProduct) => {
    const val = currency === "MXN" ? p.priceMXN : currency === "USD" ? p.priceUSD : p.priceCAD;
    return val.toLocaleString();
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
          <a href="/categories" className="text-sm text-white/40 hover:text-white/70 transition-colors md:ml-2">
            {language === "es" ? "Ver todo →" : "View all →"}
          </a>
        </div>
      </div>

      <div ref={scrollRef} onScroll={onScroll} className="w-full overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex gap-4 pl-4 sm:pl-20 md:pl-32 pr-4 sm:pr-20 md:pr-32 w-max">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="group cursor-pointer flex-none w-52 no-underline">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3 bg-stone-900">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={language === "es" ? product.nameEs : product.nameEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <span className="absolute top-2 left-2 text-[10px] uppercase tracking-widest bg-white text-stone-900 px-2 py-0.5 font-medium rounded-full">
                  {language === "es" ? "Nuevo" : "New"}
                </span>
                <HugeiconsIcon icon={FavouriteIcon} size={20} strokeWidth={1.5} className="absolute top-2.5 right-2.5 text-black hover:text-black/60 transition-colors cursor-pointer drop-shadow-md" />
              </div>
              <p className="text-xs text-white/40 mb-0.5">{product.brand}</p>
              <p className="text-sm text-white leading-snug min-h-[2.75rem]">
                {language === "es" ? product.nameEs : product.nameEn}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/70">
                  {currencySymbol[currency]}{getPrice(product)}
                  {currency === "MXN" && " MXN"}
                </p>
                <HugeiconsIcon icon={ShoppingBasket02Icon} size={18} strokeWidth={1.5} className="text-white/60 hover:text-white transition-colors cursor-pointer" />
              </div>
            </Link>
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
