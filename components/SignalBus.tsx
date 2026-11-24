"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/data";

/**
 * The board's main bus: one trace down the left edge that fills with signal as
 * you scroll (a CSS scroll timeline, no listener), with a via at every block.
 * Vias are links; the one for the block in view lights. Only on screens wide
 * enough that it sits in the board margin, clear of the content column.
 */
export default function SignalBus() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed bottom-20 left-6 top-36 z-40 hidden w-12 min-[1520px]:block"
    >
      <span aria-hidden="true" className="absolute inset-y-0 left-[10px] w-px bg-trace-2" />
      <span
        aria-hidden="true"
        className="bus-fill absolute inset-y-0 left-[9.5px] w-[2px] rounded-full bg-gradient-to-b from-violet to-lime"
      />

      <ol className="relative flex h-full flex-col justify-between">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex min-h-11 items-center"
              >
                <span
                  aria-hidden="true"
                  className={`relative z-10 ml-[3px] block size-[15px] rounded-full border-2 transition-[border-color,background-color,box-shadow] duration-200 ${
                    isActive
                      ? "border-lime bg-lime shadow-[0_0_0_4px_rgba(212,255,58,0.18),0_0_14px_rgba(212,255,58,0.6)]"
                      : "border-trace-2 bg-ground group-hover:border-violet-soft"
                  }`}
                />
                <span
                  className={`legend absolute left-8 whitespace-nowrap transition-[opacity,color] duration-200 ${
                    isActive ? "text-lime opacity-100" : "text-ink-3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                >
                  {section.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
