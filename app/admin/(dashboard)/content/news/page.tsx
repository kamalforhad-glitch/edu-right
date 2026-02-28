"use client";
import { ContentList } from "@/components/admin/ContentList";

export default function NewsListPage() {
  return (
    <ContentList
      type="news"
      title="News & Publications"
      description="Manage news articles and publications"
    />
  );
}
