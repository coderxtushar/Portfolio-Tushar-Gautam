"use client";

import { useEffect, useRef, useState } from "react";

type Props = { value: string; className?: string };

/**
 * Counts a figure up from zero when it scrolls into view, keeping any prefix
 * and suffix ("~60%", "90%+", "8.45"). Non-numeric values render as-is. The
 * final value is what renders on the server and for reduced motion.
 */
export default function CountUp({ value, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = /^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/.exec(value);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, numberText, suffix] = match;
    const target = Number(numberText.replace(/,/g, ""));
    const decimals = numberText.includes(".") ? numberText.split(".")[1].length : 0;
    let raf = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1300;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setShown(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
          if (t < 1) raf = requestAnimationFrame(tick);
          else setShown(value);
        };
        setShown(`${prefix}${(0).toFixed(decimals)}${suffix}`);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className} data-numeric>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
