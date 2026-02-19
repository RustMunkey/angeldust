import { useLanguage } from "@/components/language-provider";
import { translations } from "@/lib/translations";

export function useT() {
  const { language } = useLanguage();
  return translations[language];
}
