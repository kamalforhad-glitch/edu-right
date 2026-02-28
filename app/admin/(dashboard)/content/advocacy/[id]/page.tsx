"use client";
import { use } from "react";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function EditAdvocacyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <ContentEditor
      type="advocacy"
      contentId={id}
      backHref="/admin/content/advocacy"
      title="Edit Advocacy Content"
    />
  );
}
