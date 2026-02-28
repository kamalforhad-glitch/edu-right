"use client";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function NewResearchPage() {
  return (
    <ContentEditor
      type="research"
      backHref="/admin/content/research"
      title="Create Research/Policy Document"
    />
  );
}
