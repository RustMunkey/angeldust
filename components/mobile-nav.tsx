"use client";

import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useLanguage } from "@/components/language-provider";
import { ArrowDown01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { RegionFlags } from "@/components/region-flags";

const links = [
  { key: "new", es: "Nuevo", en: "New", items: ["Best Sellers", "Just Arrived", "Online Exclusives", "Limited Editions"] },
  { key: "makeup", es: "Maquillaje", en: "Makeup", items: ["Foundation", "Concealer", "Blush", "Bronzer", "Mascara", "Eyeshadow", "Lipstick", "Lip Gloss"] },
  { key: "skincare", es: "Cuidado de piel", en: "Skincare", items: ["Cleansers", "Toners", "Serums", "Moisturizers", "SPF", "Masks"] },
  { key: "fragrance", es: "Fragancias", en: "Fragrance", items: ["For Her", "For Him", "Fragrance Sets", "Body Mist"] },
  { key: "hair", es: "Cabello", en: "Hair", items: ["Shampoo", "Conditioner", "Treatments", "Styling"] },
  { key: "tools", es: "Herramientas", en: "Tools & Brushes", items: ["Brush Sets", "Sponges", "Accessories"] },
  { key: "bath", es: "Baño y cuerpo", en: "Bath & Body", items: ["Body Wash", "Lotions", "Scrubs", "Body Oils"] },
  { key: "mini", es: "Mini size", en: "Mini Size" },
  { key: "brands", es: "Marcas", en: "Brands", items: ["Charlotte Tilbury", "NARS", "MAC", "Fenty Beauty", "Rare Beauty", "Benefit", "Urban Decay"] },
  { key: "gifts", es: "Regalos y sets", en: "Gifts & Value Sets", items: ["Makeup Sets", "Skincare Sets", "Fragrance Sets"] },
  { key: "giftcards", es: "Tarjetas de regalo", en: "Gift Cards" },
  { key: "sale", es: "Ofertas", en: "Sale & Offers", items: ["Up to 50% off", "Buy 1 Get 1", "Clearance"] },
];

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (key: string) => setExpanded((prev) => (prev === key ? null : key));

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-screen sm:w-[360px] bg-black p-0 flex flex-col overflow-y-auto">
        <div className="px-6 pt-[18px] pb-5 flex flex-col gap-4">
          <div className="flex items-center justify-between h-7">
            <RegionFlags />
            <span className="font-serif text-2xl text-white tracking-wide">ANGELDUST</span>
            <div className="w-7" />
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 w-full">
            <HugeiconsIcon icon={Search01Icon} size={14} className="text-white/40 shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none w-full"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {links.map((link) => (
            <div key={link.key}>
              {link.items ? (
                <>
                  <button
                    type="button"
                    onClick={() => toggle(link.key)}
                    className="w-full flex items-center justify-between px-6 py-3.5 text-white text-sm cursor-pointer hover:text-white/60 transition-colors"
                  >
                    <span>{language === "es" ? link.es : link.en}</span>
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={16}
                      className={`text-white/40 transition-transform duration-200 ${expanded === link.key ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expanded === link.key && (
                    <div className="bg-white/5 px-6 py-2 flex flex-col gap-3">
                      {link.items.map((item) => (
                        <a key={item} href="#" className="text-sm text-white/50 hover:text-white transition-colors py-1">
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href="#"
                  className="flex items-center px-6 py-3.5 text-white text-sm hover:text-white/60 transition-colors"
                >
                  {language === "es" ? link.es : link.en}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Account — pinned bottom */}
        <div className="px-6 py-4 border-t border-white/10">
          <a href="#" className="w-full flex items-center justify-center py-4 bg-rose-800 text-white text-sm font-medium tracking-wide rounded-full hover:bg-rose-700 transition-colors">
            Sign In
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
