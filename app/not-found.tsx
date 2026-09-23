"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, SearchX, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";

export default function NotFound() {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-gray-950 px-6 py-20">
      <div className="max-w-xl w-full text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <Image
            src="/SEJ_logo.png"
            alt="Society for Educational Justice Logo"
            fill
            className="object-contain"
          />
        </div>
        <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-[#0e7c6b] dark:text-teal-300 mb-4">
          <SearchX className="w-4 h-4" aria-hidden="true" />
          {bn ? "পৃষ্ঠা পাওয়া যায়নি" : "Page not found"}
        </p>
        <h1
          className="font-display font-semibold text-[#0a2a4a] dark:text-white leading-none mb-4"
          style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "clamp(4rem, 12vw, 7rem)" }}
        >
          404
        </h1>
        <div className="gold-rule mx-auto mb-6" aria-hidden="true" />
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
          {bn
            ? "দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা নেই বা সরিয়ে নেওয়া হয়েছে।"
            : "Sorry, the page you are looking for does not exist or has been moved."}
        </p>
        <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-10">
          {bn
            ? "সোসাইটি ফর এডুকেশনাল জাস্টিস — শিক্ষা অধিকার ও নীতি সংস্কারে কাজ করছে।"
            : "Society for Educational Justice — working for education rights and policy reform."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#0a2a4a] hover:bg-[#0e7c6b] text-white px-8 py-3.5 rounded-xl font-bold transition-colors"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            {bn ? "হোমে ফিরুন" : "Back to Home"}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-[#0e7c6b] px-8 py-3.5 rounded-xl font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            {bn ? "পেছনে যান" : "Go Back"}
          </button>
        </div>
      </div>
    </div>
  );
}
