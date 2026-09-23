import type { Metadata } from "next";
import GetInvolvedContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "Get involved with SEJ: volunteer, intern, donate, partner or join the youth network for education rights in Bangladesh today.";

export const metadata: Metadata = {
  title: "Get Involved with SEJ",
  description,
  alternates: { canonical: `${baseUrl}/get-involved` },
  openGraph: {
    title: "Get Involved with SEJ",
    description,
    url: `${baseUrl}/get-involved`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Involved with SEJ",
    description,
  },
};

export default function GetInvolvedPage() {
  return <GetInvolvedContent />;
}
