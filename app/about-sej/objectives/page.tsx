import type { Metadata } from "next";
import ObjectivesContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "SEJ main and ancillary objectives: research, advocacy, events, global engagement and accountability for education reform.";

export const metadata: Metadata = {
  title: "Our Objectives",
  description,
  alternates: { canonical: `${baseUrl}/about-sej/objectives` },
  openGraph: {
    title: "Our Objectives",
    description,
    url: `${baseUrl}/about-sej/objectives`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Objectives",
    description,
  },
};

export default function ObjectivesPage() {
  return <ObjectivesContent />;
}
