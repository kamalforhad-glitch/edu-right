"use client";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function NewParliamentPage() {
  return (
    <ContentEditor
      type="parliament"
      backHref="/admin/content/parliament"
      title="Create Parliament Platform Content"
    />
  );
}
