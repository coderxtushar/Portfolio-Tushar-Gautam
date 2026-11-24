"use client";

import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; as?: "div" | "ul" | "ol" };

/**
 * One pointer listener for a whole group: it writes the cursor position into
 * --mx / --my on whichever [data-spot] child is under the pointer, and the
 * `.spot-card` CSS paints a violet light that follows it.
 */
export default function SpotlightGroup({ children, className = "", as = "div" }: Props) {
  const Tag = as;
  return (
    <Tag
      className={className}
      onPointerMove={(event) => {
        const target = (event.target as HTMLElement).closest<HTMLElement>("[data-spot]");
        if (!target) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        target.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }}
    >
      {children}
    </Tag>
  );
}
