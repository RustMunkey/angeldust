"use client";

import { createContext, useContext, useState } from "react";

interface CartContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const itemCount = 0; // will be wired to real items when Stripe/cart logic is added

  return (
    <CartContext.Provider value={{ open, setOpen, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
