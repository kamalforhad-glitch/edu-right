"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import {
  Megaphone,
  FileText,
  Newspaper,
  ExternalLink,
  Tag,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/contexts/LanguageContext";

interface AdvocacyItem {
  _id: string;
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
        title="Advocacy & Engagement"
        subtitle="Amplifying voices for education rights and policy reform"
      />

      {loading ?
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-3 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
        </div>
      : items.length === 0 ?
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <Megaphone className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-2">
              No Advocacy Content Yet
            </h2>
            <p className="text-gray-400 dark:text-gray-500">
              Our campaigns and policy updates will appear here soon.
            </p>
          </div>
        </section>
      : <>
          {/* ── Ongoing Campaigns ───────────────────────────────────── */}
          {campaigns.length > 0 && (
            <section className="py-16 bg-white dark:bg-gray-900">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                  Ongoing Campaigns
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {campaigns.map((item, idx) => (
                    <div
                      key={item._id}
                      className="rounded-lg overflow-hidden shadow-lg"
                    >
                      {item.featuredImage ?
                        <div className="relative h-64">
                          <Image
                            src={item.featuredImage}
                            alt={getTitle(item)}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-8">
                            <div className="text-center text-white">
                              <h3 className="text-3xl font-bold mb-2">
                                {getTitle(item)}
                              </h3>
                              <p className="text-xl opacity-90">
                                {getDescription(item)}
                              </p>
                            </div>
                          </div>
                        </div>
                      : <div
                          className={`h-64 bg-linear-to-br ${
                            CAMPAIGN_GRADIENTS[idx % CAMPAIGN_GRADIENTS.length]
                          } flex items-center justify-center p-8`}
                        >
                          <div className="text-center text-white">
                            <h3 className="text-3xl font-bold mb-2">
                              {getTitle(item)}
                            </h3>
                            <p className="text-xl opacity-90">
                              {getDescription(item)}
                            </p>
                          </div>
                        </div>
                      }
                      {item.content && (
                        <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {getContent(item)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── Parliament Sessions ──────────────────────────────────── */}
          {parliamentSessions.length > 0 && (
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                  Parliament Sessions
                </h2>
                <div className="space-y-6">
                  {parliamentSessions.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center shrink-0">
                          <FileText className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                            {getTitle(item)}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {getDescription(item)}
                          </p>
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs rounded-full text-gray-600 dark:text-gray-400"
                                >
                                  <Tag className="w-3 h-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          {item.content && (
                            <details>
                              <summary className="text-teal-600 dark:text-teal-400 font-semibold cursor-pointer hover:underline text-sm">
                                View Policy Notes →
                              </summary>
                              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                                {getContent(item)}
                              </p>
                            </details>
                          )}
                          {item.externalLink && (
                            <a
                              href={item.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-teal-600 dark:text-teal-400 font-semibold hover:underline mt-2"
                            >
                              View Details{" "}
                              <ExternalLink className="w-3.5 h-3.5" />
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
            <section className="py-16 bg-white dark:bg-gray-900">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                  Policy Watch
                </h2>
                <div className="space-y-4">
                  {policyWatch.map((item) => (
                    <div
                      key={item._id}
                      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow flex items-start gap-4"
                    >
                      <Newspaper className="w-6 h-6 text-teal-600 dark:text-teal-400 mt-1 shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-bold mb-1 text-gray-900 dark:text-white">
                          {getTitle(item)}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {getDescription(item)}
                        </p>
                        {item.externalLink && (
                          <a
                            href={item.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 font-semibold hover:underline mt-2"
                          >
                            Read More <ExternalLink className="w-3 h-3" />
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
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Media Centre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Megaphone className="w-10 h-10 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Press Releases
              </h3>
              <a
                href="#"
                className="text-teal-600 dark:text-teal-400 hover:underline"
              >
                View All →
              </a>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Op-Eds
              </h3>
              <a
                href="#"
                className="text-teal-600 dark:text-teal-400 hover:underline"
              >
                Read More →
              </a>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Newspaper className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Statements
              </h3>
              <a
                href="#"
                className="text-teal-600 dark:text-teal-400 hover:underline"
              >
                View All →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
