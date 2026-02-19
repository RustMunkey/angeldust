"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/components/cart-provider";
import { useLanguage } from "@/components/language-provider";

export function CartSidebar() {
  const { open, setOpen, itemCount } = useCart();
  const { language } = useLanguage();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-screen sm:w-[460px] bg-black p-0 flex flex-col"
      >
        <SheetHeader className="px-6 py-5">
          <SheetTitle className="text-white font-serif text-xl font-normal">
            {language === "es" ? `${itemCount} Artículos en tu carrito` : `${itemCount} Items in Your Bag`}
          </SheetTitle>
        </SheetHeader>

        {/* Cart items area */}
        <div className="flex-1" />

        {/* Footer — checkout button, reserved for Stripe */}
        <div className="px-6 py-6 border-t border-white/10">
          <div className="flex justify-between text-sm text-white/40 mb-4">
            <span>{language === "es" ? "Subtotal" : "Subtotal"}</span>
            <span>$0.00</span>
          </div>
          <button
            type="button"
            onClick={itemCount === 0 ? () => setOpen(false) : undefined}
            disabled={itemCount > 0}
            className="w-full py-4 bg-rose-800 text-white text-sm font-medium tracking-wide rounded-full border-0 outline-none cursor-pointer hover:bg-rose-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {itemCount === 0
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
