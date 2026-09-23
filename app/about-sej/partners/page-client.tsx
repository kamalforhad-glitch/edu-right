"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import Image from "next/image";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function Partners() {
  const { language } = useLanguage();
  const partners = {
    government: [
      "Directorate of Primary Education (DPE)",
      "Ministry of Education",
      "Bangladesh Bureau of Educational Information and Statistics (BANBEIS)",
    ],
    international: [
      "UNESCO Bangladesh",
      "UNICEF Bangladesh",
      "Save the Children",
      "ActionAid Bangladesh",
    ],
    academic: [
      "University of Dhaka - Institute of Education and Research",
      "BRAC University - Institute of Educational Development",
      "Independent University Bangladesh",
    ],
    civilSociety: [
      "Campaign for Popular Education (CAMPE)",
      "Bangladesh Youth Leadership Center (BYLC)",
      "Teach for Bangladesh",
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "partTitle") as string}
        subtitle={t(language, "partSubtitle") as string}
        eyebrow={language === "bn" ? "নেটওয়ার্ক" : "Network"}
        breadcrumbs={[{ label: t(language, "about") as string }, { label: t(language, "partners") as string }]}
      />

      <section className="py-20 md:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "সহযোগিতা" : "Collaboration"}
            title={t(language, "partTitle") as string}
            description={t(language, "partIntro") as string}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Government Partners */}
            <div className="institution-card p-8">
              <h3 className="font-display text-2xl font-semibold text-[#0a2a4a] dark:text-white mb-6" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                {t(language, "partGov") as string}
              </h3>
              <ul className="space-y-3">
                {partners.government.map((partner, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      •
                    </span>
                    {partner}
                  </li>
                ))}
              </ul>
            </div>

            {/* International Partners */}
            <div className="institution-card p-8">
              <h3 className="font-display text-2xl font-semibold text-[#0a2a4a] dark:text-white mb-6" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                {t(language, "partIntl") as string}
              </h3>
              <ul className="space-y-3">
                {partners.international.map((partner, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-teal-600 dark:text-teal-400 font-bold">
                      •
                    </span>
                    {partner}
                  </li>
                ))}
              </ul>
            </div>

            {/* Academic Partners */}
            <div className="institution-card p-8">
              <h3 className="font-display text-2xl font-semibold text-[#0a2a4a] dark:text-white mb-6" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                {t(language, "partAcademic") as string}
              </h3>
              <ul className="space-y-3">
                {partners.academic.map((partner, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-purple-600 dark:text-purple-400 font-bold">
                      •
                    </span>
                    {partner}
                  </li>
                ))}
              </ul>
            </div>

            {/* Civil Society */}
            <div className="institution-card p-8">
              <h3 className="font-display text-2xl font-semibold text-[#0a2a4a] dark:text-white mb-6" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                {t(language, "partCivil") as string}
              </h3>
              <ul className="space-y-3">
                {partners.civilSociety.map((partner, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      •
                    </span>
                    {partner}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Partner Logos Section */}
          <div className="mt-16">
            <h3 className="font-display text-2xl font-semibold text-center mb-8 text-[#0a2a4a] dark:text-white" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
              {t(language, "partFeatured") as string}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-stretch">
              <div className="institution-card p-6 flex items-center justify-center min-h-[9rem]">
                <div className="relative h-20 w-full">
                  <Image
                    src="/sej/webmier.jpg"
                    alt="Partner Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              {["UNESCO Bangladesh", "UNICEF Bangladesh", "CAMPE", "Teach for Bangladesh"].map((name) => (
                <div key={name} className="institution-card p-6 flex items-center justify-center min-h-[9rem] text-center">
                  <span className="font-display font-semibold text-slate-500 dark:text-slate-400" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership CTA */}
          <div className="mt-16 text-center section-navy p-12 rounded-[1.5rem] text-white relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0e7c6b] via-[#b98a1f] to-[#0e7c6b]" aria-hidden="true" />
            <h3 className="font-display text-3xl font-semibold mb-4" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>{t(language, "partBecome") as string}</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/80">
              {t(language, "partBecomeText") as string}
            </p>
            <a href="/contact" className="inline-block bg-white text-[#0a2a4a] px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
              {t(language, "partBecomeBtn") as string}
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
