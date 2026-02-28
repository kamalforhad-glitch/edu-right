"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import Image from "next/image";
import { Images } from "lucide-react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryDBItem {
  _id: string;
  title: string;
  titleBn?: string;
  category?: string;
  images?: string[];
  featuredImage?: string;
  createdAt: string;
}

interface GalleryCategory {
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
    category: item.category || item._id,
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
      />

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedCategory === "all" ?
                "bg-teal-600 text-white shadow-lg"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {t(language, "allPhotos") as string}
          </button>
          {galleryImages.map((category) => (
            <button
              key={category.category}
              onClick={() => setSelectedCategory(category.category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.category ?
                  "bg-teal-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
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
              <div key={category.category} className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                      onClick={() =>
                        openModal(
                          galleryImages.findIndex(
                            (cat) => cat.category === category.category,
                          ),
                          imageIndex,
                        )
                      }
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8 text-white" />
          </button>

          {/* Previous Button */}
          {selectedImageIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
          )}

          {/* Next Button */}
          {selectedImageIndex < allImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          )}

          {/* Image Container */}
          <div
            className="relative w-full h-full flex items-center justify-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-7xl max-h-full w-full h-full">
              <Image
                src={allImages[selectedImageIndex].src}
                alt={allImages[selectedImageIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent">
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
    </div>
  );
}
