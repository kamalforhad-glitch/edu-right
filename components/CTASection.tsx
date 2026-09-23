"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";

interface CTASectionProps {
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  primaryHref?: string;
  primaryEn?: string;
  primaryBn?: string;
  secondaryHref?: string;
  secondaryEn?: string;
  secondaryBn?: string;
}

export function CTASection({
  titleEn,
  titleBn,
  descEn,
  descBn,
  primaryHref = "/get-involved",
  primaryEn = "Join SEJ",
  primaryBn = "SEJ-এ যোগ দিন",
  secondaryHref = "/contact",
  secondaryEn = "Collaborate With Us",
  secondaryBn = "আমাদের সাথে সহযোগিতা করুন",
}: CTASectionProps) {
  const { language } = useLanguage();

  return (
    <section className="section-navy relative overflow-hidden" aria-label="Call to action">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0e7c6b] via-[#b98a1f] to-[#0e7c6b]" aria-hidden="true" />
      <div className="absolute -left-24 top-0 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-0 w-96 h-96 bg-[#b98a1f]/15 rounded-full blur-3xl" aria-hidden="true" />
      <div className="relative max-w-4xl mx-auto px-6 py-20 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.22em] uppercase text-[#e8c96a] mb-5">
            <Handshake className="w-4 h-4" aria-hidden="true" />
            {language === "bn" ? "যোগ দিন" : "Get Involved"}
          </p>
          <h2
            className="font-display text-3xl md:text-5xl font-semibold text-white leading-tight mb-5"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            {language === "bn" ? titleBn : titleEn}
          </h2>
          <div className="gold-rule mx-auto mb-6" aria-hidden="true" />
          <p className="text-lg text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            {language === "bn" ? descBn : descEn}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0a2a4a] px-9 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow"
              >
                {language === "bn" ? primaryBn : primaryEn}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </motion.span>
            <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 px-9 py-4 rounded-xl font-bold text-lg transition-colors"
              >
                {language === "bn" ? secondaryBn : secondaryEn}
              </Link>
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
