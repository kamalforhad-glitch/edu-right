"use client";

import { useLanguage } from "@/lib/contexts/LanguageContext";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { t } from "@/lib/i18n";
import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Facebook,
  Linkedin,
  Youtube,
  Accessibility,
  Mail,
  MapPin,
  ChevronDown,
} from "lucide-react";

const SOCIALS = [
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

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Deferred one-time sync of persisted preference (async callback: no cascading render)
    const id = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem("sej-large-text");
        if (saved === "1") {
          setLargeText(true);
          document.documentElement.classList.add("a11y-large");
        }
      } catch {
        /* ignore */
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const toggleLargeText = useCallback(() => {
    setLargeText((prev) => {
      const next = !prev;
      try {
        document.documentElement.classList.toggle("a11y-large", next);
        localStorage.setItem("sej-large-text", next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const navItems = useMemo(
    () => [
      { key: "home", label: t(language, "home"), href: "/" },
      { key: "about", label: t(language, "about"), href: "/about-sej" },
      {
        key: "programs",
        label: language === "en" ? "Programs" : "কর্মসূচি",
        children: [
          {
            key: "research",
            label: t(language, "research"),
            desc: language === "en" ? "Evidence-based studies & policy briefs" : "প্রমাণ-ভিত্তিক গবেষণা ও নীতি সংক্ষিপ্ত",
            href: "/research-policy",
          },
          {
            key: "advocacy",
            label: t(language, "advocacy"),
            desc: language === "en" ? "Campaigns & civic engagement" : "প্রচারণা ও নাগরিক সম্পৃক্ততা",
            href: "/advocacy-engagement",
          },
          {
            key: "parliament",
            label: t(language, "parliament"),
            desc: language === "en" ? "Citizen voice in policymaking" : "নীতিনির্ধারণে নাগরিক কণ্ঠস্বর",
            href: "/parliament-platform",
          },
          {
            key: "projects",
            label: t(language, "projects"),
            desc: language === "en" ? "Field programs & initiatives" : "মাঠ পর্যায়ের কর্মসূচি ও উদ্যোগ",
            href: "/projects-initiatives",
          },
        ],
      },
      {
        key: "media",
        label: language === "en" ? "Media & Events" : "মিডিয়া ও ইভেন্ট",
        children: [
          {
            key: "news",
            label: t(language, "news"),
            desc: language === "en" ? "Stories & publications" : "সংবাদ ও প্রকাশনা",
            href: "/news-publications",
          },
          { key: "events", label: t(language, "events"), desc: language === "en" ? "Conferences & dialogues" : "সম্মেলন ও সংলাপ", href: "/events" },
          {
            key: "gallery",
            label: t(language, "gallery"),
            desc: language === "en" ? "Photos & moments" : "ছবি ও মুহূর্ত",
            href: "/gallery",
          },
          {
            key: "resources",
            label: t(language, "resources"),
            desc: language === "en" ? "Reports & documents" : "প্রতিবেদন ও নথিপত্র",
            href: "/resources",
          },
        ],
      },
      {
        key: "getInvolved",
        label: t(language, "getInvolved"),
        href: "/get-involved",
      },
      { key: "contact", label: t(language, "contact"), href: "/contact" },
    ],
    [language]
  );

  return (
    <header className="sticky top-0 z-50">
      {/* Institutional utility bar — collapses on scroll */}
      <div
        className={`hidden md:block bg-[#0a2a4a] dark:bg-[#060f1c] text-white/80 overflow-hidden transition-all duration-500 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <a href="mailto:contact@sejbd.org" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              contact@sejbd.org
            </a>
            <span className="inline-flex items-center gap-1.5 text-white/60">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              {language === "bn" ? "ঢাকা, বাংলাদেশ" : "Dhaka, Bangladesh"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main glass bar */}
      <div
        className={`transition-all duration-500 border-b ${
          scrolled
            ? "bg-white/85 dark:bg-gray-950/80 backdrop-blur-2xl shadow-lg shadow-[#0a2a4a]/10 border-slate-200/70 dark:border-white/10"
            : "bg-white/95 dark:bg-gray-950/90 backdrop-blur-xl border-transparent"
        }`}
      >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between" aria-label="Primary">
        <Link href="/" className="flex items-center gap-3 group" aria-label="SEJ home">
          <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-105">
            <Image
              src="/SEJ_logo.png"
              alt="Society for Educational Justice Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-bold text-[#0a2a4a] dark:text-white text-[13px] tracking-wide">
              {t(language, "sej")}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {language === "bn" ? "SOCIETY FOR EDUCATIONAL JUSTICE" : "শিক্ষা অধিকার সংসদ"}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1 text-[15px] font-medium text-slate-700 dark:text-slate-300">
          {navItems.map((item) => (
            <li key={item.key} className="relative group">
              {item.children ? (
                <>
                  <button
                    aria-haspopup="true"
                    className={`transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 ${
                      item.children.some((c) => isActive(c.href))
                        ? "text-[#0e7c6b] dark:text-teal-300 font-semibold"
                        : "hover:text-[#0e7c6b] dark:hover:text-teal-300"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" aria-hidden="true" />
                  </button>
                  {/* Mega-menu style dropdown */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-80 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-300">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl shadow-[#0a2a4a]/15 border border-slate-200 dark:border-white/10 overflow-hidden">
                      <div className="h-1 bg-gradient-to-r from-[#0e7c6b] via-teal-500 to-[#b98a1f]" aria-hidden="true" />
                      {item.children.map((child) => (
                        <a
                          key={child.key}
                          href={child.href}
                          className="flex flex-col gap-0.5 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-100 dark:border-white/5 last:border-0"
                        >
                          <span className={`text-sm font-semibold ${isActive(child.href) ? "text-[#0e7c6b] dark:text-teal-300" : "text-slate-800 dark:text-slate-200"}`}>
                            {child.label}
                          </span>
                          {"desc" in child && (
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {(child as { desc: string }).desc}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative transition-all duration-300 whitespace-nowrap px-3.5 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 ${
                    isActive(item.href)
                      ? "text-[#0e7c6b] dark:text-teal-300 font-semibold"
                      : "hover:text-[#0e7c6b] dark:hover:text-teal-300"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[3px] w-3/4 bg-gradient-to-r from-[#0e7c6b] to-[#b98a1f] rounded-full" aria-hidden="true" />
                  )}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Language Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-white/15 transition-all duration-300"
              aria-label="Switch language"
              aria-haspopup="true"
            >
              <span aria-hidden="true">🌐</span>
              <span>{language.toUpperCase()}</span>
            </button>
            <div className="absolute right-0 top-full pt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl shadow-[#0a2a4a]/15 border border-slate-200 dark:border-white/10 overflow-hidden">
                <button
                  onClick={() => setLanguage("en")}
                  className={`block w-full text-left px-5 py-3 text-sm transition-colors ${
                    language === "en"
                      ? "bg-teal-50 dark:bg-teal-900/30 text-[#0e7c6b] dark:text-teal-300 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => setLanguage("bn")}
                  className={`block w-full text-left px-5 py-3 text-sm transition-colors ${
                    language === "bn"
                      ? "bg-teal-50 dark:bg-teal-900/30 text-[#0e7c6b] dark:text-teal-300 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  🇧🇩 বাংলা
                </button>
              </div>
            </div>
          </div>

          {/* Accessibility: larger text */}
          <button
            onClick={toggleLargeText}
            aria-pressed={largeText}
            title={language === "bn" ? "বড় অক্ষর" : "Larger text"}
            aria-label={language === "bn" ? "বড় অক্ষর চালু/বন্ধ" : "Toggle larger text"}
            className={`p-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              largeText
                ? "bg-[#0e7c6b] text-white shadow-md"
                : "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/15"
            }`}
          >
            <Accessibility className="w-[18px] h-[18px]" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-white/15 transition-all duration-300"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-slate-800 dark:text-white text-2xl p-2 rounded-lg focus:outline-none transition-all duration-300"
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <motion.span
              key={mobileMenuOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
              className="block"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </motion.span>
          </button>
        </div>
      </nav>
      </div>

      {/* Institutional keyline */}
      <div
        className={`h-[3px] bg-gradient-to-r from-[#0e7c6b] via-[#b98a1f] to-[#0a2a4a] transition-opacity duration-700 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={closeMobileMenu}
          />
          <motion.div
            id="mobile-navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/10">
              <span className="font-bold text-[#0a2a4a] dark:text-white text-sm">
                {t(language, "sej")}
              </span>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white transition-colors hover:bg-slate-200 dark:hover:bg-white/15"
                aria-label="Close navigation menu"
              >
                ✕
              </button>
            </div>
            <ul className="flex flex-col gap-1 px-6 pb-6 text-[17px] font-medium text-slate-700 dark:text-slate-300">
              {navItems.map((item, idx) => (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 + idx * 0.06 }}
                >
                  {item.children ? (
                    <>
                      <div className="py-3 font-serif font-semibold text-[#0a2a4a] dark:text-white text-lg" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                        {item.label}
                      </div>
                      <ul className="pl-4 flex flex-col gap-1 border-l-2 border-[#b98a1f]/40 ml-1">
                        {item.children.map((child) => (
                          <li key={child.key}>
                            <a
                              href={child.href}
                              onClick={closeMobileMenu}
                              className={`block py-3 pl-3 rounded-lg transition-colors ${
                                isActive(child.href)
                                  ? "text-[#0e7c6b] dark:text-teal-300 bg-teal-50 dark:bg-teal-900/20 font-semibold"
                                  : "hover:text-[#0e7c6b] dark:hover:text-teal-300 hover:bg-slate-50 dark:hover:bg-white/5"
                              }`}
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`block py-3.5 transition-colors border-b border-slate-100 dark:border-white/5 ${
                        isActive(item.href)
                          ? "text-[#0e7c6b] dark:text-teal-300 font-semibold"
                          : "hover:text-[#0e7c6b] dark:hover:text-teal-300"
                      }`}
                    >
                      {item.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
            <div className="mx-6 mb-8 p-4 rounded-2xl bg-[#0a2a4a] text-white/85 text-sm">
              <a href="mailto:contact@sejbd.org" className="flex items-center gap-2 mb-2 hover:text-white">
                <Mail className="w-4 h-4" aria-hidden="true" /> contact@sejbd.org
              </a>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin className="w-4 h-4" aria-hidden="true" /> {language === "bn" ? "ঢাকা, বাংলাদেশ" : "Dhaka, Bangladesh"}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </header>
  );
}
