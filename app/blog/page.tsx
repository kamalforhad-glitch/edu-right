import type { Metadata } from "next";
import BlogContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "Articles, opinion and field notes from the Society for Educational Justice on education rights, policy reform and advocacy in Bangladesh.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: `${baseUrl}/blog` },
  openGraph: {
    title: "Blog",
    description,
    url: `${baseUrl}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description,
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
