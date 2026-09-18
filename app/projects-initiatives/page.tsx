"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
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
  { label: string; icon: typeof Clock; color: string }
> = {
  upcoming: {
    label: "Upcoming",
    icon: Clock,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  ongoing: {
    label: "Ongoing",
    icon: Zap,
    color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  completed: {
    label: "Completed",
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title="Projects & Initiatives"
        subtitle="Driving change through impactful programs and collaborative action"
      />

      {loading ?
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-3 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
        </div>
      : items.length === 0 ?
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <Rocket className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-2">
              No Projects Yet
            </h2>
            <p className="text-gray-400 dark:text-gray-500">
              Our projects & initiatives will appear here soon.
            </p>
          </div>
        </section>
      : <>
          {/* Stats Bar */}
          <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    {ongoing.length}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Ongoing
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    {upcoming.length}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Upcoming
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                    {completed.length}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Completed
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          {featured.length > 0 && (
            <section className="py-16 bg-white dark:bg-gray-900">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                  Featured Projects
                </h2>
                <div className="space-y-8">
                  {featured.map((item) => {
                    const statusInfo =
                      item.status ? statusConfig[item.status] : null;
                    const StatusIcon = statusInfo?.icon;
                    return (
                      <div
                        key={item.id}
                        className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl overflow-hidden shadow-xl text-white"
                      >
                        <div className="md:flex">
                          {item.featuredImage && (
                            <div className="relative w-full md:w-96 h-64 md:h-auto shrink-0">
                              <Image
                                src={item.featuredImage}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="p-10 flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              {statusInfo && (
                                <span className="bg-white/20 px-3 py-1 text-sm rounded-full inline-flex items-center gap-1">
                                  {StatusIcon && (
                                    <StatusIcon className="w-3.5 h-3.5" />
                                  )}
                                  {statusInfo.label}
                                </span>
                              )}
                              {item.category && (
                                <span className="bg-white/20 px-3 py-1 text-sm rounded-full">
                                  {item.category}
                                </span>
                              )}
                            </div>
                            <h3 className="text-3xl font-bold mb-4">
                              {getTitle(item)}
                            </h3>
                            <p className="text-lg opacity-90 mb-6">
                              {getDescription(item)}
                            </p>
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-6">
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
                            <div className="flex items-center gap-4">
                              {item.content && (
                                <details className="group">
                                  <summary className="font-semibold cursor-pointer hover:underline">
                                    Learn More
                                  </summary>
                                  <div className="mt-4 opacity-90 text-sm whitespace-pre-line">
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
                                  View Project{" "}
                                  <ExternalLink className="w-4 h-4" />
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
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                All Projects
              </h2>

              {/* Filter */}
              <div className="flex justify-center gap-3 mb-12 flex-wrap">
                {["all", "ongoing", "upcoming", "completed"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                      activeFilter === filter ?
                        "bg-teal-600 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>

              {filtered.length === 0 ?
                <p className="text-center text-gray-400 dark:text-gray-500 py-8">
                  No {activeFilter === "all" ? "" : activeFilter} projects
                  found.
                </p>
              : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((item) => {
                    const statusInfo =
                      item.status ? statusConfig[item.status] : null;
                    const StatusIcon = statusInfo?.icon;
                    return (
                      <div
                        key={item.id}
                        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
                      >
                        {item.featuredImage ?
                          <div className="relative h-48">
                            <Image
                              src={item.featuredImage}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                            {statusInfo && (
                              <span
                                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${statusInfo.color}`}
                              >
                                {StatusIcon && (
                                  <StatusIcon className="w-3 h-3" />
                                )}
                                {statusInfo.label}
                              </span>
                            )}
                          </div>
                        : <div className="h-48 bg-gradient-to-br from-teal-500/10 to-blue-500/10 dark:from-teal-500/20 dark:to-blue-500/20 flex items-center justify-center relative">
                            <Rocket className="w-12 h-12 text-teal-400" />
                            {statusInfo && (
                              <span
                                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${statusInfo.color}`}
                              >
                                {StatusIcon && (
                                  <StatusIcon className="w-3 h-3" />
                                )}
                                {statusInfo.label}
                              </span>
                            )}
                          </div>
                        }
                        <div className="p-6 flex-1 flex flex-col">
                          {item.category && (
                            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
                              {item.category}
                            </span>
                          )}
                          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                            {getTitle(item)}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">
                            {getDescription(item)}
                          </p>

                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {item.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs rounded-full text-gray-500 dark:text-gray-400"
                                >
                                  <Tag className="w-2.5 h-2.5" />
                                  {tag}
                                </span>
                              ))}
                              {item.tags.length > 3 && (
                                <span className="text-xs text-gray-400">
                                  +{item.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-3 mt-auto pt-2 border-t dark:border-gray-800">
                            {item.content && (
                              <details className="group flex-1">
                                <summary className="text-teal-600 dark:text-teal-400 font-semibold cursor-pointer hover:underline text-sm">
                                  Details
                                </summary>
                                <div className="mt-3 text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">
                                  {getContent(item)}
                                </div>
                              </details>
                            )}
                            {item.externalLink && (
                              <a
                                href={item.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 font-semibold text-sm hover:gap-2 transition-all"
                              >
                                View <ExternalLink className="w-3.5 h-3.5" />
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

      <Footer />
    </div>
  );
}
