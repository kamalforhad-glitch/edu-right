"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
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

export default function ResearchPolicyPage() {
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
        title="Research & Policy"
        subtitle="Evidence-based research to influence education reform and accountability"
      />

      {/* Intro Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              ERP produces evidence-based research to influence education reform
              and accountability. Our work informs policymakers, educators, and
              advocates with data-driven insights.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Briefs & Papers */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Policy Briefs & Research Papers
          </h2>

          {loading ?
            <div className="flex items-center justify-center py-12">
              <div className="w-10 h-10 border-3 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
            </div>
          : items.length === 0 ?
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 dark:text-gray-500">
                No research documents published yet.
              </p>
            </div>
          : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {item.featuredImage ?
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={item.featuredImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  : <div className="h-48 bg-linear-to-br from-teal-500 to-blue-600 flex items-center justify-center">
                      <FileText className="w-20 h-20 text-white opacity-50" />
                    </div>
                  }
                  <div className="p-6">
                    {item.category && (
                      <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                        {item.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold mb-2 mt-1 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                      {item.description}
                    </p>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs px-2 py-0.5 rounded-full"
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
                        className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:underline text-sm"
                      >
                        Download / View <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    : <details>
                        <summary className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-2 cursor-pointer text-sm">
                          Read Summary →
                        </summary>
                        <p className="mt-3 text-xs text-gray-600 dark:text-gray-400 whitespace-pre-line">
                          {item.content}
                        </p>
                      </details>
                    }
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </section>

      {/* Education Right Index */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Education Right Index
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            Interactive data visualization of key education indicators: access,
            gender gap, and financing.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-12 text-center">
            <BarChart3 className="w-24 h-24 text-teal-500 mx-auto mb-6" />
            <p className="text-gray-600 dark:text-gray-400">
              Interactive chart/map will be integrated here
            </p>
          </div>
        </div>
      </section>

      {/* Thematic Research Areas */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Thematic Research Areas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Equity & Access
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ensuring equal opportunities and removing barriers to education
                for all learners.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Governance & Financing
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Education budgeting, decentralization, and institutional reform.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Quality & Learning Outcomes
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Teacher development, curriculum innovation, and assessment
                reforms.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Skills & Lifelong Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Technical, vocational, and adult learning programs.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Laptop className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Digital & Future Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                ICT integration, edtech innovation, and digital transformation.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CloudRain className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Climate & Resilience
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Education in emergencies and climate justice initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call for Collaboration */}
      <section className="py-16 bg-teal-600 dark:bg-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Call for Collaboration</h2>
          <p className="text-xl mb-8 opacity-90">
            Partner with ERP on research, evaluation, or education reform
            projects.
          </p>
          <button className="bg-white text-teal-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Contact Research Team
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
