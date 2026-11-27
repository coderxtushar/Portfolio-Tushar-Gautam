import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { PiArrowLeftBold, PiDownloadSimpleBold, PiEnvelopeSimpleBold } from "react-icons/pi";
import Board from "@/components/Board";
import PrintButton from "@/components/PrintButton";
import LiveLink from "@/components/LiveLink";
import Signature from "@/components/Signature";
import Button from "@/components/ui/Button";
import { profile } from "@/lib/data";
import { resume } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name}, ${profile.title} at ${profile.company}.`,
  alternates: { canonical: "/resume" },
};

function Heading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="border-b border-paper-rule pb-2 font-sans text-[0.9375rem] font-semibold uppercase tracking-[0.14em] text-paper-ink"
    >
      {children}
    </h2>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((item) => (
        <li key={item.slice(0, 32)} className="flex gap-2.5 text-[1.0625rem] leading-relaxed text-pretty">
          <span aria-hidden="true" className="mt-[0.66em] size-1.5 shrink-0 rounded-full bg-paper-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * The resume as a real HTML document: a paper sheet on the site's ground,
 * printable on its own (the print stylesheet hides everything else), with the
 * PDF one click away. Hovering the name signs it.
 */
export default function ResumePage() {
  return (
    <Board>
      <div className="shell pb-24 pt-28 md:pt-32">
        {/* Toolbar */}
        <div className="no-print flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="legend inline-flex min-h-11 items-center gap-2 rounded-full text-ink-3 transition-colors duration-150 hover:text-lime"
          >
            <PiArrowLeftBold className="size-3.5" aria-hidden="true" />
            Portfolio
          </Link>
          <div className="flex flex-wrap gap-3">
            <Button href={`mailto:${resume.email}`} variant="ghost" icon={PiEnvelopeSimpleBold}>
              Email me
            </Button>
            <PrintButton />
            <Button
              href={profile.resumePath}
              variant="lime"
              icon={PiDownloadSimpleBold}
              download="Tushar_Gautam_Resume.pdf"
            >
              Download PDF
            </Button>
          </div>
        </div>

        <article
          aria-labelledby="resume-name"
          className="paper mx-auto mt-8 max-w-[68rem] rounded-card px-6 py-10 shadow-[0_40px_120px_-40px_rgba(123,97,255,0.55)] sm:px-14 sm:py-16 lg:px-20"
        >
          {/* Header: hover the name to sign it */}
          <header className="text-center">
            <div className="sig-host group/sig relative inline-block cursor-default px-4" tabIndex={0}>
              <h1
                id="resume-name"
                className="font-display text-[2.6rem] font-extrabold uppercase leading-none tracking-[0.02em] text-paper-ink transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/sig:scale-[0.97] group-hover/sig:opacity-10 group-hover/sig:blur-[2px] group-focus-within/sig:scale-[0.97] group-focus-within/sig:opacity-10 group-focus-within/sig:blur-[2px] sm:text-[3.6rem] lg:text-[4rem]"
              >
                {resume.name}
              </h1>
              <Signature className="absolute left-1/2 top-1/2 w-[112%] max-w-none -translate-x-1/2 -translate-y-[58%] -rotate-3" />
            </div>
            <p className="mt-5 text-[1.0625rem] font-medium text-paper-accent">{resume.role}</p>
            <p className="mt-2 text-[1.0625rem]">
              {resume.location} ·{" "}
              <a
                href={`mailto:${resume.email}`}
                className="underline decoration-paper-rule underline-offset-4 hover:text-paper-accent"
              >
                {resume.email}
              </a>
            </p>
            <p className="mt-1.5 flex flex-wrap justify-center gap-x-2 text-[1.0625rem]">
              {resume.links.map((link, index) => (
                <span key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper-ink underline decoration-paper-rule underline-offset-4 hover:text-paper-accent"
                  >
                    {link.label}
                  </a>
                  {index < resume.links.length - 1 ? (
                    <span aria-hidden="true" className="ml-2">
                      ·
                    </span>
                  ) : null}
                </span>
              ))}
            </p>
          </header>

          <section className="mt-11" aria-labelledby="r-education">
            <Heading id="r-education">Education</Heading>
            {resume.education.map((entry) => (
              <div key={entry.school} className="mt-3 grid gap-x-6 sm:grid-cols-[1fr_auto]">
                <p className="text-[1.1875rem] font-semibold text-paper-ink">{entry.school}</p>
                <p className="text-[1.0625rem] italic sm:text-right">{entry.place}</p>
                <p className="text-[1.0625rem]">{entry.degree}</p>
                <p className="text-[1.0625rem] italic sm:text-right" data-numeric>
                  {entry.period}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-10" aria-labelledby="r-experience">
            <Heading id="r-experience">Work experience</Heading>
            {resume.experience.map((role) => (
              <div key={role.company} className="mt-3">
                <div className="grid gap-x-6 sm:grid-cols-[1fr_auto]">
                  <p className="text-[1.1875rem] font-semibold text-paper-ink">
                    {role.title}, {role.company}
                  </p>
                  <p className="text-[1.0625rem] italic sm:text-right" data-numeric>
                    {role.period}
                  </p>
                  <p className="text-[1.0625rem] italic">{role.place}</p>
                </div>
                <Points items={role.points} />
              </div>
            ))}
          </section>

          <section className="mt-10" aria-labelledby="r-projects">
            <Heading id="r-projects">Projects / Open-source</Heading>
            {resume.projects.map((project) => (
              <div key={project.name} className="print-keep mt-4">
                <div className="grid gap-x-6 sm:grid-cols-[auto_1fr]">
                  <p className="flex flex-wrap items-baseline gap-x-3 text-[1.1875rem] font-semibold text-paper-ink">
                    {/* Name opens the deployed site; hover shows a preview of it */}
                    <LiveLink
                      href={project.live}
                      preview={project.preview}
                      className="underline decoration-paper-rule underline-offset-4 transition-colors hover:text-paper-accent hover:decoration-paper-accent"
                    >
                      {project.name}
                    </LiveLink>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-print text-[0.875rem] font-medium text-paper-ink-2 underline decoration-paper-rule underline-offset-4 hover:text-paper-accent"
                    >
                      Code
                    </a>
                  </p>
                  <p className="text-[1.0625rem] italic sm:text-right">{project.stack}</p>
                </div>
                <Points items={project.points} />
              </div>
            ))}
          </section>

          <section className="mt-10" aria-labelledby="r-skills">
            <Heading id="r-skills">Technical skills</Heading>
            <dl className="mt-3 space-y-1.5 text-[1.0625rem] leading-relaxed">
              {resume.skills.map((group) => (
                <div key={group.label}>
                  <dt className="inline font-semibold text-paper-ink">{group.label}: </dt>
                  <dd className="inline">{group.items}.</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>

        <p className="no-print mt-5 text-center text-sm text-ink-3">
          Prefer a file? Use Download PDF above.
        </p>
      </div>
    </Board>
  );
}
