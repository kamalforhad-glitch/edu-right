"use client";

import { Facebook, Linkedin, Youtube, ArrowUp, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/contexts/LanguageContext";

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=61566573296753",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://www.linkedin.com/company/society-for-educational-justice/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://www.youtube.com/@user-zy6nt8fv6e",
    icon: Youtube,
    label: "YouTube",
  },
];

const quickLinks = [
  { href: "/about-sej", labelEn: "About", labelBn: "আমাদের সম্পর্কে" },
  { href: "/about-sej/our-story", labelEn: "Our Story", labelBn: "আমাদের গল্প" },
  { href: "/about-sej#vision", labelEn: "Vision & Mission", labelBn: "দৃষ্টি ও মিশন" },
  { href: "/about-sej#objectives", labelEn: "Objectives", labelBn: "উদ্দেশ্য" },
  { href: "/about-sej#governance", labelEn: "Governance", labelBn: "শাসন" },
  { href: "/about-sej#partners", labelEn: "Partners", labelBn: "পার্টনার" },
];

const programs = [
  { href: "/advocacy-engagement", labelEn: "Advocacy", labelBn: "অ্যাডভোকেসি" },
  { href: "/research-policy", labelEn: "Research", labelBn: "গবেষণা" },
  { href: "/parliament-platform", labelEn: "Parliament Platform", labelBn: "সংসদ প্ল্যাটফর্ম" },
  { href: "/projects-initiatives", labelEn: "Projects", labelBn: "প্রকল্প" },
  { href: "/news-publications", labelEn: "Resources", labelBn: "সম্পদ" },
];

const resourceLinks = [
  { href: "/news-publications", labelEn: "News", labelBn: "সংবাদ" },
  { href: "/events", labelEn: "Events", labelBn: "অনুষ্ঠান" },
  { href: "/gallery", labelEn: "Gallery", labelBn: "গ্যালারি" },
  { href: "/news-publications#publications", labelEn: "Publications", labelBn: "প্রকাশনা" },
  { href: "/get-involved", labelEn: "Get Involved", labelBn: "যুক্ত হোন" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Footer() {
  const { language } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0a2a4a] dark:bg-[#060f1c] text-white overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-[#b98a1f]/10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0e7c6b] via-[#b98a1f] to-[#0e7c6b]" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10"
        >
          {/* Column 1: Logo + Mission + Social */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="relative mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl opacity-20 blur-lg" />
              <div className="relative bg-gray-900/80 dark:bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/50">
                <Image
                  src="/SEJ_logo.png"
                  alt="SEJ Logo"
                  width={64}
                  height={64}
                  className="object-contain mx-auto"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-teal-300 to-[#e8c96a] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
              SOCIETY FOR EDUCATIONAL JUSTICE
            </h3>
            <p className="text-gray-300/90 text-sm leading-relaxed mb-2">
              {language === "bn"
                ? "শিক্ষার অধিকার রক্ষায় আমরা নিরলসভাবে কাজ করে যাচ্ছি।"
                : "Dedicated to protecting the right to education through relentless advocacy and research."}
            </p>
            <p className="text-xs tracking-[0.18em] uppercase text-[#e8c96a]/80 font-semibold mb-6">
              {language === "bn" ? "প্রমাণ • অন্তর্ভুক্তি • স্বচ্ছতা" : "Evidence • Inclusion • Transparency"}
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-br hover:from-teal-500 hover:to-blue-500 flex items-center justify-center transition-all duration-300 border border-gray-700/50 hover:border-transparent"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-lg mb-5 text-white">
              {language === "bn" ? "দ্রুত লিংক" : "Quick Links"}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ href, labelEn, labelBn }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-teal-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500/0 group-hover:bg-teal-500 transition-all duration-200" />
                    {language === "bn" ? labelBn : labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Programs */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-lg mb-5 text-white">
              {language === "bn" ? "প্রোগ্রাম" : "Programs"}
            </h4>
            <ul className="space-y-3">
              {programs.map(({ href, labelEn, labelBn }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-teal-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500/0 group-hover:bg-teal-500 transition-all duration-200" />
                    {language === "bn" ? labelBn : labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-lg mb-5 text-white">
              {language === "bn" ? "সম্পদ" : "Resources"}
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map(({ href, labelEn, labelBn }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-teal-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500/0 group-hover:bg-teal-500 transition-all duration-200" />
                    {language === "bn" ? labelBn : labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 5: Contact + Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-lg mb-5 text-white">
              {language === "bn" ? "যোগাযোগ" : "Contact"}
            </h4>
            <ul className="space-y-3 text-sm text-gray-400 mb-6">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                {language === "bn"
                  ? "ঢাকা, বাংলাদেশ"
                  : "Dhaka, Bangladesh"}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                contact@sejbd.org
              </li>
            </ul>

            <h4 className="font-bold text-sm mb-3 text-white">
              {language === "bn" ? "নিউজলেটার" : "Newsletter"}
            </h4>
            <div className="relative">
              <input
                type="email"
                placeholder={language === "bn" ? "ইমেইল দিন" : "Your email"}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
                {language === "bn" ? "সাবস্ক্রাইব" : "Subscribe"}
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <div className="mt-14 pt-8 border-t border-gray-800/80">
          <div className="bg-gradient-to-r from-transparent via-gray-700/50 to-transparent h-px mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>
              Copyright &copy; {new Date().getFullYear()} SOCIETY FOR EDUCATIONAL
              JUSTICE (SEJ). {language === "bn" ? "সর্বস্বত্ব সংরক্ষিত।" : "All rights reserved."}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy-policy"
                className="hover:text-teal-400 transition-colors"
              >
                {language === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
              </Link>
              <span className="text-gray-700">|</span>
              <Link
                href="/terms"
                className="hover:text-teal-400 transition-colors"
              >
                {language === "bn" ? "শর্তাবলী" : "Terms of Use"}
              </Link>
              <span className="text-gray-700">|</span>
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-gray-600 hover:text-[#e8c96a] transition-colors"
                aria-label={language === "bn" ? "অ্যাডমিন লগইন" : "Admin login"}
                title={language === "bn" ? "অ্যাডমিন লগইন" : "Admin login"}
              >
                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                {language === "bn" ? "অ্যাডমিন" : "Admin"}
              </Link>
              <span className="text-gray-700">|</span>
              <span>
                {language === "bn"
                  ? "ভালোবাসা দিয়ে তৈরি ❤️"
                  : "Made with ❤️"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8,
          pointerEvents: showScrollTop ? ("auto" as const) : ("none" as const),
        }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/25 flex items-center justify-center hover:shadow-teal-500/40 transition-shadow"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}