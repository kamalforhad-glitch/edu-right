export type TranslationType = {
  [key: string]: {
    [key: string]: string | string[];
  };
};

export type TranslationKey =
  keyof typeof import("../translations").translations.en;
