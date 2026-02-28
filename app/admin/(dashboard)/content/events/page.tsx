"use client";
import { ContentList } from "@/components/admin/ContentList";

export default function EventsListPage() {
  return (
    <ContentList
      type="event"
      title="Events"
      description="Manage events and assemblies"
    />
  );
}
