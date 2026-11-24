import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PiArrowLeftBold,
  PiArrowRightBold,
  PiArrowSquareOutBold,
  PiGithubLogoBold,
} from "react-icons/pi";
import Board from "@/components/Board";
import Button from "@/components/ui/Button";
import Provenance from "@/components/ui/Provenance";
import { projectBySlug, projects } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: `${project.tagline}. ${project.problem}`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title}: ${project.tagline}`,
      description: project.problem,
    },
  };
}

/* One cell of the datasheet's title block */
function Cell({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border-line p-5 md:p-6 ${className}`}>
      <dt className="legend text-ink-3">{label}</dt>
      <dd className="mt-2.5 text-sm text-ink">{children}</dd>
    </div>
  );
}

/**
 * A case study is the component's datasheet: title block, application note,
 * features, pinout (stack) and provenance, then related parts.
 */
export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = projects.findIndex((entry) => entry.slug === slug);

  if (index === -1) notFound();

  const project = projects[index];
  const previous = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <Board>
      <div className="shell pb-24 pt-28 md:pt-32">
        <Link
          href="/#work"
          className="legend inline-flex min-h-11 items-center gap-2 rounded-full text-ink-3 transition-colors duration-150 hover:text-lime"
        >
          <PiArrowLeftBold className="size-3.5" aria-hidden="true" />
          All work
        </Link>

        {/* Title block */}
        <header className="card mt-6 overflow-hidden">
          <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)]">
            {/* The component itself, morphing in from the home board */}
            <div className="grid-panel relative isolate flex items-center justify-center overflow-hidden border-b border-line p-8 md:border-b-0 md:border-r">
              <span aria-hidden="true" className="pointer-events-none absolute -left-10 -top-10 -z-10 size-64 rounded-full bg-violet/40 blur-3xl" />
              <div
                className="card relative w-full max-w-[17rem] rounded-ic border-violet-edge p-5 shadow-[0_24px_60px_-24px_rgba(123,97,255,0.7)]"
                style={{ viewTransitionName: `ic-${project.slug}` }}
                aria-hidden="true"
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-3">
                    {project.tech
                      .filter((tech) => tech.icon)
                      .slice(0, 3)
                      .map((tech) => (tech.icon ? <tech.icon key={tech.name} className="size-3.5" /> : null))}
                  </span>
                  <span className="led" data-state="live" />
                </span>
                <span className="semi-expanded mt-6 block text-xl font-bold leading-tight tracking-[-0.02em] text-ink">
                  {project.title}
                </span>
                <span className="semi-expanded mt-6 block text-value font-bold text-lime" data-numeric>
                  {project.metric?.value ?? "—"}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <h1 className="semi-expanded text-h1 font-bold text-ink text-balance">
                {project.title}
              </h1>
              <p className="mt-4 max-w-[52ch] text-lead text-ink-2 text-pretty">{project.tagline}</p>

              {project.liveUrl || project.repoUrl ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.liveUrl ? (
                    <Button href={project.liveUrl} variant="lime" icon={PiArrowSquareOutBold} external>
                      Live demo
                    </Button>
                  ) : null}
                  {project.repoUrl ? (
                    <Button href={project.repoUrl} variant="ghost" icon={PiGithubLogoBold} external>
                      Source
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          <dl className="grid border-t border-line sm:grid-cols-3">
            <Cell label="Focus" className="border-b sm:border-b-0 sm:border-r">
              {project.tagline}
            </Cell>
            <Cell label="Period" className="border-b sm:border-b-0 sm:border-r">
              <span data-numeric>{project.period}</span>
            </Cell>
            <Cell label="Measured value">
              {project.metric ? (
                <>
                  <span className="font-semibold text-lime" data-numeric>
                    {project.metric.value}
                  </span>{" "}
                  {project.metric.label}
                </>
              ) : (
                <span className="text-ink-3">Not measured</span>
              )}
            </Cell>
          </dl>
        </header>

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <div className="space-y-14">
            <section aria-labelledby="application-heading">
              <h2 id="application-heading" className="semi-expanded text-h3 font-bold text-ink">
                Application
              </h2>
              <p className="mt-4 max-w-[62ch] text-lead text-ink-2 text-pretty">{project.problem}</p>
            </section>

            <section aria-labelledby="features-heading">
              <h2 id="features-heading" className="semi-expanded text-h3 font-bold text-ink">
                Features
              </h2>
              <ol className="mt-5 border-t border-line">
                {project.points.map((point) => (
                  <li key={point} className="flex gap-5 border-b border-line py-5 text-body text-ink-2 text-pretty">
                    <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-violet" />
                    <span className="max-w-[64ch]">{point}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="space-y-12">
            <section aria-labelledby="pinout-heading">
              <h2 id="pinout-heading" className="semi-expanded text-h3 font-bold text-ink">
                Built with
              </h2>
              <ul className="mt-5">
                {project.tech.map((tech) => (
                  <li key={tech.name} className="flex h-10 items-center gap-3 border-b border-line">
                    <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-violet" />
                    {tech.icon ? <tech.icon className="size-3.5 text-ink-3" aria-hidden="true" /> : null}
                    <span className="text-sm text-ink-2">{tech.name}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="provenance-heading">
              <h2 id="provenance-heading" className="semi-expanded text-h3 font-bold text-ink">
                Provenance
              </h2>
              <Provenance project={project} className="mt-4" />
              {project.liveUrl || project.repoUrl ? null : (
                <p className="mt-3 text-sm text-ink-3 text-pretty">
                  Live and source links will be added once they are public.
                </p>
              )}
            </section>
          </aside>
        </div>

        <nav
          aria-label="Other case studies"
          className="mt-20 grid gap-4 border-t border-line-strong pt-10 sm:grid-cols-2"
        >
          {previous ? (
            <a
              href={`/projects/${previous.slug}`}
              className="card glow-hover group p-6"
            >
              <span className="legend flex items-center gap-2 text-ink-3">
                <PiArrowLeftBold className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
                Previous
              </span>
              <span className="semi-expanded mt-3 block text-h3 font-bold text-ink">
                {previous.title}
              </span>
            </a>
          ) : null}

          {next ? (
            <a
              href={`/projects/${next.slug}`}
              className="card glow-hover group p-6 text-right sm:col-start-2"
            >
              <span className="legend flex items-center justify-end gap-2 text-ink-3">
                Next
                <PiArrowRightBold className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </span>
              <span className="semi-expanded mt-3 block text-h3 font-bold text-ink">
                {next.title}
              </span>
            </a>
          ) : null}
        </nav>
      </div>
    </Board>
  );
}
