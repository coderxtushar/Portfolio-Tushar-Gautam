import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name} — ${profile.title} at ${profile.company}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c0a14",
          backgroundImage: "radial-gradient(760px 460px at 88% 0%, rgba(123,97,255,0.45), transparent 62%), radial-gradient(520px 320px at 6% 100%, rgba(212,255,58,0.12), transparent 60%)",
          padding: "68px 76px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: 9999,
              backgroundColor: "#d4ff3a",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#948db6" }}>
            {profile.title.toUpperCase()} · {profile.company.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              color: "#f4f2ff",
              letterSpacing: -3,
              lineHeight: 1.04,
              maxWidth: 940,
            }}
          >
            Web products and the systems that grade
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              color: "#d4ff3a",
              letterSpacing: -3,
              lineHeight: 1.04,
            }}
          >
            AI agents.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(196,184,255,0.24)",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", fontSize: 25, fontWeight: 500, color: "#f4f2ff" }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#948db6" }}>
            {profile.siteUrl.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
