"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { RelatedPrograms } from "@/components/RelatedPrograms";
import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import Image from "next/image";
import {
  FileText,
  BarChart3,
  Users,
  BookOpen,
  Laptop,
  CloudRain,
  ExternalLink,
} from "lucide-react";

interface ResearchItem {
  id: string;
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  content: string;
  contentBn?: string;
  featuredImage?: string;
  tags?: string[];
  category?: string;
  externalLink?: string;
  isFeatured: boolean;
  createdAt: string;
}

export default function ResearchPolicyPage() {
  const { language } = useLanguage();
  const [items, setItems] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResearch() {
      try {
        const res = await fetch(
          "/api/content?type=research&published=true&limit=50",
        );
        const data = await res.json();
        setItems(data.contents || []);
      } catch (error) {
        console.error("Failed to fetch research:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchResearch();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "research") as string}
        subtitle={language === "bn" ? "শিক্ষা সংস্কার ও জবাবদিহিতায় প্রভাব রাখতে প্রমাণ-ভিত্তিক গবেষণা" : "Evidence-based research to influence education reform and accountability"}
        eyebrow={language === "bn" ? "জ্ঞান কেন্দ্র" : "Knowledge Hub"}
        breadcrumbs={[{ label: language === "bn" ? "কর্মসূচি" : "Programs" }, { label: t(language, "research") as string }]}
      />

      {/* Intro Section */}
      <section className="py-14 md:py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              {t(language, "rpIntro") as string}
            </p>
          </div>
        </div>
      </section>

      {/* Policy Briefs & Papers */}
      <section className="pb-20 md:pb-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "প্রকাশনা" : "Publications"}
            title={t(language, "rpBriefsTitle") as string}
          />

          {loading ?
            <div className="flex items-center justify-center py-12">
              <div className="w-10 h-10 border-3 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
            </div>
          : items.length === 0 ?
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 dark:text-gray-500">
                {t(language, "rpEmpty") as string}
              </p>
            </div>
          : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="institution-card overflow-hidden flex flex-col"
                >
                  {item.featuredImage ?
                    <div className="h-52 relative overflow-hidden">
                      <Image
                        src={item.featuredImage}
                        alt={language === "bn" && item.titleBn ? item.titleBn : item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <span className="absolute top-4 left-4 text-[11px] font-bold tracking-[0.14em] uppercase bg-[#0a2a4a]/85 text-white px-3 py-1.5 rounded-full backdrop-blur-sm">
                        {item.category || (language === "bn" ? "গবেষণা" : "Research")}
                      </span>
                    </div>
                  : <div className="h-52 bg-gradient-to-br from-[#0a2a4a] via-[#0e7c6b] to-[#0a2a4a] flex flex-col items-center justify-center gap-3 p-6 text-center">
                      <FileText className="w-14 h-14 text-white/70" aria-hidden="true" />
                      <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#e8c96a]">
                        {item.category || (language === "bn" ? "গবেষণা" : "Research")}
                      </span>
                    </div>
                  }
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-semibold mb-2 text-[#0a2a4a] dark:text-white leading-snug" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                      {language === "bn" && item.titleBn ? item.titleBn : item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed flex-1">
                      {language === "bn" && item.descriptionBn ? item.descriptionBn : item.description}
                    </p>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs px-2.5 py-1 rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.externalLink ?
                      <a
                        href={item.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#0e7c6b] dark:text-teal-300 font-bold hover:underline text-sm"
                      >
                        {t(language, "rpDownload") as string} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    : <details>
                        <summary className="text-[#0e7c6b] dark:text-teal-300 font-bold hover:underline cursor-pointer text-sm list-none inline-flex items-center gap-1.5">
                          {t(language, "rpReadSummary") as string} →
                        </summary>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                          {language === "bn" && item.contentBn ? item.contentBn : item.content}
                        </p>
                      </details>
                    }
                  </div>
                </article>
              ))}
            </div>
          }
        </div>
      </section>

      {/* Education Right Index */}
      <section className="py-16 md:py-20 section-soft">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "সূচক" : "Index"}
            title={t(language, "rpIndexTitle") as string}
            description={t(language, "rpIndexDesc") as string}
          />

          <div className="institution-card p-12 text-center max-w-4xl mx-auto">
            <BarChart3 className="w-20 h-20 text-[#0e7c6b] dark:text-teal-300 mx-auto mb-6" aria-hidden="true" />
            <p className="font-display text-xl text-[#0a2a4a] dark:text-white font-semibold" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
              {t(language, "rpIndexSoon") as string}
            </p>
          </div>
        </div>
      </section>

      {/* Thematic Research Areas */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "বিষয়" : "Themes"}
            title={t(language, "rpThemesTitle") as string}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, titleKey: "educationRights", descKey: "educationRightsDesc" },
              { icon: FileText, titleKey: "policyGov", descKey: "policyGovDesc" },
              { icon: BookOpen, titleKey: "qualityLearning", descKey: "qualityLearningDesc" },
              { icon: Users, titleKey: "skillsLearning", descKey: "skillsLearningDesc" },
              { icon: Laptop, titleKey: "digitalFuture", descKey: "digitalFutureDesc" },
              { icon: CloudRain, titleKey: "climateResilience", descKey: "climateResilienceDesc" },
            ].map((theme, i) => (
              <div key={i} className="institution-card overflow-hidden text-center">
                <div className="h-2 bg-gradient-to-r from-[#0e7c6b] to-[#b98a1f]" aria-hidden="true" />
                <div className="p-8">
                  <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <theme.icon className="w-8 h-8 text-[#0e7c6b] dark:text-teal-300" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-[#0a2a4a] dark:text-white" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                    {t(language, theme.titleKey as never) as string}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed">
                    {t(language, theme.descKey as never) as string}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call for Collaboration */}
      <CTASection
        titleEn="Call for collaboration"
        titleBn="সহযোগিতার আহ্বান"
        descEn="Partner with SEJ on research, evaluation, or education reform projects."
        descBn="গবেষণা, মূল্যায়ন বা শিক্ষা সংস্কার প্রকল্পে SEJ-এর সাথে যুক্ত হোন।"
        secondaryHref="/research-policy"
        secondaryEn="Browse Publications"
        secondaryBn="প্রকাশনা দেখুন"
      />

      <RelatedPrograms current="/research-policy" />

      <Footer />
    </div>
  );
}
