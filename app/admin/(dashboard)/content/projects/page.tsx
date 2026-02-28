"use client";
import { ContentList } from "@/components/admin/ContentList";

export default function ProjectsListPage() {
  return (
    <ContentList
      type="project"
      title="Projects & Initiatives"
      description="Manage projects and initiatives"
    />
  );
}
