"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { Database, Scale, BookOpen, Image as ImageIcon } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title="Resources"
        subtitle="Tools, data, and materials for education advocacy and research"
      />

      {/* Resource Categories */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-10 h-10 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Data Portal
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Education statistics and indicators
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Legal Frameworks
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Education laws and policies
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Learning Materials
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Toolkits and handbooks
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Multimedia
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Photos, videos, infographics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Data Portal */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Education Data Portal
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            Downloadable datasets, interactive charts, and comprehensive
            dashboards on education access, quality, and outcomes.
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-12 text-center shadow-lg">
            <Database className="w-24 h-24 text-teal-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Interactive Data Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Explore key education indicators: enrollment rates, gender parity,
              budget allocation, learning outcomes, and more.
            </p>
            <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors">
              Launch Data Portal
            </button>
          </div>
        </div>
      </section>

      {/* Legal Frameworks */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Legal Frameworks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Bangladesh Education Laws
              </h3>
              <ul className="space-y-3">
                {[
                  "Compulsory Primary Education Act, 1990",
                  "Primary Education (Amendment) Act, 2013",
                  "National Education Policy, 2010",
                  "Children Act, 2013",
                ].map((law, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-1 shrink-0" />
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      {law}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                International Frameworks
              </h3>
              <ul className="space-y-3">
                {[
                  "Universal Declaration of Human Rights (Article 26)",
                  "Convention on the Rights of the Child",
                  "Sustainable Development Goal 4 (Quality Education)",
                  "Incheon Declaration and Framework for Action",
                ].map((law, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      {law}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Materials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Learning Materials & Toolkits
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
              <div className="h-32 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-16 h-16 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Advocacy Toolkit
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Step-by-step guide for grassroots education advocacy campaigns
                and community mobilization.
              </p>
              <button className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                Download PDF →
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
              <div className="h-32 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Policy Handbook
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Comprehensive guide to education policy analysis, formulation,
                and monitoring processes.
              </p>
              <button className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                Download PDF →
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
              <div className="h-32 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-16 h-16 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Research Methods Guide
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Introduction to education research methodologies and data
                collection techniques.
              </p>
              <button className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                Download PDF →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Multimedia Gallery */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Multimedia Gallery
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden hover:opacity-75 transition-opacity cursor-pointer"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="text-teal-600 dark:text-teal-400 font-bold hover:underline">
              View Full Gallery →
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
