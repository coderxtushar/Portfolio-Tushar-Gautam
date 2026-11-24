"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import Block from "./ui/Block";

/* Tile spans on the 6-column grid: the evaluation work gets the featured
   tile, the rest step down in size so no two rows read alike. */
const SPAN: Record<string, string> = {
  "GenAI & agent evaluation": "md:col-span-4",
  Frontend: "md:col-span-2",
  "Backend & data": "md:col-span-3",
  "Infrastructure & tooling": "md:col-span-3",
  Languages: "md:col-span-6",
};

const FEATURED = "GenAI & agent evaluation";

/* Featured group first, then by span so the grid packs without gaps */
const ORDER = [FEATURED, "Frontend", "Backend & data", "Infrastructure & tooling", "Languages"];
const ordered = [...skillGroups].sort(
  (a, b) => (ORDER.indexOf(a.label) + 99) % 99 - (ORDER.indexOf(b.label) + 99) % 99,
);

/**
 * The stack as an asymmetric grid of groups. Pointing at a group mutes the
 * others, the same isolation the project graph uses.
 */
export default function Skills() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Block
      id="skills"
      title="What I work with."
      lead="Grouped by what I actually reach for, not by how long the list looks."
    >
      <ul
        className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-6"
        onPointerLeave={() => setActive(null)}
        onPointerMove={(event) => {
          const target = (event.target as HTMLElement).closest<HTMLElement>("[data-spot]");
          if (!target) return;
          const rect = target.getBoundingClientRect();
          target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
          target.style.setProperty("--my", `${event.clientY - rect.top}px`);
        }}
      >
        {ordered.map((group, index) => {
          const featured = group.label === FEATURED;
          const muted = active !== null && active !== group.label;
          return (
            <motion.li
              key={group.label}
              data-spot
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onPointerEnter={() => setActive(group.label)}
              className={`card spot-card glow-hover overflow-hidden p-6 transition-[opacity,filter] duration-300 md:p-7 ${
                SPAN[group.label] ?? "md:col-span-3"
              } ${muted ? "opacity-85 saturate-[0.3]" : ""}`}
            >
              {featured ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-violet/35 blur-3xl"
                />
              ) : null}

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <h3 className="semi-expanded text-[1.45rem] font-bold leading-tight tracking-[-0.02em] text-ink">
                    {group.label}
                  </h3>
                  <p className="mt-1 text-sm text-ink-3">{group.note}</p>
                </div>
                <span className="semi-expanded text-value font-bold text-lime" data-numeric>
                  {String(group.items.length).padStart(2, "0")}
                  <span className="sr-only"> skills</span>
                </span>
              </div>

              <ul className="relative mt-6 flex flex-wrap gap-2">
                {group.items.map((item, chip) => (
                  <motion.li
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 + index * 0.08 + chip * 0.035 }}
                    key={item.name}
                    className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-3.5 text-sm ${
                      featured
                        ? "border-violet-edge bg-violet-dim text-ink"
                        : "border-line bg-raise-2/60 text-ink-2"
                    }`}
                  >
                    {item.icon ? (
                      <item.icon
                        className={`size-3.5 shrink-0 ${featured ? "text-violet-soft" : "text-ink-3"}`}
                        aria-hidden="true"
                      />
                    ) : null}
                    {item.name}
                  </motion.li>
                ))}
              </ul>
            </motion.li>
          );
        })}
      </ul>
    </Block>
  );
}
