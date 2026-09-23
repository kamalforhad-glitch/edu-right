"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Database,
  Scale,
  BookOpen,
  Image as ImageIcon,
  Play,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";

const GALLERY_PHOTOS = [
  { src: "/sej/photo_2025-10-23_21-12-03 (2).jpg", alt: "SEJ roundtable discussion" },
  { src: "/sej/photo_2025-10-23_21-12-03 (3).jpg", alt: "SEJ youth leadership" },
  { src: "/sej/photo_2025-10-23_21-12-01 (2).jpg", alt: "SEJ community workshop" },
  { src: "/sej/photo_2025-10-23_21-12-02 (2).jpg", alt: "SEJ expert panel" },
  { src: "/new/01.jpg", alt: "SEJ panel discussion" },
  { src: "/new/03.jpg", alt: "SEJ education forum" },
  { src: "/new/04.jpg", alt: "SEJ policy dialogue" },
  { src: "/sej/photo_2025-10-23_21-12-05 (2).jpg", alt: "SEJ research presentation" },
];

type MediaTab = "photos" | "videos" | "documents";

export default function ResourcesPage() {
  const { language } = useLanguage();
  const [tab, setTab] = useState<MediaTab>("photos");

  const categories = [
    { icon: Database, titleKey: "rsrcDataPortal", descKey: "rsrcDataPortalDesc", href: "#data-portal" },
    { icon: Scale, titleKey: "rsrcLegal", descKey: "rsrcLegalDesc", href: "#legal" },
    { icon: BookOpen, titleKey: "rsrcLearning", descKey: "rsrcLearningDesc", href: "#learning" },
    { icon: ImageIcon, titleKey: "rsrcMultimedia", descKey: "rsrcMultimediaDesc", href: "#multimedia" },
  ];

  const toolkits = [
    { titleKey: "rsrcToolkit", descKey: "rsrcToolkitDesc", tone: "teal" },
    { titleKey: "rsrcHandbook", descKey: "rsrcHandbookDesc", tone: "blue" },
    { titleKey: "rsrcMethods", descKey: "rsrcMethodsDesc", tone: "amber" },
  ];

  const tabs: { id: MediaTab; label: string }[] = [
    { id: "photos", label: t(language, "rsrcPhotos") as string },
    { id: "videos", label: t(language, "rsrcVideos") as string },
    { id: "documents", label: t(language, "rsrcDocuments") as string },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <PageHeader
        title={t(language, "rsrcTitle") as string}
        subtitle={t(language, "rsrcSubtitle") as string}
        eyebrow={language === "bn" ? "সংস্থান" : "Library"}
        breadcrumbs={[{ label: t(language, "rsrcTitle") as string }]}
      />

      {/* Resource Categories */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.a
                key={cat.titleKey}
                href={cat.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="institution-card p-8 text-center group"
              >
                <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <cat.icon className="w-8 h-8 text-[#0e7c6b] dark:text-teal-300" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 text-[#0a2a4a] dark:text-white" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                  {t(language, cat.titleKey as never) as string}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t(language, cat.descKey as never) as string}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Education Data Portal */}
      <section id="data-portal" className="section-soft py-16 md:py-20 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "তথ্য" : "Data"}
            title={t(language, "rsrcDataTitle") as string}
            description={t(language, "rsrcDataDesc") as string}
          />
          <div className="institution-card p-10 md:p-12 text-center max-w-4xl mx-auto">
            <Database className="w-20 h-20 text-[#0e7c6b] dark:text-teal-300 mx-auto mb-6" aria-hidden="true" />
            <h3 className="font-display text-2xl font-semibold mb-4 text-[#0a2a4a] dark:text-white" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
              {t(language, "rsrcDashboard") as string}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-7 max-w-2xl mx-auto leading-relaxed">
              {t(language, "rsrcDashboardDesc") as string}
            </p>
            <a href="/research-policy" className="inline-block bg-[#0a2a4a] hover:bg-[#0e7c6b] text-white px-8 py-3.5 rounded-xl font-bold transition-colors">
              {t(language, "rsrcLaunch") as string}
            </a>
          </div>
        </div>
      </section>

      {/* Legal Frameworks */}
      <section id="legal" className="py-16 md:py-20 bg-white dark:bg-gray-950 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "আইন" : "Law"}
            title={t(language, "rsrcLegalTitle") as string}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="institution-card p-8">
              <h3 className="font-display text-2xl font-semibold mb-5 text-[#0a2a4a] dark:text-white" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                {t(language, "rsrcBdLaws") as string}
              </h3>
              <ul className="space-y-3.5">
                {[
                  "Compulsory Primary Education Act, 1990",
                  "Primary Education (Amendment) Act, 2013",
                  "National Education Policy, 2010",
                  "Children Act, 2013",
                ].map((law) => (
                  <li key={law} className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-[#0e7c6b] dark:text-teal-300 mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{law}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="institution-card p-8">
              <h3 className="font-display text-2xl font-semibold mb-5 text-[#0a2a4a] dark:text-white" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                {t(language, "rsrcIntlLaw") as string}
              </h3>
              <ul className="space-y-3.5">
                {[
                  "Universal Declaration of Human Rights (Article 26)",
                  "Convention on the Rights of the Child",
                  "Sustainable Development Goal 4 (Quality Education)",
                  "Incheon Declaration and Framework for Action",
                ].map((law) => (
                  <li key={law} className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-[#0e7c6b] dark:text-teal-300 mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{law}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Materials */}
      <section id="learning" className="section-soft py-16 md:py-20 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "টুলকিট" : "Toolkits"}
            title={t(language, "rsrcLearnTitle") as string}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolkits.map((kit, i) => (
              <motion.div
                key={kit.titleKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="institution-card overflow-hidden flex flex-col"
              >
                <div className="h-36 bg-gradient-to-br from-[#0a2a4a] to-[#0e7c6b] flex items-center justify-center">
                  <BookOpen className="w-14 h-14 text-[#e8c96a]" aria-hidden="true" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-semibold mb-2 text-[#0a2a4a] dark:text-white" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                    {t(language, kit.titleKey as never) as string}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-5 text-sm leading-relaxed flex-1">
                    {t(language, kit.descKey as never) as string}
                  </p>
                  <a href="/contact" className="inline-flex items-center gap-2 text-[#0e7c6b] dark:text-teal-300 font-bold hover:underline text-sm">
                    <Download className="w-4 h-4" aria-hidden="true" />
                    {t(language, "rsrcDownloadPdf") as string}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Multimedia Gallery */}
      <section id="multimedia" className="py-16 md:py-20 bg-white dark:bg-gray-950 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "মিডিয়া" : "Media"}
            title={t(language, "rsrcGalleryTitle") as string}
          />

          {/* Tabs */}
          <div className="flex justify-center gap-2.5 mb-10 flex-wrap" role="tablist" aria-label="Media categories">
            {tabs.map((item) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => setTab(item.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  tab === item.id
                    ? "bg-[#0a2a4a] text-white shadow-lg"
                    : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === "photos" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="tabpanel">
              {GALLERY_PHOTOS.map((photo) => (
                <Link
                  key={photo.src}
                  href="/gallery"
                  className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-shadow"
                  aria-label={photo.alt}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                </Link>
              ))}
            </div>
          )}

          {tab === "videos" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto" role="tabpanel">
              {[
                { title: language === "bn" ? "SEJ ইভেন্ট হাইলাইটস" : "SEJ Event Highlights" },
                { title: language === "bn" ? "নীতি সংলাপ রেকর্ডিং" : "Policy Dialogue Recordings" },
              ].map((video) => (
                <a
                  key={video.title}
                  href="https://www.youtube.com/@user-zy6nt8fv6e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="institution-card overflow-hidden group flex flex-col"
                >
                  <div className="h-52 bg-[#0a2a4a] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "20px 20px" }} aria-hidden="true" />
                    <span className="relative w-16 h-16 rounded-full bg-[#b98a1f] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-white ml-1" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="p-6 flex items-center justify-between gap-3">
                    <h3 className="font-bold text-[#0a2a4a] dark:text-white">{video.title}</h3>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0e7c6b] dark:text-teal-300 shrink-0">
                      {t(language, "rsrcWatch") as string}
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {tab === "documents" && (
            <div className="max-w-4xl mx-auto space-y-4" role="tabpanel">
              {[
                { title: language === "bn" ? "বার্ষিক শিক্ষা অধিকার প্রতিবেদন" : "Annual Education Rights Report", meta: "PDF • 2025" },
                { title: language === "bn" ? "পাঠ্যক্রম সংস্কার নীতি সংক্ষিপ্ত" : "Curriculum Reform Policy Brief", meta: "PDF • 2025" },
                { title: language === "bn" ? "শিক্ষা বাজেট বিশ্লেষণ" : "Education Budget Analysis", meta: "PDF • 2024" },
              ].map((doc) => (
                <div key={doc.title} className="institution-card p-5 flex items-center gap-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/30 text-[#0e7c6b] dark:text-teal-300 shrink-0">
                    <FileText className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#0a2a4a] dark:text-white truncate">{doc.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{doc.meta}</p>
                  </div>
                  <a href="/research-policy" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0e7c6b] dark:text-teal-300 hover:underline shrink-0">
                    <Download className="w-4 h-4" aria-hidden="true" />
                    {t(language, "rsrcOpenDoc") as string}
                  </a>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 font-bold text-[#0e7c6b] dark:text-teal-300 hover:gap-3.5 transition-all"
            >
              {t(language, "rsrcViewGallery") as string}
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        titleEn="Need a resource we don't have?"
        titleBn="প্রয়োজনীয় সংস্থান খুঁজে পাচ্ছেন না?"
        descEn="Tell us what data, toolkit or document would help your advocacy work."
        descBn="আপনার অ্যাডভোকেসি কাজে কোন তথ্য বা উপকরণ সাহায্য করবে তা জানান।"
        primaryHref="/contact"
        primaryEn="Request a Resource"
        primaryBn="সংস্থানের অনুরোধ করুন"
      />
      <Footer />
    </div>
  );
}
