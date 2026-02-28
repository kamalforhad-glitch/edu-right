"use client";
import { use } from "react";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <ContentEditor
      type="gallery"
      contentId={id}
      backHref="/admin/content/gallery"
      title="Edit Gallery Album"
    />
  );
}
