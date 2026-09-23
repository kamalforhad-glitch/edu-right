import type { Metadata } from "next";
import ResearchContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "SEJ evidence-based research, policy briefs and thematic studies influencing education reform and accountability in Bangladesh.";

export const metadata: Metadata = {
  title: "Research & Policy",
  description,
  alternates: { canonical: `${baseUrl}/research-policy` },
  openGraph: {
    title: "Research & Policy",
    description,
    url: `${baseUrl}/research-policy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research & Policy",
    description,
  },
};

export default function ResearchPage() {
  return <ResearchContent />;
}
