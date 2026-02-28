"use client";
import { use } from "react";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <ContentEditor
      type="project"
      contentId={id}
      backHref="/admin/content/projects"
      title="Edit Project"
    />
  );
}
