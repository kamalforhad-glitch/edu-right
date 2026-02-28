import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.erp-bd.org"),
  title: {
    default:
      "Education Rights Parliament (ERP) | শিক্ষা অধিকার সংসদ | Education Rights & Policy Reform Bangladesh",
    template: "%s | Education Rights Parliament",
  },
  description:
    "Education Rights Parliament (শিক্ষা অধিকার সংসদ) - A platform of young people working for education rights, policy reform, and nation-building through effective policy formulation in Bangladesh. শিক্ষা সংস্কার, নীতি প্রণয়ন এবং শিক্ষার অধিকার প্রতিষ্ঠায় কাজ করছে।",
  keywords: [
    "Education Rights Parliament",
    "শিক্ষা অধিকার সংসদ",
    "ERP Bangladesh",
    "ERP BD",
    "শিক্ষা সংস্কার",
    "education reform Bangladesh",
    "education policy",
    "শিক্ষা নীতি",
    "curriculum reform",
    "পাঠ্যক্রম সংস্কার",
    "education advocacy",
    "শিক্ষা অধিকার",
    "education rights",
    "July uprising",
    "জুলাই গণঅভ্যুত্থান",
    "student movement Bangladesh",
    "শিক্ষার্থী আন্দোলন",
    "education leadership",
    "youth parliament",
    "তরুণ নেতৃত্ব",
  ],
  authors: [{ name: "Education Rights Parliament" }],
  creator: "Education Rights Parliament",
  publisher: "Education Rights Parliament",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/ERP_logo.png",
    shortcut: "/ERP_logo.png",
    apple: "/ERP_logo.png",
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: ["en_US"],
    url: "https://www.erp-bd.org",
    siteName: "Education Rights Parliament | শিক্ষা অধিকার সংসদ",
    title:
      "Education Rights Parliament | শিক্ষা অধিকার সংসদ - Education Rights & Policy Reform",
    description:
      "শিক্ষা অধিকার সংসদ - বাংলাদেশে শিক্ষা সংস্কার, নীতি প্রণয়ন এবং শিক্ষার অধিকার প্রতিষ্ঠায় কাজ করছে তরুণদের প্ল্যাটফর্ম। Working for education rights, policy reform, and nation-building in Bangladesh.",
    images: [
      {
        url: "/ERP_logo.png",
        width: 1200,
        height: 1200,
        alt: "Education Rights Parliament Logo | শিক্ষা অধিকার সংসদ",
      },
      {
        url: "/erp/EducatorLeaderShipSummit2025Cover.jpg",
        width: 1200,
        height: 630,
        alt: "Education Rights Parliament - Educator Leadership Summit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Education Rights Parliament | শিক্ষা অধিকার সংসদ",
    description:
      "শিক্ষা সংস্কার, নীতি প্রণয়ন এবং শিক্ষার অধিকার প্রতিষ্ঠায় কাজ করছে। Working for education rights and policy reform in Bangladesh.",
    images: ["/ERP_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.erp-bd.org",
    languages: {
      en: "https://www.erp-bd.org",
      bn: "https://www.erp-bd.org",
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="your-verification-code"
        />
        <meta name="language" content="Bengali, English" />
        <meta name="geo.region" content="BD" />
        <meta name="geo.placename" content="Dhaka" />
        <link rel="canonical" href="https://www.erp-bd.org" />
        <link rel="icon" href="/ERP_logo.png" />
        <meta name="developer" content="Abir Kolin" />
        <meta
          name="developer-linkedin"
          content="https://www.linkedin.com/in/abirkolin"
        />
        <meta name="developer-github" content="https://github.com/kolinabir" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Education Rights Parliament",
              alternateName: ["শিক্ষা অধিকার সংসদ", "ERP Bangladesh", "ERP BD"],
              url: "https://www.erp-bd.org",
              logo: "https://www.erp-bd.org/ERP_logo.png",
              image: "https://www.erp-bd.org/ERP_logo.png",
              description:
                "শিক্ষা অধিকার সংসদ - বাংলাদেশে শিক্ষা সংস্কার ও নীতি প্রণয়নে কাজ করছে তরুণদের প্ল্যাটফর্ম। A platform of young people working for education rights and policy reform in Bangladesh.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BD",
                addressLocality: "Dhaka",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "educationrightsparliament@gmail.com",
                contactType: "Customer Service",
              },
              sameAs: [
                "https://www.facebook.com/profile.php?id=61566573296753",
                "https://www.linkedin.com/company/education-rights-parliament/",
                "https://www.youtube.com/@user-zy6nt8fv6e",
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Developed by Abir Kolin */}
        {/* LinkedIn: https://www.linkedin.com/in/abirkolin */}
        {/* GitHub: https://github.com/kolinabir */}
        <div
          style={{ display: "none" }}
          data-developer="abirkolin"
          data-developer-linkedin="https://www.linkedin.com/in/abirkolin"
          data-developer-github="https://github.com/kolinabir"
        >
          Developed by Abir Kolin
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
