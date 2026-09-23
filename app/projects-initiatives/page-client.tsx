"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { RelatedPrograms } from "@/components/RelatedPrograms";
import {
  Rocket,
  ExternalLink,
  Tag,
  Clock,
  CheckCircle,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "framer-motion";

interface ProjectItem {
  id: string;
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  content: string;
  contentBn?: string;
  featuredImage?: string;
  images?: string[];
  tags?: string[];
  category?: string;
  externalLink?: string;
  status?: "upcoming" | "ongoing" | "completed";
  isFeatured: boolean;
  createdAt: string;
}

const statusConfig: Record<
  string,
  { icon: typeof Clock; color: string }
> = {
  upcoming: {
    icon: Clock,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  ongoing: {
    icon: Zap,
    color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  completed: {
    icon: CheckCircle,
    color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
};

export default function ProjectsInitiativesPage() {
  const { language } = useLanguage();
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(
          "/api/content?type=project&published=true&limit=50",
        );
        const data = await res.json();
        setItems(data.contents || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const getTitle = (item: ProjectItem) =>
    language === "bn" && item.titleBn ? item.titleBn : item.title;
  const getDescription = (item: ProjectItem) =>
    language === "bn" && item.descriptionBn ?
      item.descriptionBn
    : item.description;
  const getContent = (item: ProjectItem) =>
    language === "bn" && item.contentBn ? item.contentBn : item.content;

  const featured = items.filter((i) => i.isFeatured);
  const filtered =
    activeFilter === "all" ?
      items.filter((i) => !i.isFeatured)
    : items.filter((i) => !i.isFeatured && i.status === activeFilter);

  const ongoing = items.filter((i) => i.status === "ongoing");
  const completed = items.filter((i) => i.status === "completed");
  const upcoming = items.filter((i) => i.status === "upcoming");

  const statusLabel = (status?: string) => {
    if (status === "ongoing") return t(language, "projOngoing") as string;
    if (status === "upcoming") return t(language, "projUpcoming") as string;
    if (status === "completed") return t(language, "projCompleted") as string;
    return status || "";
  };

  const filterLabel = (filter: string) => {
    if (filter === "all") return language === "bn" ? "সব" : "All";
    return statusLabel(filter);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "projects") as string}
        subtitle={language === "bn" ? "প্রভাবশালী কর্মসূচি ও সহযোগিতামূলক কর্মের মাধ্যমে পরিবর্তন" : "Driving change through impactful programs and collaborative action"}
        eyebrow={language === "bn" ? "মাঠ কর্ম" : "Field Work"}
        breadcrumbs={[{ label: language === "bn" ? "কর্মসূচি" : "Programs" }, { label: t(language, "projects") as string }]}
      />

      {loading ?
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-3 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
        </div>
      : items.length === 0 ?
        <section className="py-20 bg-gray-50 dark:bg-gray-800 section-xl">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <Rocket className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-6" aria-hidden="true" />
            <h2 className="font-display text-2xl font-semibold text-slate-500 dark:text-slate-400 mb-2" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
              {t(language, "projEmptyTitle") as string}
            </h2>
            <p className="text-slate-400 dark:text-slate-500">
              {t(language, "projEmptyDesc") as string}
            </p>
          </div>
        </section>
      : <>
          {/* Stats Dashboard — fully dynamic from CMS */}
          <section className="section-soft py-14 md:py-16 border-b border-slate-200 dark:border-white/10" aria-label="Project statistics">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
                {[
                  {
                    icon: Zap,
                    count: ongoing.length,
                    label: t(language, "projOngoing") as string,
                    desc: language === "bn" ? "মাঠ পর্যায়ে সক্রিয় উদ্যোগ" : "Actively running in the field",
                    accent: "text-emerald-600 dark:text-emerald-400",
                    chip: "bg-emerald-500/10",
                  },
                  {
                    icon: Clock,
                    count: upcoming.length,
                    label: t(language, "projUpcoming") as string,
                    desc: language === "bn" ? "শীঘ্রই শুরু হচ্ছে" : "Launching soon",
                    accent: "text-blue-600 dark:text-blue-400",
                    chip: "bg-blue-500/10",
                  },
                  {
                    icon: CheckCircle,
                    count: completed.length,
                    label: t(language, "projCompleted") as string,
                    desc: language === "bn" ? "সফলভাবে সমাপ্ত" : "Successfully delivered",
                    accent: "text-[#b98a1f] dark:text-[#e8c96a]",
                    chip: "bg-[#b98a1f]/10",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="institution-card p-7 text-center"
                  >
                    <span className={`inline-flex items-center justify-center w-13 h-13 rounded-2xl ${stat.chip} ${stat.accent} mb-4 p-3.5`}>
                      <stat.icon className="w-7 h-7" aria-hidden="true" />
                    </span>
                    <div className={`text-5xl font-extrabold tracking-tight ${stat.accent}`}>
                      {stat.count}
                    </div>
                    <p className="mt-1.5 font-bold text-[#0a2a4a] dark:text-white">
                      {stat.label}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {stat.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
              <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6 tracking-wide">
                {language === "bn" ? "অ্যাডমিন প্যানেল থেকে স্বয়ংক্রিয়ভাবে হালনাগাদ হয়" : "Updated automatically from the admin panel"}
              </p>
            </div>
          </section>

          {/* Featured Projects */}
          {featured.length > 0 && (
            <section className="py-20 md:py-24 bg-white dark:bg-gray-950">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading
                  eyebrow={language === "bn" ? "বিশিষ্ট" : "Spotlight"}
                  title={t(language, "projFeatured") as string}
                />
                <div className="space-y-8">
                  {featured.map((item) => {
                    const statusInfo =
                      item.status ? statusConfig[item.status] : null;
                    const StatusIcon = statusInfo?.icon;
                    return (
                      <div
                        key={item.id}
                        className="section-navy rounded-[1.5rem] overflow-hidden shadow-xl text-white relative"
                      >
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0e7c6b] via-[#b98a1f] to-[#0e7c6b]" aria-hidden="true" />
                        <div className="md:flex">
                          {item.featuredImage ? (
                            <div className="relative w-full md:w-96 h-64 md:h-auto shrink-0">
                              <Image
                                src={item.featuredImage}
                                alt={getTitle(item)}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 400px"
                              />
                            </div>
                          ) : (
                            <div className="w-full md:w-96 h-64 md:h-auto shrink-0 bg-white/5 flex flex-col items-center justify-center gap-3 p-8 text-center border-b md:border-b-0 md:border-r border-white/10">
                              <Rocket className="w-14 h-14 text-[#e8c96a]" aria-hidden="true" />
                              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/60">
                                {statusLabel(item.status)}
                              </span>
                            </div>
                          )}
                          <div className="p-8 md:p-10 flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              {statusInfo && (
                                <span className="bg-white/15 px-3 py-1 text-sm rounded-full inline-flex items-center gap-1.5 font-semibold">
                                  {StatusIcon && (
                                    <StatusIcon className="w-3.5 h-3.5" aria-hidden="true" />
                                  )}
                                  {statusLabel(item.status)}
                                </span>
                              )}
                              {item.category && (
                                <span className="bg-white/15 px-3 py-1 text-sm rounded-full">
                                  {item.category}
                                </span>
                              )}
                            </div>
                            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                              {getTitle(item)}
                            </h3>
                            <p className="text-lg text-white/80 mb-6 leading-relaxed">
                              {getDescription(item)}
                            </p>
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-6">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="bg-white/15 px-3 py-1 text-sm rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center gap-4">
                              {item.content && (
                                <details className="group">
                                  <summary className="font-semibold cursor-pointer hover:underline list-none inline-flex items-center gap-1.5">
                                    {language === "bn" ? "আরও জানুন" : "Learn More"} →
                                  </summary>
                                  <div className="mt-4 text-white/80 text-sm whitespace-pre-line leading-relaxed">
                                    {getContent(item)}
                                  </div>
                                </details>
                              )}
                              {item.externalLink && (
                                <a
                                  href={item.externalLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
                                >
                                  {t(language, "projView") as string}{" "}
                                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Filter Bar + All Projects */}
          <section className="section-soft py-20 md:py-24">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading
                eyebrow={language === "bn" ? "পোর্টফোলিও" : "Portfolio"}
                title={t(language, "projAll") as string}
              />

              {/* Filter */}
              <div className="flex justify-center gap-2.5 mb-12 flex-wrap" role="group" aria-label="Filter projects">
                {["all", "ongoing", "upcoming", "completed"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={activeFilter === filter}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                      activeFilter === filter ?
                        "bg-[#0a2a4a] text-white shadow-lg"
                      : "bg-white dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#0e7c6b]"
                    }`}
                  >
                    {filterLabel(filter)}
                  </button>
                ))}
              </div>

              {filtered.length === 0 ?
                <p className="text-center text-slate-400 dark:text-slate-500 py-8">
                  {language === "bn" ? "কোনো প্রকল্প পাওয়া যায়নি।" : `No ${activeFilter === "all" ? "" : activeFilter} projects found.`}
                </p>
              : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((item) => {
                    const statusInfo =
                      item.status ? statusConfig[item.status] : null;
                    const StatusIcon = statusInfo?.icon;
                    return (
                      <div
                        key={item.id}
                        className="institution-card overflow-hidden flex flex-col"
                      >
                        {item.featuredImage ?
                          <div className="relative h-52">
                            <Image
                              src={item.featuredImage}
                              alt={getTitle(item)}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            {statusInfo && (
                              <span
                                className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 shadow ${statusInfo.color}`}
                              >
                                {StatusIcon && (
                                  <StatusIcon className="w-3 h-3" aria-hidden="true" />
                                )}
                                {statusLabel(item.status)}
                              </span>
                            )}
                          </div>
                        : <div className="h-52 bg-gradient-to-br from-[#0a2a4a] to-[#0e7c6b] flex items-center justify-center relative">
                            <Rocket className="w-12 h-12 text-[#e8c96a]" aria-hidden="true" />
                            {statusInfo && (
                              <span
                                className="absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 bg-white/15 text-white backdrop-blur-sm"
                              >
                                {StatusIcon && (
                                  <StatusIcon className="w-3 h-3" aria-hidden="true" />
                                )}
                                {statusLabel(item.status)}
                              </span>
                            )}
                          </div>
                        }
                        <div className="p-6 flex-1 flex flex-col">
                          {item.category && (
                            <span className="text-xs font-bold text-[#0e7c6b] dark:text-teal-300 uppercase tracking-[0.12em] mb-1.5">
                              {item.category}
                            </span>
                          )}
                          <h3 className="font-display text-lg font-semibold mb-2 text-[#0a2a4a] dark:text-white leading-snug" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                            {getTitle(item)}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-1 leading-relaxed">
                            {getDescription(item)}
                          </p>

                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {item.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 bg-slate-100 dark:bg-white/10 px-2 py-0.5 text-xs rounded-full text-slate-500 dark:text-slate-400 font-medium"
                                >
                                  <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                                  {tag}
                                </span>
                              ))}
                              {item.tags.length > 3 && (
                                <span className="text-xs text-slate-400">
                                  +{item.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-3 mt-auto pt-3 border-t border-slate-100 dark:border-white/10">
                            {item.content && (
                              <details className="group flex-1">
                                <summary className="text-[#0e7c6b] dark:text-teal-300 font-bold cursor-pointer hover:underline text-sm list-none">
                                  {language === "bn" ? "বিস্তারিত" : "Details"} →
                                </summary>
                                <div className="mt-3 text-slate-600 dark:text-slate-400 text-sm whitespace-pre-line leading-relaxed">
                                  {getContent(item)}
                                </div>
                              </details>
                            )}
                            {item.externalLink && (
                              <a
                                href={item.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[#0e7c6b] dark:text-teal-300 font-bold text-sm hover:gap-2 transition-all"
                              >
                                {t(language, "projView") as string} <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              }
            </div>
          </section>
        </>
      }

      <CTASection
        titleEn="Support a project, spark change"
        titleBn="প্রকল্পে সহায়তা করুন, পরিবর্তন আনুন"
        descEn="Volunteer, partner or donate to bring our field initiatives to more communities."
        descBn="আরও কমিউনিটিতে আমাদের মাঠ উদ্যোগ পৌঁছে দিতে স্বেচ্ছাসেবক, অংশীদার বা দাতা হোন।"
      />

      <RelatedPrograms current="/projects-initiatives" />

      <Footer />
    </div>
  );
}
