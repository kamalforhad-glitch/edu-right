import type { Metadata } from "next";
import ResourcesContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "SEJ resource library: education data, legal frameworks, advocacy toolkits, photos, videos and downloadable documents for all.";

export const metadata: Metadata = {
  title: "Resources & Library",
  description,
  alternates: { canonical: `${baseUrl}/resources` },
  openGraph: {
    title: "Resources & Library",
    description,
    url: `${baseUrl}/resources`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources & Library",
    description,
  },
};

export default function ResourcesPage() {
  return <ResourcesContent />;
}
