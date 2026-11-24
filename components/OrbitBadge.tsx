import { PiArrowUpRightBold } from "react-icons/pi";
import { ribbonTokens } from "@/lib/data";

type Props = { href: string; label: string };

/** A circular label of the pipeline steps rotating around a lime action. */
export default function OrbitBadge({ href, label }: Props) {
  const ring = `${ribbonTokens.pipeline.join(" · ")} · `.toUpperCase();

  return (
    <a
      href={href}
      aria-label={label}
      className="group relative grid size-36 shrink-0 place-items-center rounded-full md:size-44"
    >
      <svg viewBox="0 0 200 200" className="orbit-spin absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <path id="orbit-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="var(--color-line-strong)" />
        {/* One copy stretched to exactly the circumference (2π·78 ≈ 490), so
            the ring closes without a gap or an overlap */}
        <text fill="var(--color-violet-soft)" fontSize="13" fontWeight="600" style={{ fontFamily: "var(--font-sans)" }}>
          <textPath href="#orbit-path" textLength="486" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
      <span className="grid size-16 place-items-center rounded-full bg-lime text-ground transition-transform duration-300 group-hover:scale-110 motion-safe:group-hover:rotate-45 md:size-20">
        <PiArrowUpRightBold className="size-6" aria-hidden="true" />
      </span>
    </a>
  );
}
