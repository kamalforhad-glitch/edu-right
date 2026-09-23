"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube, Clock } from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function Contact() {
  const { language } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, purpose, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message. Please try again.");
      }
      setSuccess(
        (data?.message as string) ||
          (language === "bn"
            ? "বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।"
            : "Message sent successfully. We will get back to you soon."),
      );
      setName("");
      setEmail("");
      setPurpose("General Inquiry");
      setMessage("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PageHeader
        title={t(language, "contact") as string}
        subtitle={t(language, "getInTouchEmail") as string}
        eyebrow={language === "bn" ? "যোগাযোগ" : "Reach Us"}
        breadcrumbs={[{ label: t(language, "contact") as string }]}
      />

      <section className="py-20 md:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "বার্তা পাঠান" : "Send a Message"}
            title={t(language, "sendUsMessage") as string}
            align="left"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {t(language, "sendUsMessage")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {success && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg text-sm">
                    {success}
                  </div>
                )}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t(language, "nameRequired")}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={100}
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-60"
                    placeholder={t(language, "nameFieldPlaceholder") as string}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t(language, "emailRequired")}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={254}
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-60"
                    placeholder={t(language, "emailPlaceholder") as string}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t(language, "purposeLabel")}
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-60"
                  >
                    <option value="General Inquiry">{t(language, "generalInquiry")}</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Research Collaboration">Research Collaboration</option>
                    <option value="Media Request">Media Request</option>
                    <option value="Join SEJ">Join SEJ</option>
                    <option value="Report an Issue">Report an Issue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t(language, "messageLabel")} *
                  </label>
                  <textarea
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    maxLength={5000}
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-60"
                    placeholder={t(language, "messagePlaceholder") as string}
                  ></textarea>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                    {message.length}/5000
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {language === "bn" ? "পাঠানো হচ্ছে..." : "Sending..."}
                    </>
                  ) : (
                    (t(language, "send") as string)
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="institution-card p-6">
                  <Mail className="w-7 h-7 text-[#0e7c6b] dark:text-teal-300 mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-[#0a2a4a] dark:text-white mb-1">
                    {language === "bn" ? "ইমেইল" : "Email"}
                  </h3>
                  <a href="mailto:contact@sejbd.org" className="text-slate-600 dark:text-slate-300 hover:text-[#0e7c6b] dark:hover:text-teal-300 break-all transition-colors">
                    contact@sejbd.org
                  </a>
                </div>
                <div className="institution-card p-6">
                  <Phone className="w-7 h-7 text-[#0e7c6b] dark:text-teal-300 mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-[#0a2a4a] dark:text-white mb-1">
                    {language === "bn" ? "ফোন" : "Phone"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    +880 1XXX-XXXXXX
                  </p>
                </div>
                <div className="institution-card p-6">
                  <MapPin className="w-7 h-7 text-[#0e7c6b] dark:text-teal-300 mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-[#0a2a4a] dark:text-white mb-1">
                    {language === "bn" ? "অফিস ঠিকানা" : "Office Address"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {language === "bn" ? "ঢাকা, বাংলাদেশ" : "Dhaka, Bangladesh"}
                  </p>
                </div>
                <div className="institution-card p-6">
                  <Clock className="w-7 h-7 text-[#0e7c6b] dark:text-teal-300 mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-[#0a2a4a] dark:text-white mb-1">
                    {language === "bn" ? "অফিস সময়" : "Office Hours"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {language === "bn" ? "রবি – বৃহস্পতি: সকাল ৯টা - বিকাল ৫টা" : "Sun – Thu: 9:00 AM – 5:00 PM"}
                    <br />
                    {language === "bn" ? "শুক্র – শনি: বন্ধ" : "Fri – Sat: Closed"}
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-bold text-[#0a2a4a] dark:text-white mb-4">
                  {language === "bn" ? "সোশ্যাল মিডিয়ায় যুক্ত হোন" : "Connect on Social Media"}
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61566573296753"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors"
                    aria-label="Follow us on Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/society-for-educational-justice/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center text-white transition-colors"
                    aria-label="Follow us on LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.youtube.com/@user-zy6nt8fv6e"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors"
                    aria-label="Subscribe on YouTube"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map — Dhaka, Bangladesh */}
      <section className="section-soft py-20 md:py-24" aria-label="Office location map">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "অবস্থান" : "Find Us"}
            title={language === "bn" ? "ঢাকা, বাংলাদেশ" : "Dhaka, Bangladesh"}
          />
          <div className="institution-card overflow-hidden !p-0">
            <iframe
              title={language === "bn" ? "ঢাকার মানচিত্র" : "Map of Dhaka, Bangladesh"}
              src="https://www.openstreetmap.org/export/embed.html?bbox=90.35%2C23.70%2C90.45%2C23.90&layer=mapnik&marker=23.8103%2C90.4125"
              className="w-full h-[380px] md:h-[440px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <CTASection
        titleEn="Prefer email? We reply within days"
        titleBn="ইমেইল করতে চান? আমরা দ্রুত উত্তর দিই"
        descEn="Write to contact@sejbd.org for partnerships, press, research or membership queries."
        descBn="অংশীদারিত্ব, সংবাদ, গবেষণা বা সদস্যপদ বিষয়ে contact@sejbd.org-এ লিখুন।"
        primaryHref="mailto:contact@sejbd.org"
        primaryEn="Email Us"
        primaryBn="ইমেইল করুন"
      />
      <Footer />
    </div>
  );
}
