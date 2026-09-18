import { ImageResponse } from "next/og";

export const alt = "SOCIETY FOR EDUCATIONAL JUSTICE | শিক্ষা অধিকার সংসদ";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #0D9488 0%, #2563EB 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        SOCIETY FOR EDUCATIONAL JUSTICE
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        শিক্ষা অধিকার সংসদ
      </div>
      <div
        style={{
          fontSize: 32,
          color: "rgba(255, 255, 255, 0.9)",
          textAlign: "center",
        }}
      >
        Working for Education Rights & Policy Reform in Bangladesh
      </div>
    </div>,
    {
      ...size,
    },
  );
}
