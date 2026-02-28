"use client";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function NewGalleryPage() {
  return (
    <ContentEditor
      type="gallery"
      backHref="/admin/content/gallery"
      title="Create Gallery Album"
    />
  );
}
