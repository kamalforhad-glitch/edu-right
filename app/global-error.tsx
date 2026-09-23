"use client";

// Global error boundary: replaces the root layout, so it must be fully
// self-contained (no providers, no fonts, no app imports). Bilingual by
// default and exposes no error details.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="bn">
      <body style={{ margin: 0, fontFamily: "Arial, Helvetica, sans-serif", background: "#ffffff", color: "#0a2a4a" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ maxWidth: "560px", textAlign: "center" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", color: "#0e7c6b", marginBottom: "12px" }}>
              SOCIETY FOR EDUCATIONAL JUSTICE
            </p>
            <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>
              Something went wrong / কিছু ভুল হয়েছে
            </h1>
            <div style={{ width: "72px", height: "3px", borderRadius: "9999px", background: "#b98a1f", margin: "0 auto 20px" }} />
            <p style={{ color: "#5b6b7c", lineHeight: 1.6, marginBottom: "28px" }}>
              Please try again. If the problem persists, contact us at contact@sejbd.org.
              <br />
              অনুগ্রহ করে আবার চেষ্টা করুন।
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => reset()}
                style={{ background: "#0a2a4a", color: "#fff", border: 0, borderRadius: "12px", padding: "12px 28px", fontWeight: 700, cursor: "pointer" }}
              >
                Try Again / আবার চেষ্টা করুন
              </button>
              {/* Plain <a>: global-error has no router context, so next/link is unavailable here. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/"
                style={{ display: "inline-block", border: "2px solid #cbd5e1", color: "#0a2a4a", borderRadius: "12px", padding: "10px 28px", fontWeight: 700, textDecoration: "none" }}
              >
                Home / হোম
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
