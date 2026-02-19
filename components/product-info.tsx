"use client";

import { useState, useMemo } from "react";
import { MinusSignIcon, PlusSignIcon, ShoppingBasket02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLanguage } from "@/components/language-provider";
import { useCart } from "@/components/cart-provider";
import type { QDProductDetail } from "@/lib/quickdash";

// Rough conversion — matches lib/products.ts
const MXN_TO_USD = 0.049;
const MXN_TO_CAD = 0.070;

const CURRENCY_SYMBOL: Record<string, string> = { MXN: "$", USD: "$", CAD: "CA$" };

function formatPrice(mxn: number, currency: string): string {
  const val =
    currency === "USD" ? mxn * MXN_TO_USD :
    currency === "CAD" ? mxn * MXN_TO_CAD :
    mxn;
  return val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface Props {
  product: QDProductDetail;
}

export function ProductInfo({ product }: Props) {
  const { language, currency } = useLanguage();
  const { addItem } = useCart();

  // ── Variant selection ──────────────────────────────────────────────────────
  // Collect all unique attribute keys and their possible values
  const attributeKeys = useMemo<string[]>(() => {
    const keys = new Set<string>();
    for (const v of product.variants) {
      for (const k of Object.keys(v.attributes)) keys.add(k);
    }
    return [...keys];
  }, [product.variants]);

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    if (product.variants.length === 0) return {};
    // Default to first variant's attributes
    return { ...product.variants[0].attributes };
  });

  // Find the variant that matches all selected attributes
  const activeVariant = useMemo(() => {
    if (product.variants.length === 0) return null;
    return product.variants.find((v) =>
      attributeKeys.every((k) => v.attributes[k] === selected[k])
    ) ?? null;
  }, [product.variants, attributeKeys, selected]);

  // Get available options for each key (considering other selections)
  const getOptionsForKey = (key: string): string[] => {
    const opts = new Set<string>();
    for (const v of product.variants) {
      // Only include if every OTHER selected attribute matches
      const otherKeysMatch = attributeKeys
        .filter((k) => k !== key)
        .every((k) => !selected[k] || v.attributes[k] === selected[k]);
      if (otherKeysMatch && v.attributes[key]) opts.add(v.attributes[key]);
    }
    return [...opts];
  };

  // ── Stock ──────────────────────────────────────────────────────────────────
  const stockQty = useMemo(() => {
    if (!product.stock || product.stock.length === 0) return null;
    if (activeVariant) {
      return product.stock.find((s) => s.variantId === activeVariant.id)?.quantity ?? 0;
    }
    // No variants — use first stock entry
    return product.stock[0]?.quantity ?? 0;
  }, [product.stock, activeVariant]);

  const inStock = stockQty === null || stockQty > 0;

  // ── Quantity ──────────────────────────────────────────────────────────────
  const [qty, setQty] = useState(1);
  const maxQty = stockQty ?? 99;
  const inc = () => setQty((q) => Math.min(q + 1, maxQty));
  const dec = () => setQty((q) => Math.max(q - 1, 1));

  // ── Prices ────────────────────────────────────────────────────────────────
  // Variant may have its own price override (in MXN too)
  const basePrice = parseFloat(
    (activeVariant?.price ?? product.currentPrice ?? product.price) || "0"
  );
  const comparePrice = product.compareAtPrice ? parseFloat(product.compareAtPrice) : null;
  const sym = CURRENCY_SYMBOL[currency] ?? "$";
  const suffix = currency === "MXN" ? " MXN" : "";

  // ── Add to Bag ────────────────────────────────────────────────────────────
  const handleAddToBag = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.thumbnail ?? product.images[0] ?? "",
      brand: product.category?.name ?? "",
      priceMXN: basePrice,
      quantity: qty,
      variantId: activeVariant?.id,
      variantName: activeVariant?.name,
    });
  };

  return (
    <div className="flex-1 flex flex-col gap-6">
      {/* Brand / category */}
      {product.category?.name && (
        <p className="text-xs text-white/40 tracking-widest uppercase">{product.category.name}</p>
      )}

      {/* Name */}
      <h1 className="font-serif text-3xl sm:text-4xl text-white leading-tight">{product.name}</h1>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-2xl text-white font-light">
          {sym}{formatPrice(basePrice, currency)}{suffix}
        </span>
        {comparePrice && comparePrice > basePrice && (
          <span className="text-base text-white/30 line-through">
            {sym}{formatPrice(comparePrice, currency)}{suffix}
          </span>
        )}
        {product.onSale && (
          <span className="text-xs bg-rose-800 text-white px-2 py-0.5 rounded uppercase tracking-wide">
            {language === "es" ? "Oferta" : "Sale"}
          </span>
        )}
      </div>

      {/* Short description */}
      {product.shortDescription && (
        <p className="text-sm text-white/60 leading-relaxed">{product.shortDescription}</p>
      )}

      {/* Variant pickers */}
      {attributeKeys.map((key) => {
        const options = getOptionsForKey(key);
        if (options.length === 0) return null;
        return (
          <div key={key}>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-2.5 capitalize">
              {key}
              {selected[key] && (
                <span className="text-white/60 normal-case ml-2">{selected[key]}</span>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {options.map((val) => {
                const isActive = selected[key] === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setSelected((prev) => ({ ...prev, [key]: val }))}
                    className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${
                      isActive
                        ? "border-white text-white bg-white/10"
                        : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Stock status */}
      {stockQty !== null && (
        <p className={`text-xs uppercase tracking-widest ${inStock ? "text-emerald-500" : "text-red-400"}`}>
          {inStock
            ? stockQty <= 5
              ? language === "es" ? `Solo ${stockQty} disponibles` : `Only ${stockQty} left`
              : language === "es" ? "En stock" : "In stock"
            : language === "es" ? "Agotado" : "Out of stock"}
        </p>
      )}

      {/* Quantity + Add to Bag */}
      <div className="flex items-center gap-3 mt-2">
        {/* Qty */}
        <div className="flex items-center border border-white/20 rounded-full overflow-hidden">
          <button
            type="button"
            onClick={dec}
            disabled={qty <= 1}
            className="px-3 py-2 text-white/60 hover:text-white disabled:opacity-30 transition-colors"
          >
            <HugeiconsIcon icon={MinusSignIcon} size={14} />
          </button>
          <span className="text-sm text-white w-8 text-center">{qty}</span>
          <button
            type="button"
            onClick={inc}
            disabled={!inStock || qty >= maxQty}
            className="px-3 py-2 text-white/60 hover:text-white disabled:opacity-30 transition-colors"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={14} />
          </button>
        </div>

        {/* Add to Bag */}
        <button
          type="button"
          onClick={handleAddToBag}
          disabled={!inStock}
          className="flex-1 flex items-center justify-center gap-2.5 bg-rose-800 hover:bg-rose-700 disabled:bg-white/10 disabled:text-white/30 text-white text-sm font-medium py-3 px-6 rounded-full transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <HugeiconsIcon icon={ShoppingBasket02Icon} size={16} strokeWidth={2} />
          {language === "es" ? "Agregar al carrito" : "Add to Bag"}
        </button>
      </div>

      {/* Full description */}
      {product.description && (
        <div className="border-t border-white/10 pt-6 mt-2">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-3">
            {language === "es" ? "Descripción" : "Description"}
          </p>
          <div
            className="text-sm text-white/60 leading-relaxed prose prose-invert prose-sm max-w-none"
            // QuickDash may return HTML descriptions
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}

      {/* Tags */}
      {product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span key={tag} className="text-xs text-white/30 border border-white/10 rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
