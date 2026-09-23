"use client";

import { Navbar } from "@/components/Navbar";
import { ParallaxSection } from "@/components/ParallaxSection";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Handshake,
  TrendingUp,
  Megaphone,
  Network,
  Users as UsersIcon,
  Presentation,
  Newspaper,
  Calendar,
  ArrowRight,
  GraduationCap,
  FlaskConical,
  Scale,
  FileText,
  Landmark,
  FolderKanban,
  Download,
  CheckCircle2,
} from "lucide-react";

function useInView(ref: React.RefObject<HTMLElement | null>, options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);
  return isInView;
}

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  const formatted = count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 0)},${String(count % 1000).padStart(3, "0")}` : String(count);
  return <div ref={ref}>{formatted}{suffix}</div>;
}

// Splits a headline into lead + gradient-highlighted tail (last 3 words).
// In Bengali mode, uses the elegant Bengali serif at semibold for balance.
function Headline({ title, bengali = false }: { title: string; bengali?: boolean }) {
  const words = title.split(" ");
  const lead = words.slice(0, -3).join(" ");
  const highlight = words.slice(-3).join(" ");
  if (bengali) {
    return (
      <span className="hero-title-bn">
        {lead}
        <br />
        <span className="bg-gradient-to-r from-[#0e7c6b] via-blue-700 to-[#0a2a4a] dark:from-teal-300 dark:via-blue-300 dark:to-[#e8c96a] bg-clip-text text-transparent animate-gradient-mesh bg-[length:300%_300%]">
          {highlight}
        </span>
      </span>
    );
  }
  return (
    <>
      {lead}
      <br />
      <span className="bg-gradient-to-r from-[#0e7c6b] via-blue-700 to-[#0a2a4a] dark:from-teal-300 dark:via-blue-300 dark:to-[#e8c96a] bg-clip-text text-transparent animate-gradient-mesh bg-[length:300%_300%]">
        {highlight}
      </span>
    </>
  );
}

// Static floating particles (fixed positions to avoid hydration mismatch)
const HERO_PARTICLES = [
  { left: "6%", top: "18%", size: 6, delay: "0s", duration: "7s", color: "bg-teal-400/60" },
  { left: "12%", top: "68%", size: 4, delay: "1.2s", duration: "8s", color: "bg-blue-400/60" },
  { left: "22%", top: "32%", size: 5, delay: "2s", duration: "6s", color: "bg-violet-400/50" },
  { left: "38%", top: "12%", size: 4, delay: "0.6s", duration: "9s", color: "bg-cyan-400/60" },
  { left: "47%", top: "78%", size: 6, delay: "3s", duration: "7s", color: "bg-teal-300/50" },
  { left: "58%", top: "22%", size: 5, delay: "1.6s", duration: "8s", color: "bg-blue-300/60" },
  { left: "66%", top: "62%", size: 4, delay: "2.4s", duration: "6.5s", color: "bg-emerald-400/50" },
  { left: "74%", top: "14%", size: 6, delay: "0.9s", duration: "7.5s", color: "bg-teal-400/50" },
  { left: "82%", top: "44%", size: 4, delay: "3.4s", duration: "8.5s", color: "bg-violet-300/60" },
  { left: "90%", top: "72%", size: 5, delay: "1.9s", duration: "7s", color: "bg-blue-400/50" },
  { left: "30%", top: "52%", size: 3, delay: "2.8s", duration: "9s", color: "bg-cyan-300/60" },
  { left: "52%", top: "42%", size: 3, delay: "0.3s", duration: "6s", color: "bg-teal-300/60" },
];

export default function Home() {
  const { language } = useLanguage();

  const heroStats = [
    {
      icon: GraduationCap,
      target: 10000,
      labelEn: "Learners Impacted",
      labelBn: "শিক্ষার্থী উপকৃত",
      accent: "text-teal-600 dark:text-teal-400",
      chip: "bg-teal-500/10",
    },
    {
      icon: FlaskConical,
      target: 50,
      labelEn: "Research Initiatives",
      labelBn: "গবেষণা উদ্যোগ",
      accent: "text-blue-600 dark:text-blue-400",
      chip: "bg-blue-500/10",
    },
    {
      icon: Users,
      target: 100,
      labelEn: "Community Programs",
      labelBn: "কমিউনিটি প্রোগ্রাম",
      accent: "text-amber-600 dark:text-amber-400",
      chip: "bg-amber-500/10",
    },
    {
      icon: Scale,
      target: 28,
      labelEn: "Policy Dialogues",
      labelBn: "নীতি সংলাপ",
      accent: "text-emerald-600 dark:text-emerald-400",
      chip: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar />

      {/* Hero Section - Premium Cinematic */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-950">
        {/* Premium gradient mesh background */}
        <div className="absolute inset-0 bg-linear-to-br from-teal-50 via-blue-50/80 to-violet-50 dark:from-gray-950 dark:via-[#0b1e2b] dark:to-[#141031] animate-gradient-mesh"></div>

        {/* Soft teal/blue ambient glow */}
        <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] bg-teal-400/25 dark:bg-teal-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -right-40 w-[38rem] h-[38rem] bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-3xl animate-float-alt"></div>
        <div className="absolute bottom-0 left-1/3 w-[28rem] h-[28rem] bg-[#b98a1f]/15 dark:bg-[#b98a1f]/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>

        {/* Radial glow accents */}
        <div className="absolute inset-0 opacity-60 dark:opacity-40" style={{
          background: "radial-gradient(ellipse 60% 45% at 18% 30%, rgba(20,184,166,0.16) 0%, transparent 70%), radial-gradient(ellipse 55% 45% at 85% 25%, rgba(59,130,246,0.14) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 55% 90%, rgba(185,138,31,0.12) 0%, transparent 70%)"
        }}></div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {HERO_PARTICLES.map((p, i) => (
            <span
              key={i}
              className={`absolute rounded-full blur-[1px] animate-float ${p.color}`}
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        {/* Faint dotted texture */}
        <div className="absolute inset-0 opacity-[0.35] dark:opacity-20 pointer-events-none" aria-hidden="true" style={{
          backgroundImage: "radial-gradient(rgba(20,184,166,0.25) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 75%)",
        }}></div>

        {/* min-h accounts for sticky navbar in flow + comfortable clearance */}
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-14 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center lg:min-h-[calc(100vh-7rem)]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className={
                  language === "bn"
                    ? "hero-h1-bn text-[2rem] sm:text-5xl md:text-6xl xl:text-[3.9rem] font-semibold text-gray-900 dark:text-white mb-5 max-w-[650px] mx-auto lg:mx-0"
                    : "text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl xl:text-[5.25rem] font-extrabold tracking-tight text-gray-900 dark:text-white mb-5 text-balance"
                }
              >
                <Headline title={t(language, "heroTitle") as string} bengali={language === "bn"} />
              </motion.h1>

              {/* Animated gradient line below title */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="origin-left w-32 h-1.5 bg-gradient-to-r from-[#0e7c6b] via-blue-600 to-[#b98a1f] rounded-full mb-7 lg:mx-0 mx-auto animate-gradient-mesh bg-[length:300%_300%]"
              ></motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200 mb-5 leading-relaxed"
              >
                {t(language, "heroSubtitle")}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                {t(language, "heroDescription")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-14"
              >
                <Link
                  href="/research-policy"
                  className="group relative overflow-hidden bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600 hover:from-teal-500 hover:via-teal-500 hover:to-blue-500 text-white pl-8 pr-7 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_10px_36px_rgba(20,184,166,0.45)] hover:shadow-[0_14px_44px_rgba(20,184,166,0.6)] hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
                >
                  {/* shine sweep */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden="true" />
                  <span className="relative">{t(language, "exploreResearch")}</span>
                  <ArrowRight className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/get-involved"
                  className="group glass hover:bg-white/90 dark:hover:bg-white/10 text-teal-700 dark:text-teal-300 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-[0_10px_32px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 border-teal-500/20"
                >
                  {t(language, "joinSEJ")}
                  <span className="w-2 h-2 rounded-full bg-teal-500 transition-transform duration-300 group-hover:scale-125" aria-hidden="true" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Visual — Premium Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-[520px] flex items-center justify-center self-center"
            >
              <div className="relative w-full flex items-center justify-center -translate-y-5">
              {/* Ambient glow behind card */}
              <div className="absolute -inset-8 bg-gradient-to-br from-teal-400/30 via-blue-500/25 to-[#b98a1f]/25 rounded-[2.5rem] blur-3xl pointer-events-none" aria-hidden="true"></div>
              {/* Decorative rings */}
              <div className="absolute -top-12 -right-8 w-56 h-56 border-[3px] border-teal-300/50 dark:border-teal-500/30 rounded-full animate-float pointer-events-none" aria-hidden="true"></div>
              <div className="absolute -bottom-12 -left-8 w-40 h-40 border-[3px] border-blue-300/50 dark:border-blue-500/30 rounded-full animate-float-alt pointer-events-none" aria-hidden="true"></div>

              {/* Floating glass card with gradient border */}
              <div className="relative w-full animate-float" style={{ animationDuration: "7s" }}>
                <div className="gradient-border rounded-[1.75rem] p-[2px] shadow-[0_28px_64px_-20px_rgba(10,42,74,0.4)] dark:shadow-[0_28px_64px_-20px_rgba(20,184,166,0.3)]">
                  <div className="relative rounded-[calc(1.75rem-2px)] overflow-hidden bg-white dark:bg-gray-900">
                    <Image
                      src="/new/04.jpg"
                      alt="Youth participants engaged in educational justice and learning"
                      width={640}
                      height={400}
                      className="w-full h-auto object-cover aspect-[16/10] transition-transform duration-700 hover:scale-[1.03]"
                      priority
                    />
                    {/* Bottom glass caption */}
                    <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl px-5 py-3.5 flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 text-white shrink-0 shadow-lg">
                        <GraduationCap className="w-5 h-5" />
                      </span>
                      <div className="text-left">
                        <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                          {language === "bn" ? "শিক্ষা ন্যায়বিচারের জন্য যুব নেতৃত্ব" : "Youth Leading Education Justice"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {language === "bn" ? "সারা বাংলাদেশে" : "Across Bangladesh"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-auto" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 C240,20 480,80 720,50 C960,20 1200,80 1440,50 L1440,100 L0,100 Z" fill="currentColor" className="text-gray-50 dark:text-gray-800" />
          </svg>
        </div>
      </section>

      {/* Parallax Scrolling Section */}
      <ParallaxSection
        imageSrc="/new/02.jpg"
        height="70vh"
        overlayOpacity={0.4}
      />

      {/* About SEJ — Storytelling */}
      <section className="py-24 md:py-32 bg-white dark:bg-gray-950 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "আমাদের সম্পর্কে" : "About SEJ"}
            title={t(language, "aboutTitle") as string}
            description={t(language, "aboutDescription") as string}
          />

          {/* Storytelling: image + text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-teal-500/15 to-[#b98a1f]/15 rounded-[2rem] blur-2xl" aria-hidden="true" />
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10">
                <Image
                  src="/new/02.jpg"
                  alt="SEJ community dialogue on education rights"
                  width={640}
                  height={440}
                  className="w-full h-auto object-cover aspect-[3/2]"
                />
              </div>
              <div className="absolute -bottom-6 left-6 right-6 sm:left-8 sm:right-auto glass rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-[#0a2a4a] text-[#e8c96a] flex items-center justify-center font-display font-bold text-lg shrink-0" aria-hidden="true">
                  {language === "bn" ? "২৮+" : "28+"}
                </span>
                <p className="text-sm font-semibold text-slate-800 dark:text-white leading-snug">
                  {language === "bn" ? "জেলায় কমিউনিটি সংলাপ" : "Districts with community dialogues"}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-[#0a2a4a] dark:text-white mb-5" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                {language === "bn" ? "গবেষণা থেকে নীতি, সংলাপ থেকে সংস্কার" : "From research to policy, from dialogue to reform"}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-7">
                {t(language, "visionText") as string}
              </p>
              <ul className="space-y-4 mb-9">
                {[
                  t(language, "policyResearch") as string,
                  t(language, "publicDialogue") as string,
                  t(language, "advocacyCampaigns") as string,
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-6 h-6 text-[#0e7c6b] dark:text-teal-400 shrink-0" aria-hidden="true" />
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about-sej"
                className="group inline-flex items-center gap-2 bg-[#0a2a4a] hover:bg-[#0e7c6b] text-white px-7 py-3.5 rounded-xl font-bold transition-colors shadow-lg"
              >
                {language === "bn" ? "SEJ সম্পর্কে আরও জানুন" : "More About SEJ"}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          {/* People • Policy • Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Users, title: t(language, "people") as string, text: language === "bn" ? "তরুণ, শিক্ষক ও নাগরিকদের প্ল্যাটফর্ম" : "A platform of youth, educators & citizens" },
              { icon: Handshake, title: t(language, "policy") as string, text: language === "bn" ? "প্রমাণ-ভিত্তিক নীতি সংলাপ" : "Evidence-based policy dialogue" },
              { icon: TrendingUp, title: t(language, "progress") as string, text: language === "bn" ? "পরিমাপযোগ্য শিক্ষা সংস্কার" : "Measurable education reform" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="institution-card p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-[#0e7c6b] dark:text-teal-300" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#0a2a4a] dark:text-white mb-2" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact — Institutional Dashboard */}
      <section className="section-soft py-24 md:py-32" aria-label="Our impact">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "আমাদের প্রভাব" : "Our Impact"}
            title={language === "bn" ? "পরিমাপযোগ্য পরিবর্তন" : "Change you can measure"}
            description={
              language === "bn"
                ? "গবেষণা, সংলাপ ও কমিউনিটি কর্মসূচির মাধ্যমে বাংলাদেশের শিক্ষা ব্যবস্থায় বাস্তব অগ্রগতি।"
                : "Real progress in Bangladesh's education system — through research, dialogue and community programs."
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.labelEn}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="institution-card p-8 text-center"
              >
                <span className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${stat.chip} ${stat.accent} mb-5`}>
                  <stat.icon className="w-7 h-7" aria-hidden="true" />
                </span>
                <div className={`text-4xl md:text-[2.75rem] font-extrabold tracking-tight ${stat.accent}`}>
                  <AnimatedCounter target={stat.target} suffix="+" />
                </div>
                <p className="mt-2 font-semibold text-slate-700 dark:text-slate-300">
                  {language === "bn" ? stat.labelBn : stat.labelEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The SEJ Stories Section */}
      <section className="section-xl py-20 bg-gray-900 dark:bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 uppercase tracking-wide text-white">
            {t(language, "impactStories")}
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            {language === "bn"
              ? "আমাদের উদ্যোগের মাধ্যমে শিক্ষায় পরিবর্তন, প্রভাব ও রূপান্তরের বাস্তব গল্প"
              : "Real stories of change, impact, and transformation in education through our initiatives"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Story 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="group relative overflow-hidden rounded-lg shadow-xl bg-gray-800 h-80"
            >
              <Image
                src="/sej/photo_2025-10-23_21-12-03 (2).jpg"
                alt="Community Engagement"
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Community Engagement
                  </h3>
                  <p className="text-sm text-gray-300">
                    Bringing education to grassroots communities
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Story 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative overflow-hidden rounded-lg shadow-xl bg-gray-800 h-80"
            >
              <Image
                src="/sej/photo_2025-10-23_21-12-03 (3).jpg"
                alt="Youth Leadership"
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Youth Leadership</h3>
                  <p className="text-sm text-gray-300">
                    Empowering the next generation of education advocates
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Story 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative overflow-hidden rounded-lg shadow-xl bg-gray-800 h-80"
            >
              <Image
                src="/sej/photo_2025-10-23_21-12-01 (2).jpg"
                alt="Policy Dialogue"
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Policy Dialogue</h3>
                  <p className="text-sm text-gray-300">
                    Shaping education policy through constructive dialogue
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Story 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative overflow-hidden rounded-lg shadow-xl bg-gray-800 h-80"
            >
              <Image
                src="/sej/photo_2025-10-23_21-12-02 (2).jpg"
                alt="Teacher Training"
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Teacher Training</h3>
                  <p className="text-sm text-gray-300">
                    Building capacity for quality education delivery
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Story 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group relative overflow-hidden rounded-lg shadow-xl bg-gray-800 h-80"
            >
              <Image
                src="/sej/photo_2025-10-23_21-12-03 (4).jpg"
                alt="Student Voices"
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Student Voices</h3>
                  <p className="text-sm text-gray-300">
                    Amplifying student perspectives in education reform
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Story 6 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group relative overflow-hidden rounded-lg shadow-xl bg-gray-800 h-80"
            >
              <Image
                src="/sej/photo_2025-10-23_21-12-04 (2).jpg"
                alt="Research & Innovation"
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Research & Innovation
                  </h3>
                  <p className="text-sm text-gray-300">
                    Evidence-based approaches to education challenges
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link
              href="/news-publications"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {language === "bn" ? "সব গল্প দেখুন" : "View All Stories"}
            </Link>
          </div>
        </div>
      </section>

      {/* Key Initiatives Section */}
      <section className="py-24 md:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "মূল উদ্যোগ" : "Key Initiatives"}
            title={t(language, "keyInitiativesTitle") as string}
            description={t(language, "keyInitiativesDescription") as string}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center shrink-0">
                <Megaphone className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t(language, "policyAdvocacy")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t(language, "policyAdvocacyDesc")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center shrink-0">
                <Network className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t(language, "policyNetworksTitle")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t(language, "policyNetworksDescription")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center shrink-0">
                <Presentation className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t(language, "annualConferenceTitle")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  The SEJ Future of State Conference brings together
                  professionals and students.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center shrink-0">
                <UsersIcon className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  SEJ Fellowship
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Bringing talented minds together on a common platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs — Institutional Cards */}
      <section className="section-soft py-24 md:py-28" aria-label="Programs">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "কর্মসূচি" : "Programs"}
            title={language === "bn" ? "আমাদের কর্মসূচি" : "Our Programs"}
            description={
              language === "bn"
                ? "গবেষণা, অ্যাডভোকেসি, নাগরিক সংলাপ ও মাঠ কর্মসূচি — শিক্ষা সংস্কারের চারটি স্তম্ভ।"
                : "Four pillars of education reform — research, advocacy, civic dialogue and field programs."
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FileText,
                title: t(language, "research") as string,
                text: language === "bn" ? "প্রমাণ-ভিত্তিক গবেষণা ও নীতি সংক্ষিপ্ত" : "Evidence-based research & policy briefs",
                href: "/research-policy",
              },
              {
                icon: Megaphone,
                title: t(language, "advocacy") as string,
                text: language === "bn" ? "প্রচারণা ও নাগরিক সম্পৃক্ততা" : "Campaigns & civic engagement",
                href: "/advocacy-engagement",
              },
              {
                icon: Landmark,
                title: t(language, "parliament") as string,
                text: language === "bn" ? "নীতিনির্ধারণে নাগরিক কণ্ঠস্বর" : "Citizen voice in policymaking",
                href: "/parliament-platform",
              },
              {
                icon: FolderKanban,
                title: t(language, "projects") as string,
                text: language === "bn" ? "মাঠ পর্যায়ের কর্মসূচি ও উদ্যোগ" : "Field programs & initiatives",
                href: "/projects-initiatives",
              },
            ].map((program, i) => (
              <motion.div
                key={program.href}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
              >
                <Link href={program.href} className="institution-card group flex flex-col h-full p-8" aria-label={program.title}>
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0a2a4a] text-[#e8c96a] mb-6 group-hover:bg-[#0e7c6b] group-hover:text-white transition-colors">
                    <program.icon className="w-7 h-7" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[#0a2a4a] dark:text-white mb-2" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                    {program.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed flex-1">
                    {program.text}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#0e7c6b] dark:text-teal-300">
                    {language === "bn" ? "আরও জানুন" : "Learn more"}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Happening Section */}
      <section className="section-xl py-20 bg-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block mb-4">
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {language === "bn" ? "সাম্প্রতিক আপডেট" : "Latest Updates"}
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-2 uppercase tracking-wide">
            What&apos;s Happening at SEJ?
          </h2>
          <div className="w-24 h-1.5 bg-white/50 mx-auto mb-12 rounded-full"></div>

          <div className="scroll-container gap-6 pb-4 snap-x snap-mandatory">
            <div className="min-w-[300px] md:min-w-[380px] snap-start flex-shrink-0 bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <Newspaper className="w-10 h-10 text-white/80 mb-4" />
              <h3 className="text-xl font-bold mb-2">Latest News</h3>
              <p className="text-white/90">Stay updated with our recent activities</p>
            </div>
            <div className="min-w-[300px] md:min-w-[380px] snap-start flex-shrink-0 bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <Calendar className="w-10 h-10 text-white/80 mb-4" />
              <h3 className="text-xl font-bold mb-2">Upcoming Events</h3>
              <p className="text-white/90">Join us in our conferences</p>
            </div>
            <div className="min-w-[300px] md:min-w-[380px] snap-start flex-shrink-0 bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <Users className="w-10 h-10 text-white/80 mb-4" />
              <h3 className="text-xl font-bold mb-2">Get Involved</h3>
              <p className="text-white/90">Become a part of our community</p>
            </div>
            <div className="min-w-[300px] md:min-w-[380px] snap-start flex-shrink-0 bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <Megaphone className="w-10 h-10 text-white/80 mb-4" />
              <h3 className="text-xl font-bold mb-2">Volunteer</h3>
              <p className="text-white/90">Contribute your time and skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEJ in the Media Section - Redesigned */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header with Icon */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-teal-600 dark:text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-3 uppercase tracking-wider">
              {language === "bn" ? "মিডিয়া কভারেজ" : "Media Coverage"}
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              SEJ in the Media
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our work is making headlines. See how leading news outlets are
              covering our advocacy for education reform.
            </p>
          </div>

          {/* Stats Banner */}

          {/* Featured Story - Large Card */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-teal-600 rounded-full"></span>
              {language === "bn" ? "বিশিষ্ট কভারেজ" : "Featured Coverage"}
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left - Content */}
                <div className="p-10 bg-white dark:bg-gray-800">
                  <div className="inline-block mb-6">
                    <span className="bg-teal-100 dark:bg-teal-900/30 px-4 py-2 text-sm font-bold rounded-full text-teal-700 dark:text-teal-300">
                      {language === "bn" ? "বিশিষ্ট নিবন্ধ" : "Featured Article"}
                    </span>
                  </div>
                  <h4 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                    Inclusion of July Uprising in Textbook Demanded
                  </h4>
                  <p className="text-lg leading-relaxed mb-8 text-gray-700 dark:text-gray-300">
                    SOCIETY FOR EDUCATIONAL JUSTICE organized a landmark roundtable
                    discussion with student leaders, educationists, and families
                    of July Uprising victims at the National Academy for
                    Educational Management. The event called for crucial
                    curriculum reforms and the inclusion of July Uprising
                    heroism in textbooks.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="bg-teal-100 dark:bg-teal-900/30 px-3 py-1 rounded-full text-sm text-teal-700 dark:text-teal-300">
                      Education Reform
                    </span>
                    <span className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-sm text-blue-700 dark:text-blue-300">
                      Policy Advocacy
                    </span>
                    <span className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full text-sm text-purple-700 dark:text-purple-300">
                      National Impact
                    </span>
                  </div>
                  <a
                    href="https://www.newagebd.net/post/country/250470/inclusion-of-july-uprising-in-textbook-demanded"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-teal-600 text-white hover:bg-teal-700 px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    Read Full Article
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </div>

                {/* Right - Image */}
                <div className="relative h-full min-h-[400px] lg:min-h-0">
                  <Image
                    src="/sej/photo_2025-10-23_21-12-03 (2).jpg"
                    alt="Roundtable Discussion"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Articles - Horizontal Scroll */}
          <div className="mb-16">
            <div className="inline-block mb-4">
              <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-4 py-2 rounded-full text-sm font-semibold">
                {language === "bn" ? "সাম্প্রতিক আপডেট" : "Latest Updates"}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
              <span className="w-1 h-8 bg-blue-600 rounded-full"></span>
              {language === "bn" ? "সাম্প্রতিক নিবন্ধ" : "Recent Articles"}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>
            <div className="scroll-container gap-6 pb-4 snap-x snap-mandatory">
              {[
                {
                  outlet: "New Age",
                  title: "Inclusion of July Uprising in Textbook Demanded",
                  url: "https://www.newagebd.net/post/country/250470/inclusion-of-july-uprising-in-textbook-demanded",
                  color: "from-blue-500 to-blue-600",
                  textColor: "text-blue-600 dark:text-blue-400",
                },
                {
                  outlet: "Daily Campus",
                  title:
                    "পাঠ্যপুস্তকে জুলাই গণঅভ্যুত্থানের বীরত্বগাঁথার অন্তর্ভুক্তি নিয়ে শিক্ষা অধিকার সংসদের গোলটেবিল আলোচনা",
                  url: "https://share.google/troTP5bAyOJQzUj0L",
                  color: "from-purple-500 to-purple-600",
                  textColor: "text-purple-600 dark:text-purple-400",
                },
                {
                  outlet: "Dhaka Post",
                  title:
                    "পাঠ্যবই থেকে শেখ মুজিব ও শেখ হাসিনার বিষয়বস্তু অপসারণের দাবি",
                  url: "https://www.dhakapost.com/education/322995",
                  color: "from-teal-500 to-teal-600",
                  textColor: "text-teal-600 dark:text-teal-400",
                },
              ].map((article, idx) => (
                <a
                  key={idx}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group min-w-[350px] md:min-w-[420px] snap-start flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 overflow-hidden"
                >
                  <div className={`h-2 bg-linear-to-r ${article.color}`}></div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className={`w-2 h-2 rounded-full bg-linear-to-r ${article.color}`}
                      ></div>
                      <span
                        className={`font-bold ${article.textColor} text-sm uppercase tracking-wide`}
                      >
                        {article.outlet}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 line-clamp-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-sm">
                      <span>Read Article</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Media Partners Logos */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
              {language === "bn" ? "প্রকাশিত হয়েছে" : "Featured In"}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: "New Age", color: "bg-blue-500" },
                { name: "Dhaka Post", color: "bg-red-500" },
                { name: "Daily Campus", color: "bg-purple-500" },
                { name: "Janakantha", color: "bg-orange-500" },
                { name: "RTV Online", color: "bg-teal-500" },
              ].map((outlet, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all group cursor-pointer border-2 border-gray-100 dark:border-gray-700 hover:border-teal-500"
                >
                  <div
                    className={`w-8 h-1 ${outlet.color} mx-auto mb-3 rounded-full group-hover:w-full transition-all`}
                  ></div>
                  <p className="font-bold text-gray-800 dark:text-gray-200 text-sm group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {outlet.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <a
              href="/news-publications"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:shadow-xl"
            >
              {language === "bn" ? "সব মিডিয়া কভারেজ দেখুন" : "View All Media Coverage"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Our Impact & Moments Section */}
      <section className="py-20 bg-linear-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-4 uppercase tracking-wide">
              {language === "bn" ? "আমাদের যাত্রা" : "Our Journey"}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {language === "bn" ? "গুরুত্বপূর্ণ মুহূর্ত" : "Moments That Matter"}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Through dialogue, advocacy, and collaboration, we&apos;re building
              a stronger education system for Bangladesh. Here are the stories
              behind our work.
            </p>
          </div>

          {/* Featured Highlight Banner */}
          <div className="mb-12 relative group overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative h-96 md:h-[500px]">
              <Image
                src="/sej/EducatorLeaderShipSummit2025Cover.jpg"
                alt="SEJ Leadership Summit"
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-white/90 via-white/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="max-w-3xl">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Educator Leadership Summit
                  </h3>
                  <p className="text-xl text-gray-800 mb-6">
                    Bringing together education leaders, policymakers, and
                    advocates to shape the future of learning in Bangladesh
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-teal-600 px-4 py-2 rounded-full text-white text-sm font-semibold">
                      Leadership Development
                    </span>
                    <span className="bg-blue-600 px-4 py-2 rounded-full text-white text-sm font-semibold">
                      Policy Dialogue
                    </span>
                    <span className="bg-purple-600 px-4 py-2 rounded-full text-white text-sm font-semibold">
                      Community Engagement
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Stats */}

          {/* Photo Gallery with Captions - Horizontal Scroll */}
          <div>
            <div className="inline-block mb-4">
              <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-4 py-2 rounded-full text-sm font-semibold">
                Our Moments
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
              {language === "bn" ? "আমাদের প্রভাব ধারণ" : "Capturing Our Impact"}
            </h3>
            <div className="w-16 h-1.5 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-full mb-8 mx-auto"></div>
            <div className="scroll-container gap-4 pb-4 snap-x snap-mandatory">
              {[
                {
                  img: "photo_2025-10-23_21-12-01 (2).jpg",
                  caption: "Community Workshops",
                  folder: "sej",
                },
                {
                  img: "photo_2025-10-23_21-12-02 (2).jpg",
                  caption: "Expert Panels",
                  folder: "sej",
                },
                {
                  img: "01.jpg",
                  caption: "Panel Discussions",
                  folder: "new",
                },
                {
                  img: "photo_2025-10-23_21-12-03 (4).jpg",
                  caption: "Stakeholder Meetings",
                  folder: "sej",
                },
                {
                  img: "03.jpg",
                  caption: "Education Forums",
                  folder: "new",
                },
                {
                  img: "04.jpg",
                  caption: "Policy Dialogues",
                  folder: "new",
                },
                {
                  img: "05.jpg",
                  caption: "Youth Engagement",
                  folder: "new",
                },
                {
                  img: "06.jpg",
                  caption: "Community Outreach",
                  folder: "new",
                },
                {
                  img: "photo_2025-10-23_21-12-03.jpg",
                  caption: "Policy Forums",
                  folder: "sej",
                },
                {
                  img: "07.jpg",
                  caption: "Advocacy Campaigns",
                  folder: "new",
                },
                {
                  img: "08.jpg",
                  caption: "Collaborative Dialogues",
                  folder: "new",
                },
                {
                  img: "photo_2025-10-23_21-12-05 (2).jpg",
                  caption: "Research Presentations",
                  folder: "sej",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="min-w-[250px] md:min-w-[300px] snap-start flex-shrink-0 relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                >
                  <Image
                    src={`/${item.folder}/${item.img}`}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold text-sm">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Link
              href="/events"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:shadow-xl inline-flex items-center gap-2"
            >
              {language === "bn" ? "সব ইভেন্ট ও কার্যক্রম দেখুন" : "View All Events & Activities"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Research Highlights — Academic Journal Style */}
      <section className="py-24 md:py-28 bg-white dark:bg-gray-950" aria-label="Research highlights">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "গবেষণা ও নীতি" : "Research & Policy"}
            title={language === "bn" ? "সাম্প্রতিক গবেষণা" : "Latest Research"}
            description={
              language === "bn"
                ? "শিক্ষা সংস্কারকে প্রভাবিত করতে প্রমাণ-ভিত্তিক গবেষণা ও নীতি বিশ্লেষণ।"
                : "Evidence-based research and policy analysis shaping education reform."
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: language === "bn" ? "নীতি সংক্ষিপ্ত" : "Policy Brief",
                title: language === "bn" ? "শিক্ষা বাজেটে সমতা: বাংলাদেশ কোথায়?" : "Education Budget Equity: Where Does Bangladesh Stand?",
                text: language === "bn" ? "প্রান্তিক জনগোষ্ঠীর ওপর বাজেট বরাদ্দের প্রভাব বিশ্লেষণ।" : "How budget allocation impacts marginalised communities.",
              },
              {
                tag: language === "bn" ? "গবেষণা পত্র" : "Research Paper",
                title: language === "bn" ? "বিদ্যালয়ের বাইরে শিশু: পরিস্থিতি বিশ্লেষণ" : "Out-of-School Children: A Situational Analysis",
                text: language === "bn" ? "ঝরে পড়ার কারণ ও পুনঃভর্তি কৌশলের প্রমাণ-ভিত্তিক বিশ্লেষণ।" : "Drivers of dropout and strategies for re-enrolment.",
              },
              {
                tag: language === "bn" ? "নীতি সংক্ষিপ্ত" : "Policy Brief",
                title: language === "bn" ? "শিক্ষক পেশাগত উন্নয়ন: ঘাটতি ও সম্ভাবনা" : "Teacher Professional Development: Gaps & Opportunities",
                text: language === "bn" ? "শিক্ষক প্রশিক্ষণ কর্মসূচির পর্যালোচনা ও সুপারিশ।" : "Review of teacher training with policy recommendations.",
              },
            ].map((pub, i) => (
              <motion.article
                key={pub.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="institution-card p-8 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#0e7c6b] dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-3 py-1.5 rounded-full">
                    {pub.tag}
                  </span>
                  <FileText className="w-5 h-5 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#0a2a4a] dark:text-white leading-snug mb-3" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                  {pub.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed flex-1 mb-6">
                  {pub.text}
                </p>
                <Link href="/research-policy" className="inline-flex items-center gap-2 text-sm font-bold text-[#0a2a4a] dark:text-teal-300 hover:text-[#0e7c6b] dark:hover:text-teal-200 transition-colors">
                  <Download className="w-4 h-4" aria-hidden="true" />
                  {language === "bn" ? "সংক্ষিপ্ত পড়ুন" : "Read the brief"}
                </Link>
              </motion.article>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/research-policy"
              className="group inline-flex items-center gap-2 font-bold text-[#0e7c6b] dark:text-teal-300 hover:gap-3.5 transition-all"
            >
              {language === "bn" ? "সব গবেষণা দেখুন" : "View all research"}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners — Institutional Trust */}
      <section className="section-soft py-24 md:py-28" aria-label="Partners">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow={language === "bn" ? "অংশীদার" : "Partners"}
            title={language === "bn" ? "যাদের সাথে আমরা কাজ করি" : "Trusted Collaborations"}
            description={
              language === "bn"
                ? "সরকার, আন্তর্জাতিক সংস্থা, শিক্ষা প্রতিষ্ঠান ও নাগরিক সমাজের সাথে সম্মিলিত প্রচেষ্টা।"
                : "Working alongside government, international agencies, academia and civil society."
            }
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "Ministry of Education",
              "UNESCO",
              "UNICEF",
              "Save the Children",
              "CAMPE",
              "BRAC Education",
            ].map((partner, i) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="institution-card px-4 py-7 flex items-center justify-center text-center"
              >
                <span className="font-display font-semibold text-slate-500 dark:text-slate-400 text-[15px] leading-snug" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                  {partner}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 dark:text-slate-500 mt-8 tracking-wide">
            {language === "bn"
              ? "+ আরও অনেক শিক্ষা প্রতিষ্ঠান ও যুব সংগঠন"
              : "+ many more academic institutions & youth networks"}
          </p>
        </div>
      </section>

      <CTASection
        titleEn="Ready to advance education justice?"
        titleBn="শিক্ষা ন্যায়বিচার এগিয়ে নিতে প্রস্তুত?"
        descEn="Join thousands of members working towards equitable, inclusive and quality education across Bangladesh."
        descBn="বাংলাদেশে ন্যায্য, অন্তর্ভুক্তিমূলক ও মানসম্মত শিক্ষার জন্য হাজারো সদস্যের সাথে যোগ দিন।"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
