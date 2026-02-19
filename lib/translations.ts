export const translations = {
  es: {
    header: {
      search: "Buscar...",
    },
    preferences: {
      title: "Preferencias",
      language: "Idioma",
      currency: "Moneda",
      spanish: "Español",
      english: "English",
      continueShopping: "Continuar comprando",
    },
  },
  en: {
    header: {
      search: "Search...",
    },
    preferences: {
      title: "Preferences",
      language: "Language",
      currency: "Currency",
      spanish: "Español",
      english: "English",
      continueShopping: "Continue Shopping",
    },
  },
} as const;

export type Translations = typeof translations.en;
