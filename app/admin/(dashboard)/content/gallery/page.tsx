"use client";
import { ContentList } from "@/components/admin/ContentList";

export default function GalleryListPage() {
  return (
    <ContentList
      type="gallery"
      title="Gallery"
      description="Manage photo galleries and albums"
    />
  );
}
