import Image from "next/image";
import type { ReactNode } from "react";
import { PiArrowUpRightBold } from "react-icons/pi";

type Props = {
  href: string;
  children: ReactNode;
  /* First-screen snapshot of the live site, shown on hover/focus */
  preview?: string | null;
  className?: string;
  /* Which edge the preview card lines up with */
  align?: "left" | "right";
};

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/**
 * A project name that opens its deployed site. Hovering or focusing it shows
 * where it goes: a small browser-framed snapshot of the live site with its
 * address. Navigation only happens on click, never on hover. Pure CSS; the
 * preview is decorative (the link text and title carry the meaning) and is
 * left out of print.
 */
export default function LiveLink({ href, children, preview, className = "", align = "left" }: Props) {
  return (
    <span className="group/live relative inline-flex items-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={`Open live site: ${host(href)}`}
        className={`inline-flex items-center gap-1.5 ${className}`}
      >
        {children}
        <PiArrowUpRightBold
          className="size-[0.7em] shrink-0 opacity-50 transition-[opacity,transform] duration-200 group-hover/live:opacity-100 motion-safe:group-hover/live:-translate-y-0.5 motion-safe:group-hover/live:translate-x-0.5"
          aria-hidden="true"
        />
      </a>

      {preview ? (
        <span
          aria-hidden="true"
          className={`no-print pointer-events-none absolute top-full z-40 mt-3 hidden w-[21rem] font-sans text-base font-normal normal-case leading-normal tracking-normal origin-top translate-y-2 scale-95 opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within/live:translate-y-0 group-focus-within/live:scale-100 group-focus-within/live:opacity-100 group-hover/live:translate-y-0 group-hover/live:scale-100 group-hover/live:opacity-100 md:block ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <span className="block overflow-hidden rounded-xl border border-violet-edge bg-void shadow-[0_24px_60px_-20px_rgba(23,20,31,0.55)]">
            <span className="flex items-center gap-2 border-b border-line px-3 py-2">
              <span className="flex gap-1">
                <span className="size-2 rounded-full bg-coral/80" />
                <span className="size-2 rounded-full bg-violet-soft/80" />
                <span className="size-2 rounded-full bg-lime/80" />
              </span>
              <span className="flex-1 truncate rounded-full bg-raise-2 px-2.5 py-0.5 text-center font-mono text-[0.6875rem] text-ink-3">
                {host(href)}
              </span>
            </span>
            <Image src={preview} alt="" width={1440} height={900} sizes="336px" className="block h-auto w-full" />
          </span>
        </span>
      ) : null}
    </span>
  );
}
