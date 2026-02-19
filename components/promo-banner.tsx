"use client";

import Marquee from "react-fast-marquee";
import { useLanguage } from "@/components/language-provider";

const promos = {
  es: [
    "Envío gratis en compras mayores a $999 MXN",
    "Nuevas llegadas cada semana",
    "Devoluciones gratis en 30 días",
    "Pago seguro en todas tus compras",
    "Envíos a todo México",
    "Productos 100% originales",
    "Atención al cliente 24/7",
    "Compra ahora, paga después",
  ],
  en: [
    "Free shipping on orders over $999 MXN",
    "New arrivals every week",
    "Free returns within 30 days",
    "Secure payment on all orders",
    "Shipping across all of Mexico",
    "100% authentic products",
    "24/7 customer support",
    "Buy now, pay later",
  ],
};

export function PromoBanner() {
  const { language } = useLanguage();
  const items = promos[language];

  return (
    <div className="fixed top-0 inset-x-0 z-50 h-8 bg-rose-800 border-b border-t border-white/10 flex items-center overflow-hidden">
      <Marquee speed={35} gradient={false} pauseOnHover>
        {items.map((text, i) => (
          <span key={i} className="text-xs text-white flex items-center gap-20">
            {text}
            <span className="text-white/40">·</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
