import { getTranslation, Language, TranslationKey } from "@/lib/translations";

export const t = (
  language: Language,
  key: TranslationKey
): string | string[] => {
  return getTranslation(language, key);
};
