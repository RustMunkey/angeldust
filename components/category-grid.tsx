"use client";

import Image from "next/image";
import Link from "next/link";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLanguage } from "@/components/language-provider";
import type { StorefrontProduct } from "@/lib/products";

const currencySymbol: Record<string, string> = { MXN: "$", USD: "$", CAD: "CA$" };

interface Props {
  products: StorefrontProduct[];
}

export function CategoryGrid({ products }: Props) {
  const { language, currency } = useLanguage();

  if (products.length === 0) {
    return (
      <p className="text-white/30 text-sm py-20 text-center">
        {language === "es" ? "No hay productos en esta categoría." : "No products in this category yet."}
      </p>
    );
  }

  const getPrice = (p: StorefrontProduct) => {
    const val = currency === "MXN" ? p.priceMXN : currency === "USD" ? p.priceUSD : p.priceCAD;
    return val.toLocaleString();
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.slug}`} className="group no-underline">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3 bg-stone-900">
            {product.image ? (
              <Image
                src={product.image}
                alt={language === "es" ? product.nameEs : product.nameEn}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="absolute inset-0 bg-stone-900" />
            )}
            <button
              type="button"
              className="absolute top-2.5 right-2.5 p-0 bg-transparent border-none cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <HugeiconsIcon icon={FavouriteIcon} size={20} strokeWidth={1.5} className="text-white/60 hover:text-white transition-colors drop-shadow-md" />
            </button>
          </div>
          <p className="text-xs text-white/40 mb-0.5">{product.brand}</p>
          <p className="text-sm text-white leading-snug min-h-[2.75rem]">
            {language === "es" ? product.nameEs : product.nameEn}
          </p>
          <p className="text-sm text-white/70 mt-1">
            {currencySymbol[currency]}{getPrice(product)}
            {currency === "MXN" && " MXN"}
          </p>
        </Link>
      ))}
    </div>
  );
}
