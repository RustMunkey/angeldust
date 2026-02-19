"use client";

import { TranslateIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLanguage } from "@/components/language-provider";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const isEs = language === "es";

  return (
    <span
      className="flex items-center gap-1.5 cursor-pointer text-foreground text-sm font-medium"
      onClick={() => setLanguage(isEs ? "en" : "es")}
      aria-label="Toggle language"
    >
      <HugeiconsIcon icon={TranslateIcon} size={20} />
      {isEs ? "ES" : "EN"}
    </span>
  );
}
