"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { Landmark, ExternalLink, Tag } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/contexts/LanguageContext";

interface ParliamentItem {
  _id: string;
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
  isFeatured: boolean;
  createdAt: string;
}

export default function ParliamentPlatformPage() {
  const { language } = useLanguage();
  const [items, setItems] = useState<ParliamentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParliament() {
      try {
        const res = await fetch(
          "/api/content?type=parliament&published=true&limit=50",
        );
        const data = await res.json();
        setItems(data.contents || []);
      } catch (error) {
        console.error("Failed to fetch parliament:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchParliament();
  }, []);

  const getTitle = (item: ParliamentItem) =>
    language === "bn" && item.titleBn ? item.titleBn : item.title;
  const getDescription = (item: ParliamentItem) =>
    language === "bn" && item.descriptionBn ?
      item.descriptionBn
    : item.description;
  const getContent = (item: ParliamentItem) =>
    language === "bn" && item.contentBn ? item.contentBn : item.content;

  const featured = items.filter((i) => i.isFeatured);
  const regular = items.filter((i) => !i.isFeatured);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title="The Parliament Platform"
        subtitle="Giving citizens a voice in shaping education policy"
      />

      {/* Intro */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            ERP&apos;s civic parliament gives citizens a voice in shaping
            education policy. Join our community of advocates, educators, and
            youth leaders working towards inclusive and quality education for
            all.
          </p>
        </div>
      </section>

      {loading ?
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-3 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
        </div>
      : items.length === 0 ?
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <Landmark className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-2">
              No Parliament Updates Yet
            </h2>
            <p className="text-gray-400 dark:text-gray-500">
              Check back soon for sessions, hearings, and policy discussions.
            </p>
          </div>
        </section>
      : <>
          {/* Featured Sessions */}
          {featured.length > 0 && (
            <section className="py-16 bg-gradient-to-br from-teal-600 to-blue-600 text-white">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Featured Sessions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {featured.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white/10 backdrop-blur rounded-xl overflow-hidden"
                    >
                      {item.featuredImage && (
                        <div className="relative h-48">
                          <Image
                            src={item.featuredImage}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-8">
                        <h3 className="text-2xl font-bold mb-4">
                          {getTitle(item)}
                        </h3>
                        <p className="opacity-90 mb-4">
                          {getDescription(item)}
                        </p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-white/20 px-3 py-1 text-sm rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {item.externalLink && (
                          <a
                            href={item.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
                          >
                            View Details <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All Parliament Items */}
          {regular.length > 0 && (
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                  Sessions & Hearings
                </h2>

                <div className="space-y-6">
                  {regular.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="md:flex">
                        {item.featuredImage && (
                          <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0">
                            <Image
                              src={item.featuredImage}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-8 flex-1">
                          <div className="flex items-start gap-4">
                            {!item.featuredImage && (
                              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center shrink-0">
                                <Landmark className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                              </div>
                            )}
                            <div className="flex-1">
                              {item.category && (
                                <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                                  {item.category}
                                </span>
                              )}
                              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                {getTitle(item)}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 mb-3">
                                {getDescription(item)}
                              </p>
                              <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                {new Date(item.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )}
                              </div>

                              {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
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

                              <div className="flex items-center gap-4">
                                {item.content && (
                                  <details className="group">
                                    <summary className="text-teal-600 dark:text-teal-400 font-semibold cursor-pointer hover:underline text-sm">
                                      Read More
                                    </summary>
                                    <div className="mt-4 text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">
                                      {getContent(item)}
                                    </div>
                                  </details>
                                )}
                                {item.externalLink && (
                                  <a
                                    href={item.externalLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-sm hover:gap-3 transition-all"
                                  >
                                    View Details{" "}
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      }

      <Footer />
    </div>
  );
}
