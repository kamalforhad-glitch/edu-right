"use client";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function NewEventPage() {
  return (
    <ContentEditor
      type="event"
      backHref="/admin/content/events"
      title="Create Event"
    />
  );
}
