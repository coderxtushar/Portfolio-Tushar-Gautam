import { ImageResponse } from "next/og";
import { profile, projectBySlug, projects } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);

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
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", width: 12, height: 12, borderRadius: 9999, backgroundColor: "#d4ff3a" }} />
          <div style={{ display: "flex", fontSize: 22, color: "#948db6", letterSpacing: 3 }}>
            CASE STUDY
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              color: "#f4f2ff",
              letterSpacing: -2.5,
              lineHeight: 1.05,
            }}
          >
            {project?.title ?? "Case study"}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 32,
              color: "#c9c3e6",
              maxWidth: 900,
            }}
          >
            {project?.tagline ?? ""}
          </div>
          {project?.metric ? (
            <div
              style={{
                display: "flex",
                marginTop: 26,
                alignItems: "center",
                gap: 12,
                border: "1px solid rgba(150,128,255,0.5)",
                backgroundColor: "rgba(123,97,255,0.18)",
                borderRadius: 9999,
                padding: "10px 20px",
                fontSize: 26,
                color: "#d4ff3a",
              }}
            >
              {project.metric.value} {project.metric.label}
            </div>
          ) : null}
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
          <div style={{ display: "flex", fontSize: 24, fontWeight: 500, color: "#f4f2ff" }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#948db6" }}>
            {project?.period ?? ""}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
