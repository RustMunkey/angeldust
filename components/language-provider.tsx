"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type Language = "es" | "en";
export type Currency = "MXN" | "USD" | "CAD";

interface LanguageContextValue {
  language: Language;
  setLanguage: (l: Language) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");
  const [currency, setCurrencyState] = useState<Currency>("MXN");

  // Restore saved preferences after mount (avoids SSR hydration mismatch)
  useEffect(() => {
    const savedLang = localStorage.getItem("angeldust_language") as Language | null;
    const savedCurrency = localStorage.getItem("angeldust_currency") as Currency | null;
    if (savedLang) setLanguageState(savedLang);
    if (savedCurrency) setCurrencyState(savedCurrency);
  }, []);

  const setLanguage = (l: Language) => {
    setLanguageState(l);
    localStorage.setItem("angeldust_language", l);
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("angeldust_currency", c);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currency, setCurrency }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
