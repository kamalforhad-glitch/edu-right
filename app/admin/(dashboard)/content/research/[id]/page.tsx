"use client";
import { use } from "react";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function EditResearchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <ContentEditor
      type="research"
      contentId={id}
      backHref="/admin/content/research"
      title="Edit Research/Policy Document"
    />
  );
}
