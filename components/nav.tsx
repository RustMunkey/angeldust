"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

type Column = {
  title: { es: string; en: string };
  items: { es: string; en: string }[];
};

type NavLink = {
  key: string;
  es: string;
  en: string;
  images?: string[];
  columns?: Column[];
};

const links: NavLink[] = [
  {
    key: "new", es: "Nuevo", en: "New",
    images: ["/hero/makeup-1.jpg", "/hero/makeup-2.jpg"],
    columns: [
      { title: { es: "Destacados", en: "Featured" }, items: [
        { es: "Más vendidos", en: "Best Sellers" },
        { es: "Recién llegados", en: "Just Arrived" },
        { es: "Exclusivos en línea", en: "Online Exclusives" },
        { es: "Ediciones limitadas", en: "Limited Editions" },
      ]},
      { title: { es: "Categorías", en: "Categories" }, items: [
        { es: "Maquillaje nuevo", en: "New Makeup" },
        { es: "Skincare nuevo", en: "New Skincare" },
        { es: "Fragancias nuevas", en: "New Fragrance" },
        { es: "Herramientas nuevas", en: "New Tools" },
      ]},
    ],
  },
  {
    key: "makeup", es: "Maquillaje", en: "Makeup",
    images: ["/hero/makeup-11.jpg", "/hero/makeup-3.jpg"],
    columns: [
      { title: { es: "Cara", en: "Face" }, items: [
        { es: "Base", en: "Foundation" },
        { es: "Corrector", en: "Concealer" },
        { es: "Rubor", en: "Blush" },
        { es: "Bronzer", en: "Bronzer" },
        { es: "Iluminador", en: "Highlighter" },
        { es: "Primer", en: "Primer" },
      ]},
      { title: { es: "Ojos", en: "Eyes" }, items: [
        { es: "Máscaras", en: "Mascara" },
        { es: "Delineadores", en: "Eyeliner" },
        { es: "Sombras", en: "Eyeshadow" },
        { es: "Cejas", en: "Brows" },
        { es: "Paletas", en: "Palettes" },
      ]},
      { title: { es: "Labios", en: "Lips" }, items: [
        { es: "Labiales", en: "Lipstick" },
        { es: "Brillo de labios", en: "Lip Gloss" },
        { es: "Delineador labial", en: "Lip Liner" },
        { es: "Bálsamos", en: "Lip Balm" },
      ]},
    ],
  },
  {
    key: "skincare", es: "Cuidado de piel", en: "Skincare",
    images: ["/hero/makeup-13.jpg", "/hero/makeup-4.jpg"],
    columns: [
      { title: { es: "Cara", en: "Face" }, items: [
        { es: "Limpiadores", en: "Cleansers" },
        { es: "Tónicos", en: "Toners" },
        { es: "Serums", en: "Serums" },
        { es: "Hidratantes", en: "Moisturizers" },
        { es: "Protector solar", en: "SPF" },
        { es: "Mascarillas", en: "Masks" },
      ]},
      { title: { es: "Ojos & Labios", en: "Eyes & Lips" }, items: [
        { es: "Contorno de ojos", en: "Eye Cream" },
        { es: "Parches para ojos", en: "Eye Patches" },
        { es: "Tratamiento labial", en: "Lip Treatment" },
      ]},
      { title: { es: "Cuerpo", en: "Body" }, items: [
        { es: "Cremas corporales", en: "Body Lotion" },
        { es: "Exfoliantes", en: "Scrubs" },
        { es: "Aceites", en: "Oils" },
      ]},
    ],
  },
  {
    key: "fragrance", es: "Fragancias", en: "Fragrance",
    images: ["/hero/makeup-15.jpg"],
    columns: [
      { title: { es: "Para ella", en: "For Her" }, items: [
        { es: "Perfumes", en: "Perfume" },
        { es: "Agua de tocador", en: "Eau de Toilette" },
        { es: "Agua de colonia", en: "Eau de Cologne" },
      ]},
      { title: { es: "Para él", en: "For Him" }, items: [
        { es: "Perfumes", en: "Perfume" },
        { es: "Agua de tocador", en: "Eau de Toilette" },
        { es: "Agua de colonia", en: "Eau de Cologne" },
      ]},
      { title: { es: "Sets & más", en: "Sets & More" }, items: [
        { es: "Sets de fragancia", en: "Fragrance Sets" },
        { es: "Bruma corporal", en: "Body Mist" },
        { es: "Velas", en: "Candles" },
      ]},
    ],
  },
  {
    key: "hair", es: "Cabello", en: "Hair",
    images: ["/hero/makeup-16.jpg", "/hero/makeup-5.jpg"],
    columns: [
      { title: { es: "Lavado", en: "Wash" }, items: [
        { es: "Shampoos", en: "Shampoo" },
        { es: "Acondicionadores", en: "Conditioner" },
        { es: "Tratamientos", en: "Treatments" },
      ]},
      { title: { es: "Estilismo", en: "Styling" }, items: [
        { es: "Cremas", en: "Creams" },
        { es: "Sprays", en: "Sprays" },
        { es: "Aceites", en: "Oils" },
        { es: "Sérum", en: "Serum" },
      ]},
    ],
  },
  {
    key: "tools", es: "Herramientas", en: "Tools & Brushes",
    images: ["/hero/makeup-17.jpg"],
    columns: [
      { title: { es: "Brochas", en: "Brushes" }, items: [
        { es: "Sets de brochas", en: "Brush Sets" },
        { es: "Brochas para cara", en: "Face Brushes" },
        { es: "Brochas para ojos", en: "Eye Brushes" },
        { es: "Brochas para labios", en: "Lip Brushes" },
      ]},
      { title: { es: "Herramientas", en: "Tools" }, items: [
        { es: "Esponjas", en: "Sponges" },
        { es: "Rizadores", en: "Curlers" },
        { es: "Planchas", en: "Straighteners" },
        { es: "Accesorios", en: "Accessories" },
      ]},
    ],
  },
  {
    key: "bath", es: "Baño y cuerpo", en: "Bath & Body",
    images: ["/hero/makeup-18.jpg", "/hero/makeup-6.jpg"],
    columns: [
      { title: { es: "Baño", en: "Bath" }, items: [
        { es: "Geles de ducha", en: "Body Wash" },
        { es: "Sales de baño", en: "Bath Salts" },
        { es: "Bombas de baño", en: "Bath Bombs" },
      ]},
      { title: { es: "Cuerpo", en: "Body" }, items: [
        { es: "Lociones", en: "Lotions" },
        { es: "Exfoliantes", en: "Scrubs" },
        { es: "Aceites corporales", en: "Body Oils" },
        { es: "Desodorantes", en: "Deodorants" },
      ]},
    ],
  },
  { key: "mini", es: "Mini size", en: "Mini Size" },
  {
    key: "brands", es: "Marcas", en: "Brands",
    images: ["/hero/makeup-19.jpg", "/hero/makeup-8.jpg"],
    columns: [
      { title: { es: "Destacadas", en: "Featured" }, items: [
        { es: "Charlotte Tilbury", en: "Charlotte Tilbury" },
        { es: "NARS", en: "NARS" },
        { es: "MAC", en: "MAC" },
        { es: "Fenty Beauty", en: "Fenty Beauty" },
        { es: "Rare Beauty", en: "Rare Beauty" },
      ]},
      { title: { es: "Más populares", en: "Most Popular" }, items: [
        { es: "Benefit", en: "Benefit" },
        { es: "Urban Decay", en: "Urban Decay" },
        { es: "Too Faced", en: "Too Faced" },
        { es: "Morphe", en: "Morphe" },
        { es: "NYX", en: "NYX" },
      ]},
    ],
  },
  {
    key: "gifts", es: "Regalos y sets", en: "Gifts & Value Sets",
    images: ["/hero/makeup-20.jpg", "/hero/makeup-9.jpg"],
    columns: [
      { title: { es: "Por categoría", en: "By Category" }, items: [
        { es: "Sets de maquillaje", en: "Makeup Sets" },
        { es: "Sets de skincare", en: "Skincare Sets" },
        { es: "Sets de fragancia", en: "Fragrance Sets" },
        { es: "Sets de cabello", en: "Hair Sets" },
      ]},
      { title: { es: "Por precio", en: "By Price" }, items: [
        { es: "Menos de $500", en: "Under $500 MXN" },
        { es: "$500 – $1,000", en: "$500 – $1,000 MXN" },
        { es: "$1,000 – $2,000", en: "$1,000 – $2,000 MXN" },
        { es: "Más de $2,000", en: "Over $2,000 MXN" },
      ]},
    ],
  },
  { key: "giftcards", es: "Tarjetas de regalo", en: "Gift Cards" },
  {
    key: "sale", es: "Ofertas", en: "Sale & Offers",
    images: ["/hero/makeup-2.jpg", "/hero/makeup-10.jpg"],
    columns: [
      { title: { es: "Ofertas", en: "Offers" }, items: [
        { es: "Hasta 50% descuento", en: "Up to 50% off" },
        { es: "2x1", en: "Buy 1 Get 1" },
        { es: "Liquidación", en: "Clearance" },
      ]},
      { title: { es: "Por categoría", en: "By Category" }, items: [
        { es: "Maquillaje en oferta", en: "Makeup Sale" },
        { es: "Skincare en oferta", en: "Skincare Sale" },
        { es: "Fragancias en oferta", en: "Fragrance Sale" },
      ]},
    ],
  },
];

const contentVariants = {
  enter: (dir: number) => ({ x: dir === 0 ? 0 : dir * 60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir === 0 ? 0 : dir * -60, opacity: 0 }),
};

export function Nav() {
  const { language } = useLanguage();
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [prevKey, setPrevKey] = useState<string | null>(null);
  const [displayKey, setDisplayKey] = useState<string | null>(null);

  const handleEnter = (key: string | null) => {
    if (key === activeKey) return;
    setPrevKey(activeKey);
    setActiveKey(key);
    if (key && links.find((l) => l.key === key)?.columns) {
      setDisplayKey(key);
    }
  };

  const isOpen = !!activeKey && !!links.find((l) => l.key === activeKey)?.columns;
  const displayLink = links.find((l) => l.key === displayKey);

  const prevIndex = links.findIndex((l) => l.key === prevKey);
  const currIndex = links.findIndex((l) => l.key === activeKey);
  const prevHadColumns = !!links.find((l) => l.key === prevKey)?.columns;
  const direction = !prevKey || !prevHadColumns ? 0 : currIndex > prevIndex ? 1 : -1;

  return (
    <nav
      className="fixed top-[6.5rem] inset-x-0 z-40 border-y border-border/50 bg-background/80 backdrop-blur-md"
      onMouseLeave={() => handleEnter(null)}
    >
      <div className="flex items-center gap-6 md:justify-between md:gap-0 px-4 sm:px-20 md:px-32 h-9 overflow-x-auto scrollbar-none">
        {links.map((link) => (
          <a
            key={link.key}
            href="#"
            className="shrink-0 text-sm text-foreground hover:text-foreground/50 transition-colors whitespace-nowrap"
            onMouseEnter={() => handleEnter(link.columns ? link.key : null)}
          >
            {language === "es" ? link.es : link.en}
          </a>
        ))}
      </div>

      {/* Outer container: only handles the drop-down open/close animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 bg-stone-900 text-stone-100 border-b border-white/10 h-80 overflow-hidden"
          >
            {/* Inner: slides left/right when switching between nav items */}
            <AnimatePresence mode="sync" custom={direction} initial={false}>
              <motion.div
                key={displayKey}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute inset-0 flex items-center"
              >
                <div className="flex items-center gap-16 px-4 sm:px-20 md:px-32 w-full">
                  <div className="flex gap-16 flex-1">
                    {displayLink?.columns?.map((col) => (
                      <div key={col.title.en} className="flex flex-col gap-3">
                        <span className="text-xs font-semibold uppercase tracking-widest opacity-50">
                          {language === "es" ? col.title.es : col.title.en}
                        </span>
                        <div className="flex flex-col gap-2">
                          {col.items.map((item) => (
                            <a
                              key={item.en}
                              href="#"
                              className="text-sm hover:opacity-50 transition-opacity whitespace-nowrap"
                            >
                              {language === "es" ? item.es : item.en}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {displayLink?.images && (
                    <div className="flex gap-3 shrink-0">
                      {displayLink.images.map((src) => (
                        <div
                          key={src}
                          className="relative w-44 h-60 rounded-lg overflow-hidden"
                        >
                          <Image src={src} alt="" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
