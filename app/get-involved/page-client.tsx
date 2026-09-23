"use client";

import { useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import {
  Users,
  Heart,
  HandHeart,
  GraduationCap,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";

export default function GetInvolvedPage() {
  const { language } = useLanguage();
  const formRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topicArea, setTopicArea] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          topic_area: topicArea,
          message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Failed to submit. Please try again.");
      }
      setSuccess(
        (data?.message as string) ||
          (t(language, "giSuccess") as string),
      );
      setName("");
      setEmail("");
      setTopicArea("");
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
        title={t(language, "giTitle") as string}
        subtitle={t(language, "giSubtitle") as string}
        eyebrow={language === "bn" ? "যোগ দিন" : "Join Us"}
        breadcrumbs={[{ label: t(language, "giTitle") as string }]}
      />

      {/* Get Involved Options — high-contrast institutional cards */}
      <section className="py-20 md:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Volunteer / Internship */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-navy p-8 md:p-10 rounded-[1.5rem] text-white shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0e7c6b] via-[#b98a1f] to-[#0e7c6b]" aria-hidden="true" />
              <HandHeart className="w-14 h-14 mb-6 text-[#e8c96a]" aria-hidden="true" />
              <h2 className="font-display text-3xl font-semibold mb-4" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                {t(language, "giVolunteer") as string}
              </h2>
              <p className="text-lg mb-6 text-white/85 leading-relaxed">
                {t(language, "giVolunteerDesc") as string}
              </p>
              <ul className="space-y-2.5 mb-8 text-white/85">
                {(t(language, "giVolunteerRoles") as unknown as string[]).map((role) => (
                  <li key={role} className="flex items-start gap-2.5">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#e8c96a] shrink-0" aria-hidden="true" />
                    {role}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToForm}
                className="bg-white text-[#0a2a4a] px-8 py-3.5 rounded-xl font-bold hover:bg-[#e8c96a] hover:text-[#0a2a4a] transition-colors shadow-lg"
              >
                {t(language, "giVolunteerBtn") as string}
              </button>
            </motion.div>

            {/* Donate / Partner */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-gray-900 border-2 border-[#0a2a4a]/10 dark:border-white/10 p-8 md:p-10 rounded-[1.5rem] shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#b98a1f] via-[#0e7c6b] to-[#b98a1f]" aria-hidden="true" />
              <Heart className="w-14 h-14 mb-6 text-[#0e7c6b] dark:text-teal-300" aria-hidden="true" />
              <h2 className="font-display text-3xl font-semibold mb-4 text-[#0a2a4a] dark:text-white" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                {t(language, "giDonate") as string}
              </h2>
              <p className="text-lg mb-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                {t(language, "giDonateDesc") as string}
              </p>
              <ul className="space-y-2.5 mb-8 text-slate-600 dark:text-slate-300">
                {(t(language, "giDonatePoints") as unknown as string[]).map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#b98a1f] shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToForm}
                className="bg-[#0a2a4a] hover:bg-[#0e7c6b] text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg"
              >
                {t(language, "giDonateBtn") as string}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Youth Network */}
      <section className="section-soft py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "যুব" : "Youth"}
            title={t(language, "giYouthTitle") as string}
            description={t(language, "giYouthDesc") as string}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, titleKey: "giClubs", descKey: "giClubsDesc", btnKey: "giClubsBtn" },
              { icon: MessageSquare, titleKey: "giDebates", descKey: "giDebatesDesc", btnKey: "giDebatesBtn" },
              { icon: GraduationCap, titleKey: "giMentor", descKey: "giMentorDesc", btnKey: "giMentorBtn" },
            ].map((card, i) => (
              <motion.div
                key={card.titleKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="institution-card p-8 text-center flex flex-col"
              >
                <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <card.icon className="w-8 h-8 text-[#0e7c6b] dark:text-teal-300" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-[#0a2a4a] dark:text-white" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                  {t(language, card.titleKey as never) as string}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-5 text-[15px] leading-relaxed flex-1">
                  {t(language, card.descKey as never) as string}
                </p>
                <button
                  onClick={scrollToForm}
                  className="text-[#0e7c6b] dark:text-teal-300 font-bold hover:underline"
                >
                  {t(language, card.btnKey as never) as string} →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Dialogue Form */}
      <section ref={formRef} className="py-20 md:py-24 bg-white dark:bg-gray-950 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "মতামত" : "Your Voice"}
            title={t(language, "giShareTitle") as string}
            description={t(language, "giShareDesc") as string}
          />

          <form
            onSubmit={handleSubmit}
            className="institution-card p-8 md:p-10"
            noValidate
          >
            <div className="space-y-6">
              {success && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg text-sm" role="status">
                  {success}
                </div>
              )}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg text-sm" role="alert">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="gi-name" className="block text-sm font-bold mb-2 text-[#0a2a4a] dark:text-white">
                    {t(language, "giName") as string}
                  </label>
                  <input
                    id="gi-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={100}
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-white/15 rounded-xl bg-white dark:bg-white/5 text-slate-900 dark:text-white disabled:opacity-60 focus:border-[#0e7c6b]"
                    placeholder={t(language, "giNamePh") as string}
                  />
                </div>
                <div>
                  <label htmlFor="gi-email" className="block text-sm font-bold mb-2 text-[#0a2a4a] dark:text-white">
                    {t(language, "giEmail") as string}
                  </label>
                  <input
                    id="gi-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={254}
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-white/15 rounded-xl bg-white dark:bg-white/5 text-slate-900 dark:text-white disabled:opacity-60 focus:border-[#0e7c6b]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gi-topic" className="block text-sm font-bold mb-2 text-[#0a2a4a] dark:text-white">
                  {t(language, "giTopic") as string}
                </label>
                <select
                  id="gi-topic"
                  value={topicArea}
                  onChange={(e) => setTopicArea(e.target.value)}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-white/15 rounded-xl bg-white dark:bg-gray-900 text-slate-900 dark:text-white disabled:opacity-60 focus:border-[#0e7c6b]"
                >
                  <option value="">{t(language, "giTopicPh") as string}</option>
                  <option value="Access & Equity">Access & Equity</option>
                  <option value="Quality & Learning">Quality & Learning</option>
                  <option value="Budget & Financing">Budget & Financing</option>
                  <option value="Teacher Development">Teacher Development</option>
                  <option value="Digital Learning">Digital Learning</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="gi-message" className="block text-sm font-bold mb-2 text-[#0a2a4a] dark:text-white">
                  {t(language, "giMessage") as string}
                </label>
                <textarea
                  id="gi-message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  maxLength={10000}
                  disabled={submitting}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-white/15 rounded-xl bg-white dark:bg-white/5 text-slate-900 dark:text-white disabled:opacity-60 focus:border-[#0e7c6b]"
                  placeholder={t(language, "giMessagePh") as string}
                ></textarea>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-right">
                  {message.length}/10000
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#0a2a4a] hover:bg-[#0e7c6b] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                    {t(language, "giSubmitting") as string}
                  </>
                ) : (
                  t(language, "giSubmit") as string
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Ways to Support */}
      <section className="section-navy py-20 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0e7c6b] via-[#b98a1f] to-[#0e7c6b]" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "সহায়তা" : "Support"}
            title={t(language, "giSupportTitle") as string}
            tone="dark"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { emoji: "📢", titleKey: "giSpread", descKey: "giSpreadDesc" },
              { emoji: "✍️", titleKey: "giWrite", descKey: "giWriteDesc" },
              { emoji: "🤝", titleKey: "giCorporate", descKey: "giCorporateDesc" },
              { emoji: "🎓", titleKey: "giAcademic", descKey: "giAcademicDesc" },
            ].map((item) => (
              <div key={item.titleKey} className="text-center">
                <div className="text-5xl mb-3" aria-hidden="true">{item.emoji}</div>
                <h3 className="font-bold mb-2 text-white">{t(language, item.titleKey as never) as string}</h3>
                <p className="text-sm text-white/75">
                  {t(language, item.descKey as never) as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        titleEn="Ready to get involved?"
        titleBn="যুক্ত হতে প্রস্তুত?"
        descEn="Fill the form above or write to us — our team will guide your next step."
        descBn="উপরের ফর্মটি পূরণ করুন বা আমাদের লিখুন — আমাদের দল আপনার পরবর্তী ধাপে সাহায্য করবে।"
        primaryHref="/contact"
        primaryEn="Contact Us"
        primaryBn="যোগাযোগ করুন"
      />

      <Footer />
    </div>
  );
}
