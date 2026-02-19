"use client";

import { useLanguage } from "@/components/language-provider";

const promos = {
  es: [
    "Envío gratis en compras mayores a $999 MXN",
    "Nuevas llegadas cada semana",
    "Devoluciones gratis en 30 días",
  ],
  en: [
    "Free shipping on orders over $999 MXN",
    "New arrivals every week",
    "Free returns within 30 days",
  ],
};

export function PromoMarquee() {
  const { language } = useLanguage();
  const items = promos[language];

  return (
    <div className="overflow-hidden w-48 shrink-0">
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {[...items, ...items].map((text, i) => (
          <span key={i} className="text-xs text-muted-foreground shrink-0">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
