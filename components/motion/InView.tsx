"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; style?: CSSProperties; threshold?: number };

/** Sets [data-lit] on itself the first time it scrolls into view, so CSS can run an entrance. */
export default function InView({ children, className = "", style, threshold = 0.25 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset.lit = "";
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
