"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { motion } from "framer-motion";

const MILESTONES = [
  {
    year: "2023",
    titleEn: "Youth dialogues begin",
    titleBn: "যুব সংলাপের সূচনা",
    textEn: "Students and young educators across Bangladesh start convening informal dialogues on education reform.",
    textBn: "শিক্ষা সংস্কার নিয়ে সারা বাংলাদেশে শিক্ষার্থী ও তরুণ শিক্ষকদের অনানুষ্ঠানিক সংলাপ শুরু।",
  },
  {
    year: "2024",
    titleEn: "Policy network takes shape",
    titleBn: "নীতি নেটওয়ার্ক গঠন",
    textEn: "Research circles, campus clubs and civil-society partners join a shared platform for education rights.",
    textBn: "গবেষণা চক্র, ক্যাম্পাস ক্লাব ও নাগরিক সমাজের অংশীদাররা শিক্ষা অধিকারের অভিন্ন প্ল্যাটফর্মে যুক্ত হয়।",
  },
  {
    year: "2025",
    titleEn: "National convenings",
    titleBn: "জাতীয় সম্মেলন",
    textEn: "The Educator Leadership Summit and the landmark textbook-reform roundtable bring SEJ's demands to national media.",
    textBn: "এডুকেটর লিডারশিপ সামিট ও ঐতিহাসিক পাঠ্যপুস্তক-সংস্কার গোলটেবিল SEJ-এর দাবি জাতীয় গণমাধ্যমে তুলে ধরে।",
  },
  {
    year: "2026",
    titleEn: "Institutional growth",
    titleBn: "প্রাতিষ্ঠানিক অগ্রগতি",
    textEn: "SEJ scales research, community programs and policy dialogues toward a nationwide education rights movement.",
    textBn: "SEJ গবেষণা, কমিউনিটি কর্মসূচি ও নীতি সংলাপ দেশব্যাপী শিক্ষা অধিকার আন্দোলনে রূপ দিচ্ছে।",
  },
];

export default function OurStory() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "ourStory") as string}
        subtitle={t(language, "backgroundRationale") as string}
      />

      <section className="py-20 section-xl">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t(language, "backgroundRationale")}
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t(language, "educationIsRight")}
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t(language, "sejEmergence")}
            </p>

            <div className="bg-teal-50 dark:bg-teal-900/20 p-8 rounded-xl my-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t(language, "whySEJWasFormed")}
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">
                    •
                  </span>
                  <span>{t(language, "addressPolicyGaps")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">
                    •
                  </span>
                  <span>{t(language, "multiStakeholder")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">
                    •
                  </span>
                  <span>{t(language, "youthParticipation")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">
                    •
                  </span>
                  <span>{t(language, "advocateEducation")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">
                    •
                  </span>
                  <span>{t(language, "bridgeGap")}</span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-12">
              {t(language, "connectionGlobal")}
            </h3>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t(language, "partOfBroader")}
            </p>

            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>• UNESCO&apos;s Education 2030 Framework</li>
              <li>• UN Sustainable Development Goal 4 (Quality Education)</li>
              <li>• The Universal Declaration of Human Rights</li>
              <li>• The Convention on the Rights of the Child</li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl my-8">
              <blockquote className="text-xl italic text-gray-800 dark:text-gray-200">
                &quot;Education is not only a promise but a practiced right. By
                bringing together research, policy, and public participation
                under one inclusive platform, SEJ aims to redefine education
                governance as a collaborative social contract between the state
                and its citizens.&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-soft py-20 md:py-24 overflow-x-clip" aria-label="Our journey">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "আমাদের যাত্রা" : "Our Journey"}
            title={language === "bn" ? "মাইলফলক" : "Milestones"}
          />
          <ol className="relative border-l-2 border-[#0e7c6b]/25 dark:border-teal-800 ml-3 md:ml-6 space-y-10">
            {MILESTONES.map((m, i) => (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="relative pl-10"
              >
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#0e7c6b] ring-4 ring-teal-100 dark:ring-teal-900/40" aria-hidden="true" />
                <div className="institution-card p-6 md:p-7">
                  <span className="font-display text-lg font-semibold text-[#b98a1f]" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                    {m.year}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-[#0a2a4a] dark:text-white mt-1 mb-2" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                    {language === "bn" ? m.titleBn : m.titleEn}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {language === "bn" ? m.textBn : m.textEn}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        titleEn="Be part of the next milestone"
        titleBn="পরবর্তী মাইলফলকের অংশ হোন"
        descEn="Whether you research, teach, study or advocate — there is a place for you in this movement."
        descBn="আপনি গবেষক, শিক্ষক, শিক্ষার্থী বা অ্যাডভোকেট — এই আন্দোলনে আপনার জায়গা আছে।"
      />
      <Footer />
    </div>
  );
}
