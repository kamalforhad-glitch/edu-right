import type { Metadata } from "next";
import GovernanceContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "How SEJ is governed: Parliament Council, Secretariat, Advisory Board and thematic committees serving education rights.";

export const metadata: Metadata = {
  title: "Governance Structure",
  description,
  alternates: { canonical: `${baseUrl}/about-sej/governance` },
  openGraph: {
    title: "Governance Structure",
    description,
    url: `${baseUrl}/about-sej/governance`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Governance Structure",
    description,
  },
};

export default function GovernancePage() {
  return <GovernanceContent />;
}
