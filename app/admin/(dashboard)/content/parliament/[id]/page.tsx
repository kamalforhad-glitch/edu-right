"use client";
import { use } from "react";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function EditParliamentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <ContentEditor
      type="parliament"
      contentId={id}
      backHref="/admin/content/parliament"
      title="Edit Parliament Platform Content"
    />
  );
}
