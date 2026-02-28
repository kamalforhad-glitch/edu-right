"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Target, Eye, Heart, Users, BookOpen, Globe } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function AboutERP() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "aboutERPTitle") as string}
        subtitle={t(language, "aboutERPSubtitle") as string}
      />

      {/* Quick Navigation */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Link
              href="/about-erp/our-story"
              className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition-all text-center"
            >
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-teal-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">
                {t(language, "ourStory")}
              </h3>
            </Link>
            <Link
              href="/about-erp/vision-mission"
              className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition-all text-center"
            >
              <Eye className="w-12 h-12 mx-auto mb-3 text-teal-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">
                {t(language, "visionMission")}
              </h3>
            </Link>
            <Link
              href="/about-erp/objectives"
              className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition-all text-center"
            >
              <Target className="w-12 h-12 mx-auto mb-3 text-teal-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">
                {t(language, "objectives")}
              </h3>
            </Link>
            <Link
              href="/about-erp/governance"
              className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition-all text-center"
            >
              <Users className="w-12 h-12 mx-auto mb-3 text-teal-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">
                {t(language, "governance")}
              </h3>
            </Link>
            <Link
              href="/about-erp/partners"
              className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition-all text-center"
            >
              <Globe className="w-12 h-12 mx-auto mb-3 text-teal-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">
                {t(language, "partners")}
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t(language, "whoWeAre")}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t(language, "educationIsRight")}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t(language, "erpEmergence")}
            </p>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-teal-50 dark:bg-teal-900/20 p-8 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-10 h-10 text-teal-600 dark:text-teal-400" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t(language, "visionTagline")}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t(language, "visionStatement")}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t(language, "tagline")}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
                {t(language, "taglineText")}
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-12 rounded-2xl">
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              {t(language, "coreValuesTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                {
                  icon: Heart,
                  title: "Equity",
                  description: "Ensuring fair access to education for all",
                },
                {
                  icon: Users,
                  title: "Inclusiveness",
                  description: "Embracing diversity in education reform",
                },
                {
                  icon: Target,
                  title: "Quality",
                  description: "Striving for excellence in standards",
                },
                {
                  icon: Globe,
                  title: "Collaboration",
                  description: "Working together for common goals",
                },
                {
                  icon: Eye,
                  title: "Transparency",
                  description: "Maintaining openness and accountability",
                },
              ].map((value, idx) => (
                <div key={idx} className="text-center">
                  <value.icon className="w-12 h-12 mx-auto mb-3 text-teal-600 dark:text-teal-400" />
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            {t(language, "ourScope")}
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              t(language, "educationPolicy"),
              t(language, "curriculumMaterials"),
              t(language, "institutions"),
              t(language, "teacherDevelopment"),
              t(language, "innovations"),
              t(language, "assessment"),
              t(language, "financialEducation"),
              t(language, "administration"),
              t(language, "globalCollaboration"),
              t(language, "youthEmpowerment"),
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-6 bg-linear-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-lg border-l-4 border-teal-600"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-600 text-white font-bold shrink-0 text-sm">
                  ✓
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {item}
                </p>
              </div>
            ))}
            <div className="flex items-start gap-4 p-6 bg-linear-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-lg border-l-4 border-teal-600 md:col-span-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-600 text-white font-bold shrink-0 text-sm">
                ✓
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {t(language, "eliminatingDiscrimination")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* USP */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">
            {t(language, "whatMakesUsUnique")}
          </h3>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            {t(language, "uniqueDescription")}
          </p>
        </div>
      </section>
    </div>
  );
}
