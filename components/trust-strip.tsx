"use client";

import { useLanguage } from "@/components/language-provider";
import { CheckmarkCircle02Icon, LeafIcon, DeliveryBox01Icon, ShieldCheck, StarIcon, FlowerIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const badges = [
  {
    icon: CheckmarkCircle02Icon,
    en: "100% Authentic",
    es: "100% Originales",
  },
  {
    icon: FlowerIcon,
    en: "Cruelty-Free Options",
    es: "Opciones Cruelty-Free",
  },
  {
    icon: LeafIcon,
    en: "Vegan Options",
    es: "Opciones Veganas",
  },
  {
    icon: DeliveryBox01Icon,
    en: "Free Returns · 30 Days",
    es: "Devoluciones Gratis · 30 Días",
  },
  {
    icon: ShieldCheck,
    en: "Secure Payment",
    es: "Pago Seguro",
  },
  {
    icon: StarIcon,
    en: "Ships Across Mexico",
    es: "Envíos a Todo México",
  },
];

export function TrustStrip() {
  const { language } = useLanguage();

  return (
    <div className="border-y border-white/10 py-10">
      {/* Mobile: horizontal scroll */}
      <div className="flex lg:hidden overflow-x-auto no-scrollbar gap-8 px-4">
        {badges.map((badge) => (
          <div key={badge.en} className="flex items-center gap-2.5 shrink-0">
            <HugeiconsIcon icon={badge.icon} size={18} className="text-white/50 shrink-0" />
            <span className="text-xs text-white/50 whitespace-nowrap">
              {language === "es" ? badge.es : badge.en}
            </span>
          </div>
        ))}
      </div>
      {/* Desktop: grid */}
      <div className="hidden lg:grid grid-cols-6 gap-8 px-20 md:px-32">
        {badges.map((badge) => (
          <div key={badge.en} className="flex flex-col items-center gap-3 text-center">
            <HugeiconsIcon icon={badge.icon} size={22} className="text-white/50" />
            <span className="text-xs text-white/50 leading-snug">
              {language === "es" ? badge.es : badge.en}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
