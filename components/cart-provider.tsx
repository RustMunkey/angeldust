"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface CartItem {
  cartId: string;       // productId + variantId (unique key)
  productId: string;
  slug: string;
  name: string;
  image: string;
  brand: string;
  priceMXN: number;
  quantity: number;
  variantId?: string;
  variantName?: string;
}

interface CartContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  items: CartItem[];
  itemCount: number;
  addItem: (item: Omit<CartItem, "cartId" | "quantity"> & { quantity?: number }) => void;
  removeItem: (cartId: string) => void;
  updateQty: (cartId: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "angeldust_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist on every change
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "cartId" | "quantity"> & { quantity?: number }) => {
    const cartId = `${item.productId}${item.variantId ? `-${item.variantId}` : ""}`;
    const qty = item.quantity ?? 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) => i.cartId === cartId ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { ...item, cartId, quantity: qty }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((cartId: string) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  }, []);

  const updateQty = useCallback((cartId: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.cartId !== cartId));
    } else {
      setItems((prev) => prev.map((i) => i.cartId === cartId ? { ...i, quantity: qty } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ open, setOpen, items, itemCount, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
