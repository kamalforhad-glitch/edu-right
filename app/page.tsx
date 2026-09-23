import type { Metadata } from "next";
import HomeContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "Society for Educational Justice (SEJ) advances education rights, policy reform and youth leadership across Bangladesh. Join us.";

export const metadata: Metadata = {
  title: {
    absolute: "SEJ | Society for Educational Justice Bangladesh",
  },
  description,
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "SEJ | Society for Educational Justice Bangladesh",
    description,
    url: baseUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEJ | Society for Educational Justice Bangladesh",
    description,
  },
};

export default function HomePage() {
  return <HomeContent />;
}
