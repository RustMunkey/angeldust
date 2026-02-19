"use client";

import { useLanguage } from "@/components/language-provider";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok, faPinterest } from "@fortawesome/free-brands-svg-icons";

const navigation = {
  shop: {
    title: { es: "Tienda", en: "Shop" },
    links: [
      { es: "Nuevo", en: "New Arrivals" },
      { es: "Maquillaje", en: "Makeup" },
      { es: "Cuidado de piel", en: "Skincare" },
      { es: "Fragancias", en: "Fragrance" },
      { es: "Cabello", en: "Hair" },
      { es: "Ofertas", en: "Sale" },
    ],
  },
  company: {
    title: { es: "Empresa", en: "Company" },
    links: [
      { es: "Nuestra historia", en: "Our Story" },
      { es: "Carreras", en: "Careers" },
      { es: "Prensa", en: "Press" },
      { es: "Sostenibilidad", en: "Sustainability" },
    ],
  },
  resources: {
    title: { es: "Recursos", en: "Resources" },
    links: [
      { es: "Preguntas frecuentes", en: "FAQ" },
      { es: "Envíos", en: "Shipping" },
      { es: "Devoluciones", en: "Returns" },
      { es: "Rastrear pedido", en: "Track Order" },
      { es: "Contacto", en: "Contact Us" },
    ],
  },
  policies: {
    title: { es: "Políticas", en: "Policies" },
    links: [
      { es: "Privacidad", en: "Privacy Policy" },
      { es: "Términos de servicio", en: "Terms of Service" },
      { es: "Cookies", en: "Cookies" },
      { es: "Accesibilidad", en: "Accessibility" },
    ],
  },
};

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="border-t border-white/10 px-4 sm:px-20 md:px-32 pt-16 pb-8">

      {/* Top row */}
      <div className="flex flex-col lg:flex-row gap-16 mb-16">

        {/* Brand */}
        <div className="flex-1">
          <span className="font-serif text-3xl text-white tracking-wide">ANGELDUST</span>
          <p className="text-white/40 text-sm leading-relaxed mt-4 max-w-xs">
            {language === "es"
              ? "Tu destino de belleza en México. Productos 100% originales de las mejores marcas del mundo."
              : "Your beauty destination in Mexico. 100% authentic products from the world's best brands."}
          </p>
          <div className="flex gap-5 mt-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faTiktok} className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faPinterest} className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Nav columns — desktop */}
        <div className="hidden sm:grid grid-cols-4 gap-10">
          {Object.values(navigation).map((col) => (
            <div key={col.title.en}>
              <p className="text-xs uppercase tracking-widest text-white/30 mb-4">
                {language === "es" ? col.title.es : col.title.en}
              </p>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <a key={link.en} href="#" className="text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap">
                    {language === "es" ? link.es : link.en}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Nav columns — mobile accordion */}
        <Accordion type="multiple" className="sm:hidden w-full -mt-6">
          {Object.values(navigation).map((col) => (
            <AccordionItem key={col.title.en} value={col.title.en} className="border-none">
              <AccordionTrigger className="text-white/60 text-sm uppercase tracking-widest py-4 hover:no-underline hover:text-white transition-colors">
                {language === "es" ? col.title.es : col.title.en}
              </AccordionTrigger>
              <AccordionContent className="[&_a]:no-underline">
                <div className="flex flex-col gap-3 pb-2">
                  {col.links.map((link) => (
                    <a key={link.en} href="#" className="text-sm text-white/40 hover:text-white transition-colors">
                      {language === "es" ? link.es : link.en}
                    </a>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-white/10">
        <p className="text-xs text-white/25 text-center sm:text-left">
          © 2026 AngelDust. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
