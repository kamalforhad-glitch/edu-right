"use client";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function NewAdvocacyPage() {
  return (
    <ContentEditor
      type="advocacy"
      backHref="/admin/content/advocacy"
      title="Create Advocacy Content"
    />
  );
}
