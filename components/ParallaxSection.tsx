"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";

interface ParallaxSectionProps {
  imageSrc: string;
  height?: string;
  overlayOpacity?: number;
}

export function ParallaxSection({
  imageSrc,
  height = "60vh",
  overlayOpacity = 0.3,
}: ParallaxSectionProps) {
  const { language } = useLanguage();
  const [offsetY, setOffsetY] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const elementTop = rect.top + scrolled;
        const windowHeight = window.innerHeight;

        // Only apply parallax when element is in viewport
        if (
          scrolled + windowHeight > elementTop &&
          scrolled < elementTop + rect.height
        ) {
          const offset = (scrolled - elementTop + windowHeight) * 0.5;
          setOffsetY(offset);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={parallaxRef}
      className="relative overflow-hidden"
      style={{ height }}
    >
      {/* Parallax Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(-${offsetY * 0.3}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="relative w-full h-[120%]">
          <Image
            src={imageSrc}
            alt="Parallax Background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
      </div>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="bg-teal-500/90 text-white px-6 py-2 rounded-full text-sm md:text-base font-semibold uppercase tracking-wide">
              {t(language, "erp")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 drop-shadow-2xl leading-tight">
            {t(language, "parallaxTitle")}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl drop-shadow-2xl max-w-3xl mx-auto font-medium">
            {t(language, "parallaxSubtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
