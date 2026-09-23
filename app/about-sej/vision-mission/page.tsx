import type { Metadata } from "next";
import VisionMissionContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "SEJ vision, mission, core values and strategic goals for equitable, inclusive and quality education for all in Bangladesh.";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description,
  alternates: { canonical: `${baseUrl}/about-sej/vision-mission` },
  openGraph: {
    title: "Vision & Mission",
    description,
    url: `${baseUrl}/about-sej/vision-mission`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision & Mission",
    description,
  },
};

export default function VisionMissionPage() {
  return <VisionMissionContent />;
}
