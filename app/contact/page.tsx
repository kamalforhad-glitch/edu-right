"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube } from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function Contact() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "contact") as string}
        subtitle={t(language, "getInTouchEmail") as string}
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {t(language, "sendUsMessage")}
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t(language, "nameRequired")}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder={t(language, "nameFieldPlaceholder") as string}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t(language, "emailRequired")}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder={t(language, "emailPlaceholder") as string}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t(language, "purposeLabel")}
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option>{t(language, "generalInquiry")}</option>
                    <option>Partnership</option>
                    <option>Research Collaboration</option>
                    <option>Media Request</option>
                    <option>Join ERP</option>
                    <option>Report an Issue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t(language, "messageLabel")} *
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder={t(language, "messagePlaceholder") as string}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  {t(language, "send")}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {t(language, "contactInformation")}
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-teal-600 dark:text-teal-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      Email
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      educationrightsparliament@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-teal-600 dark:text-teal-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      Phone
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      +880 1XXX-XXXXXX
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-teal-600 dark:text-teal-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      Office Address
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Dhaka, Bangladesh
                      <br />
                      (Address details to be added)
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Connect on Social Media
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61566573296753"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/education-rights-parliament/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.youtube.com/@user-zy6nt8fv6e"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-12 bg-teal-50 dark:bg-teal-900/20 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Office Hours
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Sunday - Thursday: 9:00 AM - 5:00 PM
                  <br />
                  Friday - Saturday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
