"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { RelatedPrograms } from "@/components/RelatedPrograms";
import {
  Megaphone,
  FileText,
  Newspaper,
  ExternalLink,
  Tag,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";

interface AdvocacyItem {
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

const CAMPAIGN_GRADIENTS = [
  "from-teal-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-orange-500 to-red-600",
  "from-green-500 to-emerald-600",
];

export default function AdvocacyEngagementPage() {
  const { language } = useLanguage();
  const [items, setItems] = useState<AdvocacyItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdvocacy() {
      try {
        const res = await fetch(
          "/api/content?type=advocacy&published=true&limit=50",
        );
        const data = await res.json();
        setItems(data.contents || []);
      } catch (error) {
        console.error("Failed to fetch advocacy:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAdvocacy();
  }, []);

  const getTitle = (item: AdvocacyItem) =>
    language === "bn" && item.titleBn ? item.titleBn : item.title;
  const getDescription = (item: AdvocacyItem) =>
    language === "bn" && item.descriptionBn ?
      item.descriptionBn
    : item.description;
  const getContent = (item: AdvocacyItem) =>
    language === "bn" && item.contentBn ? item.contentBn : item.content;

  const campaigns = items.filter((i) => i.category === "Campaign");
  const parliamentSessions = items.filter(
    (i) => i.category === "Parliament Session",
  );
  const policyWatch = items.filter((i) => i.category === "Policy Watch");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "advocacy") as string}
        subtitle={language === "bn" ? "শিক্ষা অধিকার ও নীতি সংস্কারে কণ্ঠস্বর জোরদার করা" : "Amplifying voices for education rights and policy reform"}
        eyebrow={language === "bn" ? "প্রচারণা" : "Campaigns"}
        breadcrumbs={[{ label: language === "bn" ? "কর্মসূচি" : "Programs" }, { label: t(language, "advocacy") as string }]}
      />

      {loading ?
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-3 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
        </div>
      : items.length === 0 ?
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <Megaphone className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-6" aria-hidden="true" />
            <h2 className="font-display text-2xl font-semibold text-slate-500 dark:text-slate-400 mb-2" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
              {t(language, "advEmptyTitle") as string}
            </h2>
            <p className="text-slate-400 dark:text-slate-500">
              {t(language, "advEmptyDesc") as string}
            </p>
          </div>
        </section>
      : <>
          {/* ── Ongoing Campaigns ───────────────────────────────────── */}
          {campaigns.length > 0 && (
            <section className="py-20 md:py-24 bg-white dark:bg-gray-950">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading
                  eyebrow={language === "bn" ? "প্রচারণা" : "Campaigns"}
                  title={t(language, "advCampaigns") as string}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {campaigns.map((item, idx) => (
                    <article
                      key={item.id}
                      className="institution-card overflow-hidden flex flex-col"
                    >
                      {/* Campaign thumbnail */}
                      {item.featuredImage ?
                        <div className="relative h-60 overflow-hidden">
                          <Image
                            src={item.featuredImage}
                            alt={getTitle(item)}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <span className="absolute top-4 left-4 text-[11px] font-bold tracking-[0.14em] uppercase bg-[#0e7c6b] text-white px-3 py-1.5 rounded-full shadow-lg">
                            {language === "bn" ? "চলমান" : "Ongoing"}
                          </span>
                        </div>
                      : <div
                          className={`h-60 bg-gradient-to-br ${
                            CAMPAIGN_GRADIENTS[idx % CAMPAIGN_GRADIENTS.length]
                          } flex flex-col items-center justify-center gap-3 p-8 text-center relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "18px 18px" }} aria-hidden="true" />
                          <Megaphone className="w-14 h-14 text-white/90 relative" aria-hidden="true" />
                          <span className="relative text-[11px] font-bold tracking-[0.14em] uppercase bg-white/20 text-white px-3 py-1.5 rounded-full">
                            {language === "bn" ? "চলমান প্রচারণা" : "Ongoing Campaign"}
                          </span>
                        </div>
                      }
                      <div className="p-7 flex flex-col flex-1">
                        <h3 className="font-display text-2xl font-semibold mb-2.5 text-[#0a2a4a] dark:text-white leading-snug" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                          {getTitle(item)}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1">
                          {getDescription(item)}
                        </p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {item.tags.map((tag) => (
                              <span key={tag} className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs px-2.5 py-1 rounded-full font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          {item.content && (
                            <details className="w-full mb-1">
                              <summary className="text-[#0e7c6b] dark:text-teal-300 font-bold cursor-pointer hover:underline text-sm list-none inline-flex items-center gap-1.5">
                                {t(language, "advLearnMore") as string} →
                              </summary>
                              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                                {getContent(item)}
                              </p>
                            </details>
                          )}
                          {item.externalLink && (
                            <a
                              href={item.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-[#0a2a4a] hover:bg-[#0e7c6b] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors"
                            >
                              {t(language, "advViewDetails") as string}
                              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── Parliament Sessions ──────────────────────────────────── */}
          {parliamentSessions.length > 0 && (
            <section className="section-soft py-20 md:py-24">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading
                  eyebrow={language === "bn" ? "অধিবেশন" : "Sessions"}
                  title={t(language, "advSessions") as string}
                />
                <div className="space-y-5 max-w-5xl mx-auto">
                  {parliamentSessions.map((item) => (
                    <div
                      key={item.id}
                      className="institution-card p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 rounded-xl flex items-center justify-center shrink-0">
                          <FileText className="w-7 h-7 text-[#0e7c6b] dark:text-teal-300" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-xl font-semibold mb-1.5 text-[#0a2a4a] dark:text-white" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                            {getTitle(item)}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-3 text-[15px] leading-relaxed">
                            {getDescription(item)}
                          </p>
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 bg-slate-100 dark:bg-white/10 px-2.5 py-1 text-xs rounded-full text-slate-600 dark:text-slate-400 font-medium"
                                >
                                  <Tag className="w-3 h-3" aria-hidden="true" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          {item.content && (
                            <details>
                              <summary className="text-[#0e7c6b] dark:text-teal-300 font-bold cursor-pointer hover:underline text-sm list-none inline-flex items-center gap-1.5">
                                {t(language, "advReadMore") as string} →
                              </summary>
                              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                                {getContent(item)}
                              </p>
                            </details>
                          )}
                          {item.externalLink && (
                            <a
                              href={item.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm text-[#0e7c6b] dark:text-teal-300 font-bold hover:underline mt-2"
                            >
                              {t(language, "advViewDetails") as string}
                              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── Policy Watch ─────────────────────────────────────────── */}
          {policyWatch.length > 0 && (
            <section className="py-20 md:py-24 bg-white dark:bg-gray-950">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading
                  eyebrow={language === "bn" ? "পর্যবেক্ষণ" : "Monitoring"}
                  title={t(language, "advPolicyWatch") as string}
                />
                <div className="space-y-4 max-w-5xl mx-auto">
                  {policyWatch.map((item) => (
                    <div
                      key={item.id}
                      className="institution-card p-5 flex items-start gap-4"
                    >
                      <Newspaper className="w-6 h-6 text-[#0e7c6b] dark:text-teal-300 mt-1 shrink-0" aria-hidden="true" />
                      <div className="flex-1">
                        <h3 className="font-bold mb-1 text-[#0a2a4a] dark:text-white">
                          {getTitle(item)}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {getDescription(item)}
                        </p>
                        {item.externalLink && (
                          <a
                            href={item.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[#0e7c6b] dark:text-teal-300 font-bold hover:underline mt-2"
                          >
                            {t(language, "advReadMore") as string} <ExternalLink className="w-3 h-3" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      }

      {/* ── Media Centre (static) ─────────────────────────────────── */}
      <section className="section-soft py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "মিডিয়া" : "Press"}
            title={language === "bn" ? "মিডিয়া সেন্টার" : "Media Centre"}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Megaphone, title: language === "bn" ? "সংবাদ বিজ্ঞপ্তি" : "Press Releases", link: "/news-publications" },
              { icon: FileText, title: language === "bn" ? "মতামত" : "Op-Eds", link: "/news-publications" },
              { icon: Newspaper, title: language === "bn" ? "বিবৃতি" : "Statements", link: "/news-publications" },
            ].map((card) => (
              <a key={card.title} href={card.link} className="institution-card p-8 text-center group">
                <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <card.icon className="w-8 h-8 text-[#0e7c6b] dark:text-teal-300" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-[#0a2a4a] dark:text-white" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                  {card.title}
                </h3>
                <span className="text-[#0e7c6b] dark:text-teal-300 font-bold group-hover:underline">
                  {t(language, "advViewDetails") as string} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        titleEn="Amplify the cause"
        titleBn="উদ্যোগকে এগিয়ে নিন"
        descEn="Join campaigns, dialogues and community actions for education rights."
        descBn="শিক্ষা অধিকারের প্রচারণা, সংলাপ ও কমিউনিটি কর্মসূচিতে যোগ দিন।"
      />

      <RelatedPrograms current="/advocacy-engagement" />

      <Footer />
    </div>
  );
}
