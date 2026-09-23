"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function Objectives() {
  const { language } = useLanguage();
  const mainItems = t(language, "objMainItems") as unknown as string[];
  const ancillaryItems = t(language, "objAncillaryItems") as unknown as string[];

  const splitTitle = (entry: string) => {
    const idx = entry.indexOf(":");
    if (idx === -1) return { title: entry, description: "" };
    return { title: entry.slice(0, idx), description: entry.slice(idx + 1).trim() };
  };

  const mainObjectives = ["a", "b", "c"].map((id, i) => ({
    id,
    ...splitTitle(mainItems[i] || ""),
  }));

  const ancillaryObjectives = ["d", "e", "f", "g", "h", "i", "j"].map((id, i) => ({
    id,
    ...splitTitle(ancillaryItems[i] || ""),
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "objTitle") as string}
        subtitle={t(language, "objSubtitle") as string}
        eyebrow={language === "bn" ? "লক্ষ্য" : "Mandate"}
        breadcrumbs={[{ label: t(language, "about") as string }, { label: t(language, "objTitle") as string }]}
      />

      {/* Main Objectives */}
      <section className="py-20 md:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              eyebrow={language === "bn" ? "ম্যান্ডেট" : "Mandate"}
              title={t(language, "objMain") as string}
              align="left"
            />

            <div className="space-y-6">
              {mainObjectives.map((objective, i) => (
                <motion.div
                  key={objective.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="institution-card p-7 md:p-8"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0a2a4a] text-[#e8c96a] font-display font-bold text-lg shrink-0" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                      {objective.id}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-semibold text-[#0a2a4a] dark:text-white mb-2.5" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                        {objective.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        {objective.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ancillary Objectives */}
      <section className="section-soft py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <SectionHeading
              eyebrow={language === "bn" ? "পরিচালনা" : "Operations"}
              title={t(language, "objAncillary") as string}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ancillaryObjectives.map((objective, i) => (
                <motion.div
                  key={objective.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
                  className="institution-card p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 text-[#0e7c6b] dark:text-teal-300 font-bold shrink-0 text-sm border border-teal-100 dark:border-teal-800">
                      {objective.id}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#0a2a4a] dark:text-white mb-2">
                        {objective.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {objective.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="section-navy py-20 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0e7c6b] via-[#b98a1f] to-[#0e7c6b]" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Lightbulb className="w-14 h-14 mx-auto mb-6 text-[#e8c96a]" aria-hidden="true" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>{t(language, "objPurpose") as string}</h2>
          <div className="gold-rule mx-auto mb-6" aria-hidden="true" />
          <p className="text-xl leading-relaxed text-white/80">
            Through these comprehensive objectives, SEJ commits to being a
            catalyst for meaningful, evidence-based, and inclusive education
            reform in Bangladesh. We work collaboratively with all stakeholders
            to ensure that quality education becomes a reality for every
            citizen, aligned with both national values and global aspirations.
          </p>
        </div>
      </section>

      <CTASection
        titleEn="Support our objectives"
        titleBn="আমাদের লক্ষ্যকে সমর্থন করুন"
        descEn="Partner with SEJ to turn these objectives into measurable outcomes for learners."
        descBn="শিক্ষার্থীদের জন্য পরিমাপযোগ্য ফলাফলে এই লক্ষ্যগুলো রূপ দিতে SEJ-এর সাথে যুক্ত হোন।"
      />
      <Footer />
    </div>
  );
}
