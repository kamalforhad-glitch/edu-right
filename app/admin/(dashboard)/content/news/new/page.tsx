"use client";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function NewNewsPage() {
  return (
    <ContentEditor
      type="news"
      backHref="/admin/content/news"
      title="Create News Article"
    />
  );
}
