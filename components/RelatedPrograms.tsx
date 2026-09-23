"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, Megaphone, Landmark, FolderKanban } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/lib/contexts/LanguageContext";

const ALL = [
  {
    icon: FileText,
    href: "/research-policy",
    titleEn: "Research & Policy",
    titleBn: "গবেষণা ও নীতি",
  },
  {
    icon: Megaphone,
    href: "/advocacy-engagement",
    titleEn: "Advocacy & Engagement",
    titleBn: "অ্যাডভোকেসি ও সম্পৃক্ততা",
  },
  {
    icon: Landmark,
    href: "/parliament-platform",
    titleEn: "Parliament Platform",
    titleBn: "পার্লামেন্ট প্ল্যাটফর্ম",
  },
  {
    icon: FolderKanban,
    href: "/projects-initiatives",
    titleEn: "Projects & Initiatives",
    titleBn: "প্রকল্প ও উদ্যোগ",
  },
];

export function RelatedPrograms({ current }: { current: string }) {
  const { language } = useLanguage();
  const related = ALL.filter((p) => p.href !== current).slice(0, 3);

  return (
    <section className="py-20 md:py-24 bg-white dark:bg-gray-950" aria-label="Related programs">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow={language === "bn" ? "সম্পর্কিত" : "Related"}
          title={language === "bn" ? "সম্পর্কিত কর্মসূচি" : "Related Programs"}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {related.map((program, i) => (
            <motion.div
              key={program.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={program.href} className="institution-card group flex items-center gap-4 p-6" aria-label={language === "bn" ? program.titleBn : program.titleEn}>
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0a2a4a] text-[#e8c96a] shrink-0 group-hover:bg-[#0e7c6b] group-hover:text-white transition-colors">
                  <program.icon className="w-6 h-6" aria-hidden="true" />
                </span>
                <span className="flex-1 font-bold text-[#0a2a4a] dark:text-white">
                  {language === "bn" ? program.titleBn : program.titleEn}
                </span>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#0e7c6b] group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
