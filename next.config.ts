import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Backward compatibility: old ERP routes → new SEJ routes
      {
        source: "/about-erp",
        destination: "/about-sej",
        permanent: true,
      },
      {
        source: "/about-erp/:path*",
        destination: "/about-sej/:path*",
        permanent: true,
      },
      // Backward compatibility: old ERP brand asset → new SEJ asset.
      // (Legacy /erp/* gallery paths are served from physical files in
      // public/erp so the image optimizer can resolve them; no redirect
      // is used there because redirects break _next/image optimization.)
      {
        source: "/ERP_logo.png",
        destination: "/SEJ_logo.png",
        permanent: true,
      },
    ];
  },
  async headers() {
    const isVercelProduction =
      process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production";
    const scriptSources = ["'self'", "'unsafe-inline'"];

    if (process.env.NODE_ENV !== "production") {
      scriptSources.push("'unsafe-eval'");
    }

    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "DENY" },
      {
        key: "Permissions-Policy",
        value:
          "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), accelerometer=(), gyroscope=(), magnetometer=()",
      },
      { key: "X-DNS-Prefetch-Control", value: "off" },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
          "frame-src 'self' https://www.openstreetmap.org",
          "object-src 'none'",
          // Legacy ImageBB domains retained for read-only display of existing content;
          // new uploads use Supabase Storage (*.supabase.co)
          "img-src 'self' data: blob: https://i.ibb.co https://ibb.co https://*.imgbb.com https://*.supabase.co https://outspoken.newagebd.com",
          "font-src 'self' data:",
          "style-src 'self' 'unsafe-inline'",
          `script-src ${scriptSources.join(" ")}`,
          "connect-src 'self' https://*.supabase.co",
        ].join("; "),
      },
    ];

    if (isVercelProduction) {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains",
      });
    }

    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  images: {
    // Next.js Image Optimization enabled (responsive sizes, WebP/AVIF).
    // Remote hosts used by CMS content (Supabase Storage, legacy ImageBB,
    // New Age media CDN) are allow-listed below.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Legacy ImageBB — retained for existing content rows (read-only)
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "ibb.co",
      },
      {
        protocol: "https",
        hostname: "**.imgbb.com",
      },
      // Supabase Storage — new uploads (content-images bucket)
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      // New Age media CDN — seed featured images (read-only)
      {
        protocol: "https",
        hostname: "outspoken.newagebd.com",
      },
    ],
  },
};

export default nextConfig;
