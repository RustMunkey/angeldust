import type { QDProduct, QDCategory } from "./quickdash";

// Rough MXN conversion — replace with a real rates API when currency is fully built out
const MXN_TO_USD = 0.049;
const MXN_TO_CAD = 0.070;

export interface StorefrontProduct {
  id: string;
  slug: string;
  image: string | null;
  brand: string;       // category name from QuickDash, or manual brand on placeholder
  nameEs: string;
  nameEn: string;
  priceMXN: number;
  priceUSD: number;
  priceCAD: number;
  isNew?: boolean;
}

export interface StorefrontCategory {
  id: string;
  slug: string;
  image: string;
  nameEs: string;
  nameEn: string;
}

export function qdProductToStorefront(p: QDProduct, isNew = false): StorefrontProduct {
  const mxn = parseFloat(p.currentPrice ?? p.price);
  return {
    id: p.id,
    slug: p.slug,
    image: p.thumbnail ?? p.images[0] ?? null,
    brand: p.category?.name ?? "",
    nameEs: p.name,
    nameEn: p.name,
    priceMXN: mxn,
    priceUSD: Math.round(mxn * MXN_TO_USD),
    priceCAD: Math.round(mxn * MXN_TO_CAD),
    isNew,
  };
}

export function qdCategoryToStorefront(c: QDCategory): StorefrontCategory {
  return {
    id: c.id,
    slug: c.slug,
    image: c.image ?? "",
    nameEs: c.name,
    nameEn: c.name,
  };
}
