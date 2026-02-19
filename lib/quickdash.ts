/**
 * QuickDash Storefront API client.
 * Used server-side (Server Components, Route Handlers).
 * Key lives in QUICKDASH_API_KEY — never exposed to the browser.
 */

const BASE_URL = process.env.NEXT_PUBLIC_STOREFRONT_URL ?? "https://app.quickdash.net";
const API_KEY  = process.env.QUICKDASH_API_KEY ?? "";

async function qd<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/storefront${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Storefront-Key": API_KEY,
      ...options.headers,
    },
    // Next.js cache: revalidate every 60s by default
    next: { revalidate: 60 },
    ...(options as object),
  });

  if (!res.ok) {
    throw new Error(`QuickDash ${options.method ?? "GET"} ${path} → ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface QDProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  price: string;
  compareAtPrice: string | null;
  salePrice: string | null;
  currentPrice: string;
  onSale: boolean;
  images: string[];
  thumbnail: string | null;
  isSubscribable: boolean;
  isFeatured: boolean;
  category: { id: string; name: string | null; slug: string | null } | null;
  tags: string[];
  createdAt: string;
}

export interface QDProductDetail extends QDProduct {
  weight: string | null;
  weightUnit: string | null;
  meta: { title: string | null; description: string | null };
  variants: Array<{
    id: string;
    name: string;
    sku: string;
    price: string | null;
    attributes: Record<string, string>;
  }>;
  stock: Array<{ variantId: string; quantity: number }> | null;
}

export interface QDCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  sortOrder: number | null;
  productCount?: number;
}

export interface QDPagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasMore: boolean;
}

// ─── Products ─────────────────────────────────────────────────────────────────

interface ListProductsParams {
  page?: number;
  limit?: number;
  category?: string;   // category slug
  search?: string;
  featured?: boolean;
  sort?: "name" | "price" | "createdAt";
  order?: "asc" | "desc";
}

export async function listProducts(params: ListProductsParams = {}): Promise<{
  products: QDProduct[];
  pagination: QDPagination;
}> {
  const q = new URLSearchParams();
  if (params.page)     q.set("page",     String(params.page));
  if (params.limit)    q.set("limit",    String(params.limit));
  if (params.category) q.set("category", params.category);
  if (params.search)   q.set("search",   params.search);
  if (params.featured) q.set("featured", "true");
  if (params.sort)     q.set("sort",     params.sort);
  if (params.order)    q.set("order",    params.order);

  const qs = q.toString();
  return qd(`/products${qs ? `?${qs}` : ""}`);
}

export async function getProduct(slug: string): Promise<{ product: QDProductDetail }> {
  return qd(`/products/${slug}`);
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function listCategories(opts?: { withCount?: boolean }): Promise<{
  categories: QDCategory[];
}> {
  const q = opts?.withCount ? "?count=true" : "";
  return qd(`/categories${q}`);
}

// ─── Discounts ────────────────────────────────────────────────────────────────

export async function validateDiscount(code: string, subtotal?: number): Promise<{
  valid: boolean;
  discount?: {
    code: string;
    type: "percentage" | "fixed";
    value: number;
    discountAmount: number;
    name: string;
  };
}> {
  return qd("/discounts/validate", {
    method: "POST",
    body: JSON.stringify({ code, subtotal }),
  });
}

// ─── Shipping ─────────────────────────────────────────────────────────────────

export async function getShippingRates(params: {
  country: string;
  state?: string;
  weight?: number;
  subtotal?: number;
}): Promise<{
  rates: Array<{
    id: string;
    name: string;
    carrier: string;
    price: number;
    estimatedDays: string | null;
    isFree: boolean;
  }>;
  freeShippingThreshold: number | null;
  freeShippingApplied: boolean;
}> {
  // The actual route uses POST (the SDK incorrectly uses GET)
  return qd("/shipping/rates", {
    method: "POST",
    body: JSON.stringify(params),
    next: { revalidate: 0 }, // don't cache shipping rates
  } as RequestInit);
}

// ─── Site ─────────────────────────────────────────────────────────────────────

export async function getSite() {
  return qd<{ site: Record<string, unknown> }>("/site", {
    next: { revalidate: 3600 }, // site config changes rarely
  });
}
