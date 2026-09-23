import type { Metadata } from "next";
import EventsContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "SEJ events calendar: upcoming conferences, policy dialogues and workshops, plus the archive of past education events.";

export const metadata: Metadata = {
  title: "Events & Conferences",
  description,
  alternates: { canonical: `${baseUrl}/events` },
  openGraph: {
    title: "Events & Conferences",
    description,
    url: `${baseUrl}/events`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events & Conferences",
    description,
  },
};

export default function EventsPage() {
  return <EventsContent />;
}
