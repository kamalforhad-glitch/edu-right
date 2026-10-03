"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays, ExternalLink, PenLine } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/contexts/LanguageContext";

interface BlogPost {
  id: string;
  title: string;
  titleBn?: string;
  description?: string;
  descriptionBn?: string;
  featuredImage?: string;
  tags?: string[];
  externalLink?: string;
  publishDate?: string;
  category?: string;
}

const PLACEHOLDER_GRADIENTS = [
  ["#0a2a4a", "#0e7c6b", "#b98a1f"],
  ["#0e7c6b", "#14b8a6", "#22d3ee"],
  ["#0a2a4a", "#0e7c6b", "#2563eb"],
  ["#b98a1f", "#f59e0b", "#0e7c6b"],
  ["#1d4ed8", "#0a2a4a", "#14b8a6"],
  ["#059669", "#0f766e", "#0a2a4a"],
];

export default function BlogPageClient() {
  const { language } = useLanguage();
  const bn = language === "bn";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content?type=news&published=true&limit=50")
      .then((res) => res.json())
      .then((data) => {
        const items: BlogPost[] = data.contents || [];
        setPosts(
          [...items].sort((a, b) =>
            new Date(b.publishDate || 0).getTime() -
            new Date(a.publishDate || 0).getTime(),
          ),
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const usedImages = new Set<string>();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={bn ? "ব্লগ" : "Blog"}
        subtitle={
          bn
            ? "শিক্ষা অধিকার, নীতি সংস্কার ও প্রচারণা নিয়ে আমাদের লেখা, চিন্তা ও মাঠের অভিজ্ঞতা"
            : "Our writing, thinking and field notes on education rights, policy reform and advocacy"
        }
        eyebrow={bn ? "ব্লগ ও বিশ্লেষণ" : "Blog & Insights"}
        breadcrumbs={[{ label: bn ? "ব্লগ" : "Blog" }]}
      />

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
            </div>
          ) : posts.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-14 px-6 rounded-2xl border border-dashed border-slate-300 dark:border-white/15">
              <PenLine className="w-10 h-10 mx-auto mb-4 text-slate-300 dark:text-slate-600" aria-hidden="true" />
              <p className="font-semibold text-slate-600 dark:text-slate-300">
                {bn ? "এখনো কোনো ব্লগ পোস্ট প্রকাশিত হয়নি।" : "No blog posts published yet."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => {
                const title = bn && post.titleBn ? post.titleBn : post.title;
                const description =
                  bn && post.descriptionBn ? post.descriptionBn : post.description;
                const href = post.externalLink || "#";

                const image =
                  post.featuredImage && !usedImages.has(post.featuredImage) ?
                    post.featuredImage
                  : null;
                if (image) usedImages.add(image);

                return (
                  <a
                    key={post.id}
                    href={href}
                    target={post.externalLink ? "_blank" : undefined}
                    rel={post.externalLink ? "noopener noreferrer" : undefined}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-gray-700">
                      {image ?
                        <Image
                          src={image}
                          alt={title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      : <div
                          aria-hidden="true"
                          className="absolute inset-0 animate-gradient-mesh"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${PLACEHOLDER_GRADIENTS[
                              idx % PLACEHOLDER_GRADIENTS.length
                            ].join(", ")})`,
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                              <PenLine className="w-7 h-7 text-white/90" />
                            </span>
                          </div>
                          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-xl animate-float" />
                          <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-white/10 blur-xl animate-float-alt" />
                        </div>
                      }
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#0e7c6b] dark:text-teal-300 mb-3">
                        <CalendarDays className="w-4 h-4" aria-hidden="true" />
                        {post.publishDate
                          ? new Date(post.publishDate).toLocaleDateString(bn ? "bn-BD" : "en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : ""}
                        {post.category && (
                          <span className="ml-auto px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-medium">
                            {post.category}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold leading-snug text-gray-900 dark:text-white mb-3 group-hover:text-[#0e7c6b] dark:group-hover:text-teal-300 transition-colors">
                        {title}
                      </h2>
                      {description && (
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3 mb-4">
                          {description}
                        </p>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-xs font-medium text-teal-700 dark:text-teal-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#0e7c6b] dark:text-teal-300">
                        {bn ? "পড়ুন" : "Read Post"}
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
