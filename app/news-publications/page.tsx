import type { Metadata } from "next";
import NewsContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "SEJ in the news: media coverage, press stories, publications and event highlights on education reform and curriculum advocacy.";

export const metadata: Metadata = {
  title: "News & Publications",
  description,
  alternates: { canonical: `${baseUrl}/news-publications` },
  openGraph: {
    title: "News & Publications",
    description,
    url: `${baseUrl}/news-publications`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News & Publications",
    description,
  },
};

export default function NewsPage() {
  return <NewsContent />;
}
