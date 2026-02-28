"use client";

import { useLanguage } from "@/lib/contexts/LanguageContext";
import { useTheme } from "@/lib/contexts/ThemeContext";

export function DebugPanel() {
  const { language } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-800 p-4 rounded-lg shadow-lg z-50 text-sm">
      <div className="font-bold mb-2">Debug Info:</div>
      <div>Theme: {theme}</div>
      <div>Language: {language}</div>
      <div>
        HTML Class:{" "}
        {typeof document !== "undefined"
          ? document.documentElement.className
          : "N/A"}
      </div>
    </div>
  );
}
