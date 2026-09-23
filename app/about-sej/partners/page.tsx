import type { Metadata } from "next";
import PartnersContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "SEJ partners and networks: government agencies, international organizations, academia and civil society for education rights.";

export const metadata: Metadata = {
  title: "Partners & Networks",
  description,
  alternates: { canonical: `${baseUrl}/about-sej/partners` },
  openGraph: {
    title: "Partners & Networks",
    description,
    url: `${baseUrl}/about-sej/partners`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners & Networks",
    description,
  },
};

export default function PartnersPage() {
  return <PartnersContent />;
}
