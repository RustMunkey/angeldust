"use client";

import { cn } from "@/lib/utils";
import { type Currency, type Language, useLanguage } from "@/components/language-provider";
import { useT } from "@/hooks/use-t";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const currencies: { code: Currency; flag: string; label: { es: string; en: string } }[] = [
  { code: "MXN", flag: "mx", label: { es: "Peso mexicano", en: "Mexican Peso" } },
  { code: "USD", flag: "us", label: { es: "Dólar estadounidense", en: "US Dollar" } },
  { code: "CAD", flag: "ca", label: { es: "Dólar canadiense", en: "Canadian Dollar" } },
];

const flagByCurrency: Record<Currency, string> = {
  MXN: "mx",
  USD: "us",
  CAD: "ca",
};

export function RegionFlags() {
  const { language, setLanguage, currency, setCurrency } = useLanguage();
  const t = useT();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="cursor-pointer"
          aria-label="Region & language preferences"
        >
          <span className={`fi fi-${flagByCurrency[currency]}`} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xs bg-black border border-white/10 ring-0 p-6 gap-6">
        <DialogHeader>
          <DialogTitle className="text-white font-serif text-xl font-normal">{t.preferences.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-xs text-white/40 uppercase tracking-widest">
              {t.preferences.language}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(["es", "en"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    "rounded-full border px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer",
                    language === lang
                      ? "bg-rose-800 text-white border-rose-800"
                      : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                  )}
                >
                  {lang === "es" ? t.preferences.spanish : t.preferences.english}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs text-white/40 uppercase tracking-widest">
              {t.preferences.currency}
            </p>
            <div className="flex flex-col gap-2">
              {currencies.map(({ code, flag, label }) => (
                <button
                  key={code}
                  onClick={() => setCurrency(code)}
                  className={cn(
                    "flex items-center gap-3 rounded-full border px-4 py-3 text-sm font-medium transition-colors cursor-pointer",
                    currency === code
                      ? "bg-rose-800 text-white border-rose-800"
                      : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                  )}
                >
                  <span className={`fi fi-${flag}`} />
                  <span>{code}</span>
                  <span className={cn(
                    "ml-auto text-xs",
                    currency === code ? "text-rose-200" : "text-white/30"
                  )}>
                    {label[language]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogClose asChild>
          <button className="w-full py-4 bg-rose-800 text-white text-sm font-medium tracking-wide rounded-full border-0 outline-none cursor-pointer hover:bg-rose-700 transition-colors">
              {t.preferences.continueShopping}
            </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
