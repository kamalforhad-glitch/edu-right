import type { Metadata } from "next";
import OurStoryContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "The SEJ story: why the movement was formed, its milestones from 2023 to 2026, and its place in the global right-to-education movement.";

export const metadata: Metadata = {
  title: "Our Story",
  description,
  alternates: { canonical: `${baseUrl}/about-sej/our-story` },
  openGraph: {
    title: "Our Story",
    description,
    url: `${baseUrl}/about-sej/our-story`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story",
    description,
  },
};

export default function OurStoryPage() {
  return <OurStoryContent />;
}
