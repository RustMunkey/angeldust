"use client";

import { TranslateIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLanguage } from "@/components/language-provider";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  const isEs = locale === "es-MX";

  return (
    <span
      className="flex items-center gap-1.5 cursor-pointer text-foreground text-sm font-medium"
      onClick={() => setLocale(isEs ? "en-US" : "es-MX")}
      aria-label="Toggle language"
    >
      <HugeiconsIcon icon={TranslateIcon} size={20} />
      {isEs ? "ES" : "EN"}
    </span>
  );
}
