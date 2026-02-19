"use client";

import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/components/cart-provider";
import { useLanguage } from "@/components/language-provider";

const MXN_TO_USD = 0.049;
const MXN_TO_CAD = 0.070;
const SYMBOL: Record<string, string> = { MXN: "$", USD: "$", CAD: "CA$" };

export function CartSidebar() {
  const { open, setOpen, items, itemCount, removeItem, updateQty } = useCart();
  const { language, currency } = useLanguage();

  const getPrice = (priceMXN: number) => {
    const val = currency === "USD" ? priceMXN * MXN_TO_USD : currency === "CAD" ? priceMXN * MXN_TO_CAD : priceMXN;
    return val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const subtotalMXN = items.reduce((sum, i) => sum + i.priceMXN * i.quantity, 0);
  const subtotal = getPrice(subtotalMXN);
  const sym = SYMBOL[currency] ?? "$";
  const suffix = currency === "MXN" ? " MXN" : "";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-screen sm:w-[460px] bg-black p-0 flex flex-col">
        <SheetHeader className="px-6 py-5 border-b border-white/10">
          <SheetTitle className="text-white font-serif text-xl font-normal">
            {language === "es"
              ? `${itemCount} ${itemCount === 1 ? "Artículo" : "Artículos"} en tu carrito`
              : `${itemCount} ${itemCount === 1 ? "Item" : "Items"} in Your Bag`}
          </SheetTitle>
        </SheetHeader>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-white/30 px-6">
              <p className="text-sm">{language === "es" ? "Tu carrito está vacío" : "Your bag is empty"}</p>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {items.map((item) => (
                <li key={item.cartId} className="flex gap-4 px-6 py-4">
                  {/* Image */}
                  <div className="relative flex-none w-16 h-20 rounded-md overflow-hidden bg-stone-900">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                    ) : (
                      <div className="absolute inset-0 bg-stone-800" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">{item.brand}</p>
                    <p className="text-sm text-white leading-snug">{item.name}</p>
                    {item.variantName && (
                      <p className="text-xs text-white/40 mt-0.5">{item.variantName}</p>
                    )}
                    <p className="text-sm text-white/70 mt-1">
                      {sym}{getPrice(item.priceMXN)}{suffix}
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-white/20 rounded-full overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQty(item.cartId, item.quantity - 1)}
                          className="px-3 py-1 text-white/60 hover:text-white text-sm transition-colors"
                        >
                          −
                        </button>
                        <span className="text-xs text-white w-6 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.cartId, item.quantity + 1)}
                          className="px-3 py-1 text-white/60 hover:text-white text-sm transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.cartId)}
                        className="text-xs text-white/30 hover:text-white/60 transition-colors"
                      >
                        {language === "es" ? "Eliminar" : "Remove"}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-white/10">
          {items.length > 0 && (
            <div className="flex justify-between text-sm text-white/60 mb-4">
              <span>{language === "es" ? "Subtotal" : "Subtotal"}</span>
              <span>{sym}{subtotal}{suffix}</span>
            </div>
          )}
          <button
            type="button"
            onClick={items.length === 0 ? () => setOpen(false) : undefined}
            disabled={items.length > 0 && false}
            className="w-full py-4 bg-rose-800 text-white text-sm font-medium tracking-wide rounded-full border-0 outline-none cursor-pointer hover:bg-rose-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {items.length === 0
              ? (language === "es" ? "Seguir comprando" : "Continue Shopping")
              : (language === "es" ? "Finalizar compra" : "Checkout")}
          </button>
          <p className="text-center text-xs text-white/20 mt-3">
            {language === "es" ? "Pago seguro con Stripe" : "Secure checkout with Stripe"}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
