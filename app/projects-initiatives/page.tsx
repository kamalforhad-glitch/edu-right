import type { Metadata } from "next";
import ProjectsContent from "./page-client";

const baseUrl = "https://www.sejbd.org";
const description =
  "SEJ projects and initiatives: explore ongoing, upcoming and completed programs driving education change across Bangladesh.";

export const metadata: Metadata = {
  title: "Projects & Initiatives",
  description,
  alternates: { canonical: `${baseUrl}/projects-initiatives` },
  openGraph: {
    title: "Projects & Initiatives",
    description,
    url: `${baseUrl}/projects-initiatives`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Initiatives",
    description,
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
