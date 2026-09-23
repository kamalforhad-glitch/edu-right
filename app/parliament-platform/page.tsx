import type { Metadata } from "next";
import ParliamentContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "The SEJ civic parliament platform: citizen sessions, public hearings and debates giving voice to education policy in Bangladesh.";

export const metadata: Metadata = {
  title: "Parliament Platform",
  description,
  alternates: { canonical: `${baseUrl}/parliament-platform` },
  openGraph: {
    title: "Parliament Platform",
    description,
    url: `${baseUrl}/parliament-platform`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parliament Platform",
    description,
  },
};

export default function ParliamentPage() {
  return <ParliamentContent />;
}
