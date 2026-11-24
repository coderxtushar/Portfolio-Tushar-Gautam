"use client";

import { useState, type CSSProperties } from "react";
import { PiArrowUpRightBold } from "react-icons/pi";
import { projects } from "@/lib/data";

/* The hero graph shows the featured projects, in the order the data lists them */
const featured = projects.filter((project) => project.featured).slice(0, 4);

/* Graph geometry, in the SVG's own units. The HTML nodes are placed with the
   same numbers as percentages, so ports and connections always line up. */
const W = 720;
const H = 600;

type Node = {
  x: number;
  y: number;
  w: number;
  h: number;
  /* Connection from the node's port into the eval hub, with rounded elbows */
  route: string;
  /* Port position on the node edge */
  port: [number, number];
  /* Narrow screens keep the size differences as width steps */
  mobile: string;
  /* Compact nodes drop the tagline on the graph (it stays in the label) */
  compact?: boolean;
};

const NODES: Record<string, Node> = {
  U1: { x: 24, y: 22, w: 306, h: 186, port: [330, 120], route: "M330 120 C350 120 354 150 354 190 L354 530", mobile: "max-sm:w-full" },
  U2: { x: 432, y: 18, w: 232, h: 222, port: [432, 140], route: "M432 140 C400 140 366 170 366 220 L366 530", mobile: "max-sm:w-[80%]" },
  U3: { x: 76, y: 262, w: 254, h: 196, port: [330, 380], route: "M330 380 C340 380 342 400 342 430 L342 530", mobile: "max-sm:w-[92%]" },
  U4: { x: 396, y: 296, w: 262, h: 150, port: [396, 400], route: "M396 400 C384 400 378 420 378 450 L378 530", mobile: "max-sm:w-[72%]", compact: true },
};

const HUB_PORTS = [342, 354, 366, 378];

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

/**
 * The work as a live graph: each project is a node wired into the evaluation
 * hub. On load the connections draw out and the nodes settle in; probing a
 * node (hover or focus) isolates it and sends a lime pulse down its line.
 */
export default function Circuit() {
  const [probe, setProbe] = useState<string | null>(null);
  const active = featured.find((project) => project.designator === probe) ?? null;

  return (
    <div
      className="circuit power-on relative @container"
      data-probe={probe ?? undefined}
      onPointerLeave={() => setProbe(null)}
    >
      <div className="relative sm:aspect-[720/600]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 hidden size-full overflow-visible sm:block"
          aria-hidden="true"
        >
          {featured.map((project, index) => {
            const node = NODES[project.designator];
            const isActive = probe === project.designator;
            return (
              <g key={project.slug}>
                <path
                  d={node.route}
                  className="trace"
                  pathLength={1}
                  data-active={isActive || undefined}
                  style={{ "--i": index } as CSSProperties}
                />
                <path
                  d={node.route}
                  className="signal"
                  pathLength={100}
                  data-active={isActive || undefined}
                />
                <circle
                  cx={node.port[0]}
                  cy={node.port[1]}
                  r="4.5"
                  fill={isActive ? "var(--color-lime)" : "var(--color-ground)"}
                  stroke={isActive ? "var(--color-lime)" : "var(--color-violet)"}
                  strokeWidth="2"
                  style={{ transition: "fill 200ms, stroke 200ms" }}
                />
              </g>
            );
          })}

          {/* The eval hub every project is wired into */}
          <rect
            x="290"
            y="530"
            width="140"
            height="38"
            rx="19"
            fill="var(--color-raise-2)"
            stroke="var(--color-violet-edge)"
          />
          {HUB_PORTS.map((x, index) => (
            <circle
              key={x}
              cx={x}
              cy="530"
              r="3"
              fill={active && NODES[active.designator].route.endsWith(`${x} 530`) ? "var(--color-lime)" : "var(--color-violet-soft)"}
              data-i={index}
            />
          ))}
          <text
            x="360"
            y="554"
            textAnchor="middle"
            fill="var(--color-ink-2)"
            fontSize="12"
            fontWeight="600"
            letterSpacing="1.4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            EVAL HARNESS
          </text>
        </svg>

        {/* Mobile: one vertical line the stacked projects hang off */}
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-[7px] top-9 w-[2px] rounded-full bg-gradient-to-b from-violet to-trace sm:hidden"
        />

        <p className="legend mb-4 pl-7 text-ink-3 sm:hidden">Tap a project to open its case study</p>

        <ul className="relative grid gap-4 pl-7 sm:absolute sm:inset-0 sm:block sm:pl-0">
          {featured.map((project, index) => {
            const node = NODES[project.designator];
            const isActive = probe === project.designator;
            const icons = project.tech.filter((tech) => tech.icon).slice(0, 3);

            return (
              <li
                key={project.slug}
                className={`ic relative sm:absolute sm:left-(--x) sm:top-(--y) sm:h-(--h) sm:w-(--w) ${node.mobile}`}
                data-active={isActive || undefined}
                style={
                  {
                    "--i": index,
                    ["--x" as string]: pct(node.x, W),
                    ["--y" as string]: pct(node.y, H),
                    ["--w" as string]: pct(node.w, W),
                    ["--h" as string]: pct(node.h, H),
                  } as CSSProperties
                }
              >
                {/* Port from the mobile line into the node */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[22px] top-1/2 h-[2px] w-[22px] -translate-y-1/2 bg-violet sm:hidden"
                />

                <a
                  href={`/projects/${project.slug}`}
                  onPointerEnter={() => setProbe(project.designator)}
                  onPointerMove={(event) => {
                    if (event.pointerType !== "mouse") return;
                    const el = event.currentTarget;
                    const rect = el.getBoundingClientRect();
                    const px = (event.clientX - rect.left) / rect.width - 0.5;
                    const py = (event.clientY - rect.top) / rect.height - 0.5;
                    el.style.setProperty("--ry", `${px * 10}deg`);
                    el.style.setProperty("--rx", `${py * -10}deg`);
                  }}
                  onPointerLeave={(event) => {
                    event.currentTarget.style.setProperty("--ry", "0deg");
                    event.currentTarget.style.setProperty("--rx", "0deg");
                  }}
                  onFocus={() => setProbe(project.designator)}
                  onBlur={() => setProbe(null)}
                  aria-label={`${project.title}: ${project.tagline}. Open case study`}
                  className={`card tilt group flex h-full flex-col overflow-hidden rounded-ic px-4 pb-4 pt-4 transition-[border-color,box-shadow,transform] duration-300 sm:p-[5.5%] ${
                    isActive
                      ? "border-violet-edge shadow-[0_24px_60px_-24px_rgba(123,97,255,0.7)]"
                      : ""
                  }`}
                  style={{ viewTransitionName: `ic-${project.slug}` }}
                >
                  {/* Corner bloom on the probed node */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-violet/40 blur-2xl transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <span className="relative flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-ink-3">
                      {icons.map((tech) =>
                        tech.icon ? (
                          <tech.icon key={tech.name} className="size-3.5" aria-hidden="true" />
                        ) : null,
                      )}
                    </span>
                    <span className="flex items-center gap-2">
                      {index === 0 ? (
                        <span className="legend rounded-full bg-lime px-2 py-0.5 text-[0.625rem] text-ground">
                          Main project
                        </span>
                      ) : null}
                      <span className="led" data-state={isActive ? "live" : undefined} aria-hidden="true" />
                    </span>
                  </span>

                  <span className="semi-expanded relative mt-3 block text-[1.3rem] font-bold leading-[1.05] tracking-[-0.02em] text-ink sm:mt-[6%] sm:text-[max(1.1rem,3.3cqw)]">
                    {project.title}
                  </span>
                  <span
                    className={`relative mt-1.5 block text-sm text-ink-3 sm:text-[max(0.8125rem,1.95cqw)] sm:leading-snug sm:@max-[38rem]:hidden ${
                      node.compact ? "sm:hidden" : ""
                    }`}
                  >
                    {project.tagline}
                  </span>

                  <span className="relative mt-3 flex items-end justify-between gap-3 sm:mt-auto sm:pt-2">
                    <span
                      className="semi-expanded text-value font-bold text-lime sm:text-[max(1.4rem,4cqw)]"
                      data-numeric
                    >
                      {project.metric?.value ?? ""}
                    </span>
                    <span className="grid size-8 place-items-center rounded-full border border-line-strong text-ink-2 transition-[background-color,color,border-color] duration-200 group-hover:border-lime group-hover:bg-lime group-hover:text-ground">
                      <PiArrowUpRightBold className="size-3.5" aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile: the line ends at the eval hub */}
        <div aria-hidden="true" className="relative mt-5 flex items-center pl-7 sm:hidden">
          <span className="absolute left-[7px] top-1/2 h-[2px] w-[22px] bg-violet" />
          <span className="legend rounded-full border border-violet-edge bg-raise-2 px-4 py-2 text-ink-2">
            Eval harness
          </span>
        </div>

        {/* Readout beside the hub: what the probe is touching */}
        <p
          aria-hidden="true"
          className="absolute bottom-[1%] left-[3%] hidden max-w-[36%] text-sm leading-snug text-ink-3 sm:block"
        >
          {active ? (
            <>
              <span className="legend flex items-center gap-2 text-lime">
                <span className="led" data-state="live" />
                {active.title} live
              </span>
              <span className="mt-1.5 block text-ink">
                {active.metric ? `${active.metric.value} ${active.metric.label}` : active.tagline}
              </span>
            </>
          ) : (
            <>
              <span className="legend block">Hover a project</span>
              <span className="mt-1.5 block">Each one opens its case study.</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
