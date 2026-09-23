import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Landmark } from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  eyebrow?: string;
  breadcrumbs?: Breadcrumb[];
}

export function PageHeader({
  title,
  subtitle,
  backgroundImage,
  eyebrow,
  breadcrumbs,
}: PageHeaderProps) {
  const bgImage = backgroundImage || "/new/04.jpg";
  const { language } = useLanguage();

  return (
    <section
      className="noise-overlay relative overflow-hidden bg-[#0a2a4a] dark:bg-[#060f1c]"
      aria-labelledby="page-header-title"
    >
      {/* Institutional backdrop: photo + navy veil */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(105deg, rgba(7,30,54,0.97) 20%, rgba(10,42,74,0.88) 55%, rgba(14,124,107,0.55) 100%), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      {/* Gold keyline + soft glow */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0e7c6b] via-[#b98a1f] to-[#0e7c6b]" aria-hidden="true" />
      <div className="absolute -right-24 -top-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-[#b98a1f]/15 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-white/60">
              <li>
                <Link href="/" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                  <Landmark className="w-3.5 h-3.5" aria-hidden="true" />
                  {t(language, "home") as string}
                </Link>
              </li>
              {(breadcrumbs ?? []).map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-white/30" aria-hidden="true" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-[#e8c96a]">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {eyebrow && (
            <p className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.22em] uppercase text-[#e8c96a] mb-4">
              <span className="w-9 h-[2px] bg-gradient-to-r from-[#b98a1f] to-teal-400 rounded-full" aria-hidden="true" />
              {eyebrow}
            </p>
          )}

          <h1
            id="page-header-title"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] mb-5"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            {title}
          </h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
              className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}

          <div className="w-20 h-1 bg-gradient-to-r from-[#b98a1f] to-teal-400 rounded-full mt-8" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
