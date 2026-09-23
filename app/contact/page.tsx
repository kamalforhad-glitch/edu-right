import type { Metadata } from "next";
import ContactContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "Contact SEJ in Dhaka, Bangladesh: office information, location map, social media links and a message form for all queries.";

export const metadata: Metadata = {
  title: "Contact SEJ Bangladesh",
  description,
  alternates: { canonical: `${baseUrl}/contact` },
  openGraph: {
    title: "Contact SEJ Bangladesh",
    description,
    url: `${baseUrl}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SEJ Bangladesh",
    description,
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
