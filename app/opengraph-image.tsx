import { ImageResponse } from "next/og";

export const alt = "Omer Zaman — Analytics Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #020617 0%, #0a0e1a 50%, #050810 100%)",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#f1f5f9",
            letterSpacing: "-0.02em",
          }}
        >
          Omer Zaman
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#60a5fa",
            marginTop: 16,
            fontFamily: "monospace",
          }}
        >
          Analytics Engineer
        </div>
      </div>
    ),
    { ...size }
  );
}
