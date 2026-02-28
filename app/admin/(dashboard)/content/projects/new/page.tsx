"use client";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function NewProjectPage() {
  return (
    <ContentEditor
      type="project"
      backHref="/admin/content/projects"
      title="Create Project"
    />
  );
}
