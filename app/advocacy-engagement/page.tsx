import type { Metadata } from "next";
import AdvocacyContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "SEJ advocacy campaigns, parliament sessions and policy watch updates amplifying voices for education rights and reform work.";

export const metadata: Metadata = {
  title: "Advocacy & Engagement",
  description,
  alternates: { canonical: `${baseUrl}/advocacy-engagement` },
  openGraph: {
    title: "Advocacy & Engagement",
    description,
    url: `${baseUrl}/advocacy-engagement`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advocacy & Engagement",
    description,
  },
};

export default function AdvocacyPage() {
  return <AdvocacyContent />;
}
