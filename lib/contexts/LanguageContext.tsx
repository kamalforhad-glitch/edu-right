"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Language } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start with the SSR default ("en") so server HTML and the first
  // client render match. The persisted preference is applied after
  // hydration (see effect below) to avoid hydration mismatches.
  const [language, setLanguageState] = useState<Language>("en");

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      // Keep <html lang> in sync for SEO, screen readers and browsers.
      document.documentElement.lang = lang;
    }
  }, []);

  // Post-hydration sync of the persisted preference (deferred via
  // requestAnimationFrame so it never triggers a cascading render).
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem("language") as Language | null;
        if (saved === "en" || saved === "bn") {
          setLanguageState(saved);
          document.documentElement.lang = saved;
        } else {
          document.documentElement.lang = "en";
        }
      } catch {
        /* ignore */
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
