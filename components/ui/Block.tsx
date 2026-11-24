import type { ReactNode } from "react";
import { taglines } from "@/lib/data";
import RevealText from "../motion/RevealText";
import Scramble from "../motion/Scramble";

type Props = {
  id: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
};

/**
 * A page section. A violet hairline runs across the top with the section's
 * tagline set at the opposite end, decoding in from random glyphs. The heading
 * rises word by word out of a mask and its closing full stop pops in lime.
 */
export default function Block({ id, title, lead, children, className = "" }: Props) {
  const headingId = `${id}-title`;
  const ends = title.endsWith(".") || title.endsWith("?");
  const tagline = taglines[id];

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-28 py-[calc(var(--space-section)*0.75)] ${className}`}
    >
      <div className="shell">
        <div className="mb-12 flex items-center gap-5 md:mb-16">
          <div aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-violet/70 via-line-strong to-line" />
          {tagline ? (
            <p className="legend flex max-w-[78%] items-center justify-end gap-2.5 text-right text-violet-soft">
              <span aria-hidden="true" className="h-px w-6 bg-lime" />
              <Scramble text={tagline} />
            </p>
          ) : null}
        </div>

        <header className="max-w-[48rem]">
          <h2 id={headingId} className="semi-expanded text-h2 font-bold text-ink text-balance">
            <RevealText text={title} accentTail={ends ? 1 : 0} />
          </h2>
          {lead ? (
            <p className="mt-5 max-w-[60ch] text-lead text-ink-2 text-pretty">{lead}</p>
          ) : null}
        </header>

        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
