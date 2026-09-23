"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { language } = useLanguage();
  const bn = language === "bn";

  useEffect(() => {
    // Log for diagnostics only — never render error details to the UI.
    console.error("Route error:", error?.message);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-gray-950 px-6 py-20">
      <div className="max-w-xl w-full text-center">
        <span className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-6">
          <AlertTriangle className="w-10 h-10 text-[#b98a1f]" aria-hidden="true" />
        </span>
        <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#0e7c6b] dark:text-teal-300 mb-4">
          {bn ? "কিছু ভুল হয়েছে" : "Something went wrong"}
        </p>
        <h1
          className="font-display text-4xl md:text-5xl font-semibold text-[#0a2a4a] dark:text-white leading-tight mb-4"
          style={{ fontFamily: "var(--font-display), Georgia, serif" }}
        >
          {bn ? "পৃষ্ঠাটি লোড করা যায়নি" : "This page could not be loaded"}
        </h1>
        <div className="gold-rule mx-auto mb-6" aria-hidden="true" />
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
          {bn
            ? "অনুগ্রহ করে আবার চেষ্টা করুন। সমস্যা থাকলে আমাদের জানান।"
            : "Please try again. If the problem persists, let us know."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 bg-[#0a2a4a] hover:bg-[#0e7c6b] text-white px-8 py-3.5 rounded-xl font-bold transition-colors"
          >
            <RotateCcw className="w-5 h-5" aria-hidden="true" />
            {bn ? "আবার চেষ্টা করুন" : "Try Again"}
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-[#0e7c6b] px-8 py-3.5 rounded-xl font-bold transition-colors"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            {bn ? "হোমে ফিরুন" : "Back to Home"}
          </Link>
        </div>
      </div>
    </div>
  );
}
