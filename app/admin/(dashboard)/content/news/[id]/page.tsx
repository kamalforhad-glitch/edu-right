"use client";
import { use } from "react";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <ContentEditor
      type="news"
      contentId={id}
      backHref="/admin/content/news"
      title="Edit News Article"
    />
  );
}
