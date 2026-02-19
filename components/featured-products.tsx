"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft01Icon, ArrowRight01Icon, FavouriteIcon, ShoppingBasket02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLanguage } from "@/components/language-provider";
import type { StorefrontProduct } from "@/lib/products";

const placeholders: StorefrontProduct[] = [
  { id: "1",  slug: "matte-revolution-lipstick",        image: "/hero/makeup-1.jpg",  brand: "Charlotte Tilbury", nameEs: "Barra de labios Matte Revolution",    nameEn: "Matte Revolution Lipstick",          priceMXN: 890,  priceUSD: 45, priceCAD: 61 },
  { id: "2",  slug: "natural-radiant-foundation",       image: "/hero/makeup-2.jpg",  brand: "NARS",              nameEs: "Base Natural Radiant Longwear",        nameEn: "Natural Radiant Longwear Foundation", priceMXN: 1250, priceUSD: 63, priceCAD: 86 },
  { id: "3",  slug: "soft-pinch-liquid-blush",          image: "/hero/makeup-3.jpg",  brand: "Rare Beauty",       nameEs: "Rubor Soft Pinch",                    nameEn: "Soft Pinch Liquid Blush",            priceMXN: 720,  priceUSD: 36, priceCAD: 49 },
  { id: "4",  slug: "pro-filtr-concealer",              image: "/hero/makeup-4.jpg",  brand: "Fenty Beauty",      nameEs: "Corrector Pro Filt'r",                nameEn: "Pro Filt'r Concealer",               priceMXN: 680,  priceUSD: 34, priceCAD: 46 },
  { id: "5",  slug: "studio-fix-powder",                image: "/hero/makeup-5.jpg",  brand: "MAC",               nameEs: "Polvo Studio Fix",                    nameEn: "Studio Fix Powder",                  priceMXN: 780,  priceUSD: 39, priceCAD: 53 },
  { id: "6",  slug: "naked-midnight-palette",           image: "/hero/makeup-6.jpg",  brand: "Urban Decay",       nameEs: "Paleta Naked Midnight",               nameEn: "Naked Midnight Palette",             priceMXN: 1890, priceUSD: 95, priceCAD: 129 },
  { id: "7",  slug: "theyre-real-mascara",              image: "/hero/makeup_7.jpg",  brand: "Benefit",           nameEs: "Máscara They're Real",                nameEn: "They're Real Mascara",               priceMXN: 650,  priceUSD: 33, priceCAD: 44 },
  { id: "8",  slug: "better-than-sex-foundation",       image: "/hero/makeup-8.jpg",  brand: "Too Faced",         nameEs: "Mejor Sexo Base",                     nameEn: "Better Than Sex Foundation",         priceMXN: 1100, priceUSD: 55, priceCAD: 75 },
  { id: "9",  slug: "35o-eyeshadow-palette",            image: "/hero/makeup-9.jpg",  brand: "Morphe",            nameEs: "Paleta de ojos 35O",                  nameEn: "35O Eyeshadow Palette",              priceMXN: 950,  priceUSD: 48, priceCAD: 65 },
  { id: "10", slug: "soft-matte-lip-cream",             image: "/hero/makeup-10.jpg", brand: "NYX",               nameEs: "Labial Soft Matte Lip Cream",         nameEn: "Soft Matte Lip Cream",               priceMXN: 290,  priceUSD: 15, priceCAD: 20 },
  { id: "11", slug: "hollywood-glow-highlighter",       image: "/hero/makeup-11.jpg", brand: "Charlotte Tilbury", nameEs: "Iluminador Hollywood Glow",           nameEn: "Hollywood Glow Highlighter",         priceMXN: 1350, priceUSD: 68, priceCAD: 92 },
  { id: "12", slug: "eyeliner-stylo",                   image: "/hero/makeup-12.jpg", brand: "NARS",              nameEs: "Delineador Eyeliner Stylo",           nameEn: "Eyeliner Stylo",                     priceMXN: 580,  priceUSD: 29, priceCAD: 39 },
  { id: "13", slug: "gloss-bomb-lip-gloss",             image: "/hero/makeup-13.jpg", brand: "Fenty Beauty",      nameEs: "Brillo de labios Gloss Bomb",         nameEn: "Gloss Bomb Lip Gloss",               priceMXN: 490,  priceUSD: 25, priceCAD: 34 },
  { id: "14", slug: "liquid-touch-foundation",          image: "/hero/makeup-14.jpg", brand: "Rare Beauty",       nameEs: "Base Liquid Touch",                   nameEn: "Liquid Touch Foundation",            priceMXN: 980,  priceUSD: 49, priceCAD: 67 },
  { id: "15", slug: "ruby-woo-lipstick",                image: "/hero/makeup-15.jpg", brand: "MAC",               nameEs: "Labial Ruby Woo",                     nameEn: "Ruby Woo Lipstick",                  priceMXN: 520,  priceUSD: 26, priceCAD: 35 },
  { id: "16", slug: "all-nighter-setting-spray",        image: "/hero/makeup-16.jpg", brand: "Urban Decay",       nameEs: "Setting Spray All Nighter",           nameEn: "All Nighter Setting Spray",          priceMXN: 760,  priceUSD: 38, priceCAD: 52 },
  { id: "17", slug: "hoola-bronzer",                    image: "/hero/makeup-17.jpg", brand: "Benefit",           nameEs: "Bronzer Hoola",                       nameEn: "Hoola Bronzer",                      priceMXN: 840,  priceUSD: 42, priceCAD: 57 },
  { id: "18", slug: "natural-eyes-palette",             image: "/hero/makeup-18.jpg", brand: "Too Faced",         nameEs: "Paleta Natural Eyes",                 nameEn: "Natural Eyes Palette",               priceMXN: 1150, priceUSD: 58, priceCAD: 79 },
  { id: "19", slug: "vegan-brush-set",                  image: "/hero/makeup-19.jpg", brand: "Morphe",            nameEs: "Brocha Set Vegan",                    nameEn: "Vegan Brush Set",                    priceMXN: 1050, priceUSD: 53, priceCAD: 72 },
  { id: "20", slug: "studio-perfect-primer",            image: "/hero/makeup-20.jpg", brand: "NYX",               nameEs: "Primer Studio Perfect",               nameEn: "Studio Perfect Primer",              priceMXN: 340,  priceUSD: 17, priceCAD: 23 },
];

const currencySymbol = { MXN: "$", USD: "$", CAD: "CA$" };

interface Props {
  products?: StorefrontProduct[];
}

export function FeaturedProducts({ products: qdProducts = [] }: Props) {
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
          {language === "es" ? "Productos Destacados" : "Featured Products"}
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
