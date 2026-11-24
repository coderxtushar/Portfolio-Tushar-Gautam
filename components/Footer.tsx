import { PiArrowUpRightBold } from "react-icons/pi";
import { profile, socials } from "@/lib/data";
import OrbitBadge from "./OrbitBadge";
import RevealText from "./motion/RevealText";

/**
 * Closing: one large line in display type, the email as the action, the
 * networks, and the small print.
 */
export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-line">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-violet/25 blur-[110px]"
      />

      <div className="shell py-20 md:py-28">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <p className="semi-expanded max-w-[16ch] text-h1 font-bold text-ink text-balance">
            <RevealText text="Have something worth building?" accentTail={1} />
          </p>
          <OrbitBadge href={`mailto:${profile.email}`} label={`Email ${profile.name}`} />
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="group mt-10 inline-flex max-w-full items-center gap-4 text-lead font-medium text-ink"
        >
          <span className="ink-link break-all">{profile.email}</span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lime text-ground transition-transform duration-300 motion-safe:group-hover:rotate-45">
            <PiArrowUpRightBold className="size-4" aria-hidden="true" />
          </span>
        </a>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="grid size-11 place-items-center rounded-full border border-line-strong text-ink-2 transition-colors duration-150 hover:border-violet-edge hover:bg-violet-dim hover:text-ink"
                >
                  <social.icon className="size-[1.1rem]" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <p className="text-sm text-ink-3">
            © {new Date().getFullYear()} {profile.name} · {profile.title} at {profile.company}
          </p>
        </div>
      </div>
    </footer>
  );
}
