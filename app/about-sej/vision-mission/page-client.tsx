"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { Target, Eye, Lightbulb, Shield, Users2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function VisionMission() {
  const { language } = useLanguage();
  const missionItems = t(language, "vmMissionItems") as unknown as string[];
  const goalTitles = t(language, "vmGoals") as unknown as string[];
  const goalDescs = t(language, "vmGoalDescs") as unknown as string[];
  const valueKeys = ["equity", "inclusiveness", "quality", "collaboration", "transparency"] as const;
  const valueDescKeys = ["equityDesc", "inclusivenessDesc", "qualityDesc", "collaborationDesc", "transparencyDesc"] as const;
  const valueIcons = [Shield, Users2, Target, Lightbulb, Eye];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "vmTitle") as string}
        subtitle={t(language, "vmSubtitle") as string}
        eyebrow={language === "bn" ? "নীতি" : "Principles"}
        breadcrumbs={[{ label: t(language, "about") as string }, { label: t(language, "visionMission") as string }]}
      />

      {/* Vision */}
      <section className="py-20 md:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              eyebrow={t(language, "vmVision") as string}
              title={t(language, "vmVision") as string}
              align="left"
            />
            <div className="institution-card p-8 md:p-10">
              <p className="font-display text-2xl md:text-[1.7rem] text-[#0a2a4a] dark:text-white leading-relaxed" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                {t(language, "vmVisionText") as string}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-soft py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              eyebrow={t(language, "vmMission") as string}
              title={t(language, "vmMission") as string}
              description={t(language, "vmMissionText") as string}
              align="left"
            />
            <div className="grid grid-cols-1 gap-4">
              {missionItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  className="flex items-start gap-4 p-5 md:p-6 bg-white dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-white/10"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#0a2a4a] text-[#e8c96a] font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed pt-1.5">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "মূল্যবোধ" : "Values"}
            title={t(language, "vmCoreValues") as string}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueKeys.map((key, idx) => {
              const Icon = valueIcons[idx];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="institution-card p-8"
                >
                  <Icon className="w-11 h-11 mb-4 text-[#0e7c6b] dark:text-teal-300" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-semibold text-[#0a2a4a] dark:text-white mb-2.5" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                    {t(language, key) as string}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {t(language, valueDescKeys[idx]) as string}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className="section-soft py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "কৌশল" : "Strategy"}
            title={t(language, "vmStrategicGoals") as string}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goalTitles.map((goal, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="institution-card p-8"
              >
                <h3 className="font-display text-2xl font-semibold text-[#0a2a4a] dark:text-white mb-3" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                  {goal}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {goalDescs[idx]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        titleEn="Share our vision for education"
        titleBn="শিক্ষার এই দৃষ্টিভঙ্গি ভাগ করে নিন"
        descEn="Help us make equitable, inclusive and quality education a reality for all."
        descBn="সবার জন্য ন্যায্য, অন্তর্ভুক্তিমূলক ও মানসম্মত শিক্ষা বাস্তবায়নে সহায়তা করুন।"
      />
      <Footer />
    </div>
  );
}
