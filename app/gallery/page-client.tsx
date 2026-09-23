"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import Image from "next/image";
import { Images } from "lucide-react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryDBItem {
  id: string;
  title: string;
  titleBn?: string;
  category?: string;
  images?: string[];
  featuredImage?: string;
  createdAt: string;
}

interface GalleryCategory {
  id: string;
  category: string;
  title: string;
  images: { src: string; alt: string }[];
}

export default function GalleryPage() {
  const { language } = useLanguage();
  const [dbItems, setDbItems] = useState<GalleryDBItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch(
          "/api/content?type=gallery&published=true&limit=50",
        );
        const data = await res.json();
        setDbItems(data.contents || []);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoadingGallery(false);
      }
    }
    fetchGallery();
  }, []);

  // Convert DB items to the local display format
  const galleryImages: GalleryCategory[] = dbItems.map((item) => ({
    id: item.id,
    category: item.category || item.id,
    title: item.title,
    images: (item.images || []).map((src, i) => ({
      src,
      alt: `${item.title} - Photo ${i + 1}`,
    })),
  }));

  // Flatten all images for modal navigation
  const allImages = galleryImages.flatMap((cat) =>
    cat.images.map((img) => ({ ...img, category: cat.title })),
  );

  const openModal = (categoryIndex: number, imageIndex: number) => {
    const imagesBefore = galleryImages
      .slice(0, categoryIndex)
      .reduce((sum, cat) => sum + cat.images.length, 0);
    setSelectedImageIndex(imagesBefore + imageIndex);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (
      selectedImageIndex !== null &&
      selectedImageIndex < allImages.length - 1
    ) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") closeModal();
  };

  const filteredCategories =
    selectedCategory === "all" ? galleryImages : (
      galleryImages.filter((cat) => cat.category === selectedCategory)
    );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar />
      <PageHeader
        title={t(language, "gallery") as string}
        subtitle={t(language, "gallerySubtitle") as string}
        backgroundImage="/new/01.jpg"
        eyebrow={language === "bn" ? "মিডিয়া" : "Moments"}
        breadcrumbs={[{ label: "Media & Events" }, { label: t(language, "gallery") as string }]}
      />

      <main className="max-w-7xl mx-auto px-6 py-16 section-xl">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2.5 mb-12 justify-center" role="group" aria-label="Filter gallery">
          <button
            onClick={() => setSelectedCategory("all")}
            aria-pressed={selectedCategory === "all"}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              selectedCategory === "all" ?
                "bg-[#0a2a4a] text-white shadow-lg"
              : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15"
            }`}
          >
            {t(language, "allPhotos") as string}
          </button>
          {galleryImages.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.category)}
              aria-pressed={selectedCategory === category.category}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === category.category ?
                  "bg-[#0a2a4a] text-white shadow-lg"
                : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loadingGallery ?
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-3 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
          </div>
        : <>
            {filteredCategories.map((category) => (
              <div key={category.id} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#0a2a4a] dark:text-white" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                    {category.title}
                  </h2>
                  <span className="flex-1 h-px bg-slate-200 dark:bg-white/10" aria-hidden="true" />
                  <span className="text-sm font-semibold text-slate-400">
                    {category.images.length} {t(language, "photosCount") as string}
                  </span>
                </div>
                {/* Masonry layout */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 [column-fill:balance]">
                  {category.images.map((image, imageIndex) => (
                    <div
                      key={`${category.id}-${image.src}`}
                      className={`group relative mb-5 break-inside-avoid overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-100 dark:border-white/10 ${
                        imageIndex % 3 === 0 ? "aspect-[4/3]" : imageIndex % 3 === 1 ? "aspect-square" : "aspect-[3/4]"
                      }`}
                      onClick={() =>
                        openModal(
                          galleryImages.findIndex(
                            (cat) => cat.category === category.category,
                          ),
                          imageIndex,
                        )
                      }
                      role="button"
                      tabIndex={0}
                      aria-label={image.alt}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openModal(
                            galleryImages.findIndex(
                              (cat) => cat.category === category.category,
                            ),
                            imageIndex,
                          );
                        }
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2a4a]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white text-sm font-medium truncate">
                            {image.alt}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {filteredCategories.length === 0 && (
              <div className="text-center py-16">
                <Images className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {t(language, "noImagesFound") as string}
                </p>
              </div>
            )}
          </>
        }
      </main>

      {/* Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[70] bg-[#060f1c]/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label={allImages[selectedImageIndex]?.alt || (t(language, "gallery") as string)}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors z-10"
            aria-label={t(language, "closeViewer") as string}
            autoFocus
          >
            <X className="w-7 h-7 text-white" />
          </button>

          {/* Previous Button */}
          {selectedImageIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-3 md:left-6 p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors z-10"
              aria-label={t(language, "prevImage") as string}
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </button>
          )}

          {/* Next Button */}
          {selectedImageIndex < allImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-3 md:right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors z-10"
              aria-label={t(language, "nextImage") as string}
            >
              <ChevronRight className="w-7 h-7 text-white" />
            </button>
          )}

          {/* Image Container */}
          <div
            className="relative w-full h-full flex items-center justify-center p-6 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-6xl max-h-full w-full h-full">
              <Image
                src={allImages[selectedImageIndex].src}
                alt={allImages[selectedImageIndex].alt}
                fill
                className="object-contain rounded-lg"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/85 to-transparent pointer-events-none">
            <div className="max-w-7xl mx-auto">
              <p className="text-white text-lg font-medium mb-1">
                {allImages[selectedImageIndex].alt}
              </p>
              <p className="text-gray-300 text-sm">
                {allImages[selectedImageIndex].category} •{" "}
                {selectedImageIndex + 1} / {allImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <CTASection
        titleEn="Were you there? Share your moments"
        titleBn="আপনি কি সেখানে ছিলেন? মুহূর্ত শেয়ার করুন"
        descEn="Send us your photos from SEJ events and programs to feature in our gallery."
        descBn="আমাদের গ্যালারিতে স্থান পেতে SEJ ইভেন্টের ছবি পাঠান।"
        primaryHref="/contact"
        primaryEn="Contact Us"
        primaryBn="যোগাযোগ করুন"
        secondaryHref="/events"
        secondaryEn="View Events"
        secondaryBn="ইভেন্ট দেখুন"
      />
      <Footer />
    </div>
  );
}
