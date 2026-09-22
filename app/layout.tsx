import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
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

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const baseUrl = "https://www.sejbd.org";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default:
      "Society for Educational Justice | শিক্ষা অধিকার সংসদ | Education Rights & Policy Reform Bangladesh",
    template: "%s | Society for Educational Justice",
  },
  description:
    "Society for Educational Justice (শিক্ষা অধিকার সংসদ) - A platform of young people working for education rights, policy reform, and nation-building through effective policy formulation in Bangladesh. শিক্ষা সংস্কার, নীতি প্রণয়ন এবং শিক্ষার অধিকার প্রতিষ্ঠায় কাজ করছে।",
  keywords: [
    "Society for Educational Justice",
    "শিক্ষা অধিকার সংসদ",
    "SEJ Bangladesh",
    "SEJ BD",
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
  authors: [{ name: "Society for Educational Justice" }],
  creator: "Society for Educational Justice",
  publisher: "Society for Educational Justice",
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
    url: baseUrl,
    siteName: "Society for Educational Justice | শিক্ষা অধিকার সংসদ",
    title:
      "Society for Educational Justice | শিক্ষা অধিকার সংসদ - Education Rights & Policy Reform",
    description:
      "শিক্ষা অধিকার সংসদ - বাংলাদেশে শিক্ষা সংস্কার, নীতি প্রণয়ন এবং শিক্ষার অধিকার প্রতিষ্ঠায় কাজ করছে তরুণদের প্ল্যাটফর্ম। Working for education rights, policy reform, and nation-building in Bangladesh.",
    images: [
      {
        url: `${baseUrl}/ERP_logo.png`,
        width: 1200,
        height: 1200,
        alt: "Society for Educational Justice Logo | শিক্ষা অধিকার সংসদ",
      },
      {
        url: `${baseUrl}/erp/EducatorLeaderShipSummit2025Cover.jpg`,
        width: 1200,
        height: 630,
        alt: "Society for Educational Justice - Educator Leadership Summit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Society for Educational Justice | শিক্ষা অধিকার সংসদ",
    description:
      "শিক্ষা সংস্কার, নীতি প্রণয়ন এবং শিক্ষার অধিকার প্রতিষ্ঠায় কাজ করছে। Working for education rights and policy reform in Bangladesh.",
    images: [`${baseUrl}/ERP_logo.png`],
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
    canonical: baseUrl,
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
        <meta name="language" content="Bengali, English" />
        <meta name="geo.region" content="BD" />
        <meta name="geo.placename" content="Dhaka" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Society for Educational Justice",
              alternateName: ["শিক্ষা অধিকার সংসদ", "SEJ Bangladesh", "SEJ BD"],
              url: baseUrl,
              logo: `${baseUrl}/ERP_logo.png`,
              image: `${baseUrl}/ERP_logo.png`,
              description:
                "শিক্ষা অধিকার সংসদ - বাংলাদেশে শিক্ষা সংস্কার ও নীতি প্রণয়নে কাজ করছে তরুণদের প্ল্যাটফর্ম। A platform of young people working for education rights and policy reform in Bangladesh.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BD",
                addressLocality: "Dhaka",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "contact@sejbd.org",
                contactType: "Customer Service",
              },
              sameAs: [
                "https://www.facebook.com/profile.php?id=61566573296753",
                "https://www.linkedin.com/company/society-for-educational-justice/",
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
        className={`${geistSans.variable} ${geistMono.variable} ${notoBengali.variable} antialiased`}
        style={{ fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif" }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-teal-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Providers>
          <main id="main-content">
            {children}
          </main>
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var observer = new IntersectionObserver(function(entries) {
                  entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                      entry.target.classList.add('reveal-visible');
                    }
                  });
                }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

                function observeElements() {
                  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger').forEach(function(el) {
                    observer.observe(el);
                  });
                }

                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', observeElements);
                } else {
                  observeElements();
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
