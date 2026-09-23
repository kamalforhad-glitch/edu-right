"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { Newspaper, FileText, Bell, ExternalLink, Search } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";

interface NewsItem {
  id: string;
  title: string;
  titleBn?: string;
  description?: string;
  descriptionBn?: string;
  content?: string;
  featuredImage?: string;
  images?: string[];
  tags?: string[];
  source?: string;
  externalLink?: string;
  publishDate?: string;
  isFeatured?: boolean;
  category?: string;
}

const CARD_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-cyan-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
];

export default function NewsPublicationsPage() {
  const { language } = useLanguage();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    fetch("/api/content?type=news&published=true&limit=50")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.contents || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featuredItem = items.find(
    (i) => i.isFeatured && i.category === "In the News",
  );
  const allCoverage = items.filter((i) => i.category === "Media Coverage");
  const categories = ["All", ...Array.from(new Set(allCoverage.map((i) => i.source || "General")))];

  const coverageItems = allCoverage.filter((i) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      i.title.toLowerCase().includes(q) ||
      (i.titleBn || "").toLowerCase().includes(q) ||
      (i.source || "").toLowerCase().includes(q);
    const matchesCategory =
      activeCategory === "All" || (i.source || "General") === activeCategory;
    return matchesQuery && matchesCategory;
  });

  // Parse key demands from featured item content (lines starting with bullet •)
  const keyDemands: string[] =
    featuredItem?.content ?
      featuredItem.content
        .split("\n")
        .map((l) => l.replace(/^[•●]\s*/, "").trim())
        .filter((l) => l.length > 0)
    : [];

  const eventPhotos =
    featuredItem?.images && featuredItem.images.length > 0 ?
      featuredItem.images
    : [
        "/sej/photo_2025-10-23_21-12-02 (2).jpg",
        "/sej/photo_2025-10-23_21-12-03 (4).jpg",
        "/sej/photo_2025-10-23_21-12-04 (2).jpg",
        "/sej/photo_2025-10-23_21-12-05 (2).jpg",
      ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "news") as string}
        subtitle={language === "bn" ? "শিক্ষা নীতি নিয়ে সাম্প্রতিক আপডেট, গবেষণা ও অন্তর্দৃষ্টি" : "Latest updates, research, and insights on education policy"}
        eyebrow={language === "bn" ? "সংবাদ কক্ষ" : "Press Room"}
        breadcrumbs={[{ label: language === "bn" ? "মিডিয়া ও ইভেন্ট" : "Media & Events" }, { label: t(language, "news") as string }]}
      />

      {/* Search & outlet filter */}
      <section className="bg-white dark:bg-gray-950 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <label className="relative flex-1 max-w-xl" aria-label="Search news">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t(language, "newsSearchPh") as string}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 focus:border-[#0e7c6b] focus:ring-2 focus:ring-[#0e7c6b]/25 outline-none transition"
              />
            </label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by outlet">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-[#0a2a4a] text-white shadow-md"
                      : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {(query || activeCategory !== "All") && (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400" role="status">
              {coverageItems.length} {t(language, "newsResults") as string}
              <button onClick={() => { setQuery(""); setActiveCategory("All"); }} className="ml-3 font-bold text-[#0e7c6b] dark:text-teal-300 hover:underline">
                {t(language, "newsClear") as string}
              </button>
            </p>
          )}
        </div>
      </section>

      {/* In the News - Featured Section */}
      <section className="py-20 bg-white dark:bg-gray-900 section-xl">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl font-semibold text-center mb-16 text-[#0a2a4a] dark:text-white" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
            {t(language, "newsInTheNews") as string}
          </h2>

          {loading ?
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
            </div>
          : <>
              {/* Featured News Story */}
              {featuredItem && (
                <div className="max-w-5xl mx-auto mb-16">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border-l-4 border-teal-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      {/* Left: Main content */}
                      <div className="p-10 md:p-12 bg-white dark:bg-gray-800">
                        <div className="inline-block mb-4">
                          <span className="bg-teal-100 dark:bg-teal-900/30 px-4 py-2 text-sm font-semibold rounded-full text-teal-700 dark:text-teal-300">
                            {featuredItem.publishDate ?
                              new Date(featuredItem.publishDate)
                                .toLocaleString("en-US", {
                                  month: "long",
                                  year: "numeric",
                                })
                                .toUpperCase()
                            : "LATEST"}
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                          {language === "bn" && featuredItem.titleBn ?
                            featuredItem.titleBn
                          : featuredItem.title}
                        </h3>
                        <p className="text-lg leading-relaxed mb-8 text-gray-700 dark:text-gray-300">
                          {language === "bn" && featuredItem.descriptionBn ?
                            featuredItem.descriptionBn
                          : featuredItem.description}
                        </p>
                        <div className="flex flex-wrap gap-3 mb-8">
                          {featuredItem.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="bg-teal-100 dark:bg-teal-900/30 px-3 py-1 text-sm rounded-full text-teal-700 dark:text-teal-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {featuredItem.externalLink && (
                          <a
                            href={featuredItem.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors inline-flex items-center gap-2"
                          >
                            {t(language, "newsViewCoverage") as string}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      {/* Right: Image & Statistics */}
                      {featuredItem.featuredImage && (
                        <div className="relative overflow-hidden min-h-64">
                          <Image
                            src={featuredItem.featuredImage}
                            alt={featuredItem.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-black/30 p-10 md:p-12 flex flex-col justify-end text-white">
                            <div className="space-y-6">
                              <div>
                                <div className="text-4xl md:text-5xl font-bold mb-2">
                                  9+
                                </div>
                                <div className="text-lg md:text-xl opacity-95">
                                  Major News Outlets
                                </div>
                              </div>
                              <div>
                                <div className="text-4xl md:text-5xl font-bold mb-2">
                                  100+
                                </div>
                                <div className="text-lg md:text-xl opacity-95">
                                  Media Impressions
                                </div>
                              </div>
                              <div>
                                <div className="text-4xl md:text-5xl font-bold mb-2">
                                  4
                                </div>
                                <div className="text-lg md:text-xl opacity-95">
                                  Keynote Speakers
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Key Demands */}
              {keyDemands.length > 0 && (
                <div className="max-w-5xl mx-auto mb-16">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                    {t(language, "newsKeyDemands") as string}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {keyDemands.map((demand) => (
                      <div
                        key={demand}
                        className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-l-4 border-green-500"
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-green-600 dark:text-green-400 font-bold text-2xl shrink-0">
                            ✓
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            {demand}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* News Coverage Grid */}
              {coverageItems.length > 0 ? (
                <div className="max-w-6xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                    {t(language, "newsCoverage") as string}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coverageItems.map((news, idx) => (
                      <a
                        key={news.id}
                        href={news.externalLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer transform hover:scale-105 transition-all"
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl overflow-hidden h-full flex flex-col">
                          <div
                            className={`${CARD_COLORS[idx % CARD_COLORS.length]} h-2`}
                          ></div>
                          <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-start gap-3 mb-4">
                              <Newspaper className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-1 shrink-0" />
                              <h4 className="font-bold text-teal-600 dark:text-teal-400">
                                {news.source || "News Outlet"}
                              </h4>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 font-semibold mb-4 flex-1 line-clamp-3 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
                              {language === "bn" && news.titleBn ?
                                news.titleBn
                              : news.title}
                            </p>
                            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-sm group-hover:gap-3 transition-all">
                              <span>{t(language, "newsReadArticle") as string}</span>
                              <ExternalLink className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                !loading && (
                  <div className="max-w-6xl mx-auto text-center py-14 px-6 rounded-2xl border border-dashed border-slate-300 dark:border-white/15">
                    <Newspaper className="w-10 h-10 mx-auto mb-4 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                    <p className="font-semibold text-slate-600 dark:text-slate-300">
                      {t(language, "newsNoStories") as string}
                    </p>
                    <button
                      onClick={() => { setQuery(""); setActiveCategory("All"); }}
                      className="mt-3 font-bold text-[#0e7c6b] dark:text-teal-300 hover:underline"
                    >
                      {t(language, "newsClearFilters") as string}
                    </button>
                  </div>
                )
              )}

              {/* Event Photo Gallery */}
              <div className="max-w-6xl mx-auto mt-16">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  {t(language, "newsHighlights") as string}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {eventPhotos.map((photo, idx) => (
                    <div
                      key={photo}
                      className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group"
                    >
                      <Image
                        src={photo}
                        alt={`Event Photo ${idx + 1}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-110 duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          }
        </div>
      </section>

      {/* Publications Library - Hidden for now */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 hidden section-xl">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Publications Library
          </h2>

          {/* Search & Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Search publications..."
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>All Years</option>
                  <option>2025</option>
                  <option>2025</option>
                  <option>2023</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>All Topics</option>
                  <option>Access & Equity</option>
                  <option>Quality & Learning</option>
                  <option>Governance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Publications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((pub) => (
              <div
                key={pub}
                className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-center h-32 bg-teal-100 dark:bg-teal-900 rounded-lg mb-3">
                  <FileText className="w-12 h-12 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-bold text-sm mb-2 text-gray-900 dark:text-white">
                  Publication {pub}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  2025 | Author Name
                </p>
                <button className="text-xs text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup - Hidden for now */}
      <section className="py-16 bg-teal-600 dark:bg-teal-800 text-white hidden section-xl">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Bell className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Stay Informed with SEJ Insights
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for the latest research, policy updates,
            and event announcements.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            />
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </form>

          <p className="text-sm mt-4 opacity-75">
            View our{" "}
            <a href="#" className="underline">
              newsletter archive
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
