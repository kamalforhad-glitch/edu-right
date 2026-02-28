"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function OurStory() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "ourStory") as string}
        subtitle={t(language, "backgroundRationale") as string}
      />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t(language, "backgroundRationale")}
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t(language, "educationIsRight")}
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t(language, "erpEmergence")}
            </p>

            <div className="bg-teal-50 dark:bg-teal-900/20 p-8 rounded-xl my-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t(language, "whyERPWasFormed")}
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">
                    •
                  </span>
                  <span>{t(language, "addressPolicyGaps")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">
                    •
                  </span>
                  <span>{t(language, "multiStakeholder")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">
                    •
                  </span>
                  <span>{t(language, "youthParticipation")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">
                    •
                  </span>
                  <span>{t(language, "advocateEducation")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">
                    •
                  </span>
                  <span>{t(language, "bridgeGap")}</span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-12">
              {t(language, "connectionGlobal")}
            </h3>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t(language, "partOfBroader")}
            </p>

            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>• UNESCO&apos;s Education 2030 Framework</li>
              <li>• UN Sustainable Development Goal 4 (Quality Education)</li>
              <li>• The Universal Declaration of Human Rights</li>
              <li>• The Convention on the Rights of the Child</li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl my-8">
              <blockquote className="text-xl italic text-gray-800 dark:text-gray-200">
                &quot;Education is not only a promise but a practiced right. By
                bringing together research, policy, and public participation
                under one inclusive platform, ERP aims to redefine education
                governance as a collaborative social contract between the state
                and its citizens.&quot;
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
