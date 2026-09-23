"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { Building2, Users, Shield, Network } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function Governance() {
  const { language } = useLanguage();
  const bodyEntries = t(language, "govBodies") as unknown as string[];
  const funcEntries = t(language, "govFunctions") as unknown as string[];

  const splitEntry = (entry: string) => {
    const idx = entry.indexOf(":");
    if (idx === -1) return { title: entry, description: "" };
    return { title: entry.slice(0, idx), description: entry.slice(idx + 1).trim() };
  };

  const bodies = [
    { icon: Users, initials: "PC", ...splitEntry(bodyEntries[0] || "") },
    { icon: Building2, initials: "SC", ...splitEntry(bodyEntries[1] || "") },
    { icon: Shield, initials: "AB", ...splitEntry(bodyEntries[2] || "") },
    { icon: Network, initials: "TC", ...splitEntry(bodyEntries[3] || "") },
  ];

  const functions = funcEntries.map((entry) => {
    const { title, description } = splitEntry(entry);
    return { title, items: description.split(";").map((s) => s.trim()).filter(Boolean) };
  });
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "govTitle") as string}
        subtitle={t(language, "govSubtitle") as string}
        eyebrow={language === "bn" ? "পরিচালনা" : "Governance"}
        breadcrumbs={[{ label: t(language, "about") as string }, { label: t(language, "governance") as string }]}
      />

      <section className="py-20 md:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "পরিচালনা" : "Governance"}
            title={t(language, "govOrgStructure") as string}
            description={t(language, "govSubtitle") as string}
          />

          {/* Organizational Flow */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="space-y-6">
              {bodies.map((level, idx) => (
                <motion.div
                  key={level.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  className="relative"
                >
                  <div className="institution-card p-6 md:p-7">
                    <div className="flex items-start gap-5">
                      <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0a2a4a] text-[#e8c96a] font-display font-bold text-xl shrink-0" style={{ fontFamily: "var(--font-display), Georgia, serif" }} aria-hidden="true">
                        {level.initials}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-[#0a2a4a] dark:text-white mb-2" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                          {level.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {level.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  {idx < 3 && (
                    <div className="w-0.5 h-6 bg-gradient-to-b from-[#0e7c6b] to-[#b98a1f] mx-auto" aria-hidden="true"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Core Functions */}
          <div className="section-soft rounded-[1.5rem] p-8 md:p-12">
            <SectionHeading
              eyebrow={language === "bn" ? "কার্যাবলী" : "Functions"}
              title={t(language, "govCoreFunctions") as string}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {functions.map((func, idx) => (
                <div
                  key={idx}
                  className="institution-card p-6 md:p-7"
                >
                  <h3 className="font-display text-xl font-semibold text-[#0a2a4a] dark:text-white mb-4" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                    {func.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {func.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-slate-600 dark:text-slate-400"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#b98a1f] shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        titleEn="Help shape education governance"
        titleBn="শিক্ষা পরিচালনায় ভূমিকা রাখুন"
        descEn="Join a transparent, participatory movement for education rights in Bangladesh."
        descBn="বাংলাদেশে শিক্ষা অধিকারের স্বচ্ছ, অংশগ্রহণমূলক আন্দোলনে যোগ দিন।"
      />
      <Footer />
    </div>
  );
}
