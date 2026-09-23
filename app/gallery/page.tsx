import type { Metadata } from "next";
import GalleryContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "SEJ photo gallery: moments from summits, roundtables, community programs, youth events and field work across Bangladesh.";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description,
  alternates: { canonical: `${baseUrl}/gallery` },
  openGraph: {
    title: "Photo Gallery",
    description,
    url: `${baseUrl}/gallery`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Gallery",
    description,
  },
};

export default function GalleryPage() {
  return <GalleryContent />;
}
