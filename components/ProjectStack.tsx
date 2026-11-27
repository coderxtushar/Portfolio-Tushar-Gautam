"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { PiArrowRightBold, PiArrowUpRightBold, PiGithubLogoBold } from "react-icons/pi";
import { projects, type Project } from "@/lib/data";
import CountUp from "./motion/CountUp";
import LiveLink from "./LiveLink";

const featured = projects.filter((project) => project.featured).slice(0, 4);

/* Snapshots are 1440 wide; the frame shows a 1440×900 window of them */
const FRAME_SOURCE_HEIGHT = 900;

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

type PanelProps = {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
};

function Panel({ project, index, total, progress, reduce }: PanelProps) {
  const start = index / total;
  const end = (index + 1) / total;

  /* Earlier panels settle back as later ones slide over them */
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - index) * 0.035]);
  /* While this panel is on top, its live site scrolls inside the frame */
  const maxPan = project.snapshot ? (1 - FRAME_SOURCE_HEIGHT / project.snapshot.height) * 100 : 0;
  const pan = useTransform(progress, [start, end], ["0%", `-${Math.max(0, maxPan)}%`]);

  const tone =
    index % 2 === 0
      ? "bg-[radial-gradient(60rem_30rem_at_0%_0%,rgba(123,97,255,0.28),transparent_60%)]"
      : "bg-[radial-gradient(60rem_30rem_at_100%_0%,rgba(212,255,58,0.10),transparent_55%)]";

  return (
    <li
      id={`project-${project.slug}`}
      className="scroll-mt-28 md:sticky md:mb-[26vh] md:last:mb-0"
      style={{ top: `calc(6.5rem + ${index * 1.1}rem)` }}
    >
      <motion.article
        style={reduce ? undefined : { scale, transformOrigin: "50% 0%" }}
        className={`card relative grid grid-cols-[minmax(0,1fr)] gap-8 overflow-hidden p-6 shadow-[0_-30px_80px_-40px_rgba(7,6,13,0.9)] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10 md:p-9 lg:p-11 ${tone}`}
      >
        {/* Copy */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="semi-expanded text-[2.1rem] font-bold leading-none tracking-[-0.03em] text-ink md:text-[2.6rem]">
              {project.liveUrl ? (
                <LiveLink
                  href={project.liveUrl}
                  className="transition-colors duration-200 hover:text-violet-soft"
                >
                  {project.title}
                </LiveLink>
              ) : (
                project.title
              )}
            </h3>
            {index === 0 ? (
              <span className="legend rounded-full bg-lime px-2.5 py-1 text-[0.625rem] text-ground">
                Main project
              </span>
            ) : null}
          </div>
          <p className="mt-2.5 text-lead font-medium text-violet-soft">{project.tagline}</p>
          <p className="mt-5 max-w-[46ch] text-body text-ink-2 text-pretty">{project.problem}</p>

          {project.flow ? (
            <ol className="mt-6 flex flex-wrap items-center gap-x-1.5 gap-y-2" aria-label="How it works">
              {project.flow.map((step, position) => (
                <li key={step} className="flex items-center gap-1.5">
                  {/* The arrow travels with the step it leads into, so a wrapped
                      row never ends on a dangling arrow */}
                  {position > 0 ? <PiArrowRightBold className="size-3 text-lime" aria-hidden="true" /> : null}
                  <span className="rounded-full border border-line-strong bg-raise-2/70 px-3 py-1 text-sm text-ink">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          ) : null}

          {project.metric ? (
            <p className="mt-7 flex items-baseline gap-3">
              <CountUp value={project.metric.value} className="semi-expanded text-[2.6rem] font-bold leading-none text-lime" />
              <span className="max-w-[22ch] text-sm leading-snug text-ink-3">{project.metric.label}</span>
            </p>
          ) : null}

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-variant="lime"
                className="pad-btn"
              >
                Visit live site
                <PiArrowUpRightBold className="size-4" aria-hidden="true" />
              </a>
            ) : null}
            <a href={`/projects/${project.slug}`} data-variant="ghost" className="pad-btn">
              Case study
              <PiArrowRightBold className="size-4" aria-hidden="true" />
            </a>
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source on GitHub`}
                className="grid size-11 place-items-center rounded-full border border-line-strong text-ink-2 transition-colors duration-150 hover:border-violet-edge hover:bg-violet-dim hover:text-ink"
              >
                <PiGithubLogoBold className="size-[1.1rem]" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>

        {/* Live snapshot in a browser frame; the whole frame opens the site */}
        {project.snapshot && project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live at ${host(project.liveUrl)}`}
            className="group/frame block self-center overflow-hidden rounded-2xl border border-violet-edge bg-void shadow-[0_30px_80px_-30px_rgba(123,97,255,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-1"
          >
            <span className="flex items-center gap-3 border-b border-line px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-coral/80" />
                <span className="size-2.5 rounded-full bg-violet-soft/80" />
                <span className="size-2.5 rounded-full bg-lime/80" />
              </span>
              <span className="flex-1 truncate rounded-full bg-raise-2 px-3 py-1 text-center font-mono text-[0.75rem] text-ink-3">
                {host(project.liveUrl)}
              </span>
              <PiArrowUpRightBold
                className="size-4 text-ink-3 transition-[color,transform] duration-300 group-hover/frame:text-lime motion-safe:group-hover/frame:rotate-45"
                aria-hidden="true"
              />
            </span>
            <span className="relative block aspect-[16/10] overflow-hidden">
              <motion.span className="absolute inset-x-0 top-0 block" style={reduce ? undefined : { y: pan }}>
                <Image
                  src={project.snapshot.src}
                  alt={`${project.title} live site`}
                  width={1440}
                  height={project.snapshot.height}
                  sizes="(min-width: 1024px) 760px, (min-width: 768px) 58vw, 100vw"
                  className="block h-auto w-full"
                  priority={index === 0}
                />
              </motion.span>
            </span>
          </a>
        ) : null}
      </motion.article>
    </li>
  );
}

/**
 * The four main projects as a stack: each panel pins near the top while its
 * live site scrolls inside the browser frame, then the next panel slides up
 * over it and the earlier ones settle back. On small screens the panels
 * simply follow one another; the snapshots still scroll with the page.
 */
export default function ProjectStack() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.15", "end end"] });

  return (
    <>
      <nav aria-label="Main projects" className="mb-8 flex flex-wrap gap-2">
        {featured.map((project) => (
          <a
            key={project.slug}
            href={`#project-${project.slug}`}
            className="rounded-full border border-line-strong px-4 py-2 text-sm text-ink-2 transition-colors duration-150 hover:border-violet-edge hover:bg-violet-dim hover:text-ink"
          >
            {project.title}
          </a>
        ))}
      </nav>
      <ol ref={ref} className="relative grid gap-6 md:block">
        {featured.map((project, index) => (
          <Panel
            key={project.slug}
            project={project}
            index={index}
            total={featured.length}
            progress={scrollYProgress}
            reduce={reduce}
          />
        ))}
      </ol>
    </>
  );
}
