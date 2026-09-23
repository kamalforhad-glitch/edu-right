"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: SectionHeadingProps) {
  const centered = align === "center";
  const headingColor =
    tone === "dark" ? "text-white" : "text-[#0a2a4a] dark:text-white";
  const descColor =
    tone === "dark" ? "text-white/70" : "text-slate-600 dark:text-slate-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`max-w-3xl mb-14 ${centered ? "mx-auto text-center" : "text-left"}`}
    >
      <p className={`eyebrow mb-4 ${centered ? "eyebrow-centered justify-center" : ""}`}>
        {eyebrow}
      </p>
      <h2
        className={`font-display text-3xl md:text-[2.75rem] font-semibold leading-[1.15] ${headingColor}`}
        style={{ fontFamily: "var(--font-display), Georgia, serif" }}
      >
        {title}
      </h2>
      <div
        className={`gold-rule mt-6 ${centered ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
      {description && (
        <p className={`mt-5 text-lg leading-relaxed ${descColor}`}>{description}</p>
      )}
    </motion.div>
  );
}
