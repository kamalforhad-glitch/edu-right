import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

// Self-hosted Latin families (bundled — no Google Fonts request at build
// or runtime, Turbopack-safe). Variable names unchanged.
const geistSans = localFont({
  src: [
    { path: "./fonts/geist-latin-400.woff2", weight: "400" },
    { path: "./fonts/geist-latin-500.woff2", weight: "500" },
    { path: "./fonts/geist-latin-600.woff2", weight: "600" },
    { path: "./fonts/geist-latin-700.woff2", weight: "700" },
    { path: "./fonts/geist-latin-800.woff2", weight: "800" },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: [
    { path: "./fonts/geist-mono-latin-400.woff2", weight: "400" },
    { path: "./fonts/geist-mono-latin-700.woff2", weight: "700" },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

// Bengali families (Noto Sans Bengali, Noto Serif Bengali) and the
// institutional serif (Source Serif 4) are variable fonts served via
// hand-written @font-face rules in globals.css with exact unicode-range
// splitting. next/font/local cannot express unicode-range, so separate
// subset files would collapse to a single subset — the CSS approach keeps
// Bengali + Latin glyph coverage pixel-identical to next/font/google.
// Their CSS variables (--font-noto-bengali, --font-bengali-serif,
// --font-display) are defined on :root, names unchanged.

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
    icon: "/SEJ_logo.png",
    shortcut: "/SEJ_logo.png",
    apple: "/SEJ_logo.png",
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
        url: `${baseUrl}/SEJ_logo.png`,
        width: 1200,
        height: 1200,
        alt: "Society for Educational Justice Logo | শিক্ষা অধিকার সংসদ",
      },
      {
        url: `${baseUrl}/sej/EducatorLeaderShipSummit2025Cover.jpg`,
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
    images: [`${baseUrl}/SEJ_logo.png`],
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
              logo: `${baseUrl}/SEJ_logo.png`,
              image: `${baseUrl}/SEJ_logo.png`,
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
        {/* Theme init must run before paint to avoid a dark-mode flash. */}
        <Script
          id="sej-theme-init"
          strategy="beforeInteractive"
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
        <Script
          id="sej-reveal-observer"
          strategy="afterInteractive"
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
