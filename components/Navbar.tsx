"use client";

import { useLanguage } from "@/lib/contexts/LanguageContext";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { t } from "@/lib/i18n";
import { useState, useMemo } from "react";
import Image from "next/image";

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { key: "home", label: t(language, "home"), href: "/" },
      { key: "about", label: t(language, "about"), href: "/about-erp" },
      {
        key: "programs",
        label: language === "en" ? "Programs" : "কর্মসূচি",
        children: [
          {
            key: "research",
            label: t(language, "research"),
            href: "/research-policy",
          },
          {
            key: "advocacy",
            label: t(language, "advocacy"),
            href: "/advocacy-engagement",
          },
          {
            key: "parliament",
            label: t(language, "parliament"),
            href: "/parliament-platform",
          },
          {
            key: "projects",
            label: t(language, "projects"),
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
            href: "/news-publications",
          },
          { key: "events", label: t(language, "events"), href: "/events" },
          {
            key: "gallery",
            label: t(language, "gallery"),
            href: "/gallery",
          },
          {
            key: "resources",
            label: t(language, "resources"),
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
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm dark:shadow-lg dark:shadow-gray-800/50 transition-colors">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <Image
              src="/ERP_logo.png"
              alt="Society for Educational Justice Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-bold text-gray-800 dark:text-white hidden sm:inline text-sm">
            {t(language, "erp")}
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-4 text-xs font-medium text-gray-700 dark:text-gray-300">
          {navItems.map((item) => (
            <li key={item.key} className="relative group">
              {item.children ? (
                <>
                  <button className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap flex items-center gap-1">
                    {item.label}
                    <span className="text-[10px]">▼</span>
                  </button>
                  <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-gray-700">
                    {item.children.map((child) => (
                      <a
                        key={child.key}
                        href={child.href}
                        className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a
                  href={item.href}
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Language Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span>🌐</span>
              <span>{language.toUpperCase()}</span>
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setLanguage("en")}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  language === "en"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                } transition-colors first:rounded-t-lg`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setLanguage("bn")}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  language === "bn"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                } transition-colors last:rounded-b-lg`}
              >
                🇧🇩 বাংলা
              </button>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-800 dark:text-white text-2xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <ul className="flex flex-col gap-2 px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            {navItems.map((item) => (
              <li key={item.key}>
                {item.children ? (
                  <>
                    <div className="py-2 font-semibold text-gray-900 dark:text-white">
                      {item.label}
                    </div>
                    <ul className="pl-4 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <li key={child.key}>
                          <a
                            href={child.href}
                            className="block py-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
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
                    className="block py-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
