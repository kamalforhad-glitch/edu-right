import type { Metadata } from "next";
import AboutContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "Who SEJ is: a youth-led civic platform for education rights, policy dialogue and reform in Bangladesh. Vision, values and scope.";

export const metadata: Metadata = {
  title: "About SEJ Bangladesh",
  description,
  alternates: { canonical: `${baseUrl}/about-sej` },
  openGraph: {
    title: "About SEJ Bangladesh",
    description,
    url: `${baseUrl}/about-sej`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About SEJ Bangladesh",
    description,
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
