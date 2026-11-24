"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MotionConfig, motion } from "framer-motion";
import { PiListBold, PiMagnifyingGlassBold, PiXBold } from "react-icons/pi";
import { PALETTE_OPEN_EVENT } from "@/components/CommandPalette";
import Signature from "@/components/Signature";
import { profile, sections } from "@/lib/data";

/**
 * Floating pill nav. The highlight for the section in view slides between
 * links (shared layout animation), so moving through the page reads as one
 * continuous signal rather than a set of toggles.
 */
export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  /* Active section via IntersectionObserver, never a scroll listener */
  useEffect(() => {
    if (!isHome) return;

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
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const links = [
    ...sections.map((section) => ({
      key: section.id,
      href: hrefFor(section.id),
      label: section.label,
      current: isHome && active === section.id,
    })),
    { key: "resume", href: "/resume", label: "Resume", current: pathname === "/resume" },
  ];

  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <MotionConfig reducedMotion="user">
    <nav aria-label="Primary" className="fixed inset-x-0 top-3 z-50 px-3 md:top-4">
      <div className="mx-auto flex max-w-[64rem] items-center justify-between gap-3 rounded-full border border-line-strong bg-raise-1/85 py-1.5 pl-1.5 pr-1.5 backdrop-blur-xl md:pr-2">
        {/* Hover (or focus) the name and it signs itself: the printed name
            steps back and a "TG" autograph writes over it in lime */}
        <Link
          href="/"
          aria-label={`${profile.name}, home`}
          className="sig-host group/sig flex min-h-11 items-center gap-2.5 rounded-full pr-3 text-ink"
        >
          <span className="grid size-9 place-items-center rounded-full bg-lime font-display text-sm font-bold text-ground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover/sig:-rotate-12 motion-safe:group-hover/sig:scale-90">
            {initials}
          </span>
          <span className="relative">
            <span className="font-display text-[0.95rem] font-semibold tracking-[-0.01em] transition-[opacity,filter] duration-300 group-hover/sig:opacity-0 group-hover/sig:blur-[2px] group-focus-visible/sig:opacity-0">
              {profile.name}
            </span>
            <Signature
              mark="monogram"
              className="absolute -left-1 top-1/2 h-[3.5rem] w-auto -translate-y-[52%] -rotate-6"
              style={
                {
                  "--sig-ink": "var(--color-lime)",
                  "--sig-stroke": 16,
                  "--sig-flourish-stroke": 34,
                  "--sig-step": "340ms",
                  "--sig-trace": "700ms",
                } as CSSProperties
              }
            />
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                aria-current={link.current ? (link.key === "resume" ? "page" : "true") : undefined}
                className={`relative flex min-h-10 items-center rounded-full px-3.5 text-sm transition-colors duration-150 ${
                  link.current ? "text-ink" : "text-ink-2 hover:text-ink"
                }`}
              >
                {link.current ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full border border-violet-edge bg-violet-dim"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    aria-hidden="true"
                  />
                ) : null}
                <span className="relative">{link.label}</span>
              </a>
            </li>
          ))}
          <li className="ml-1.5">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(PALETTE_OPEN_EVENT))}
              aria-label="Open command palette"
              className="flex min-h-10 items-center gap-2 rounded-full border border-line px-3 text-ink-3 transition-colors duration-150 hover:border-violet-edge hover:text-ink"
            >
              <PiMagnifyingGlassBold className="size-3.5" aria-hidden="true" />
              <kbd className="font-sans text-xs font-medium">⌘K</kbd>
            </button>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-11 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-raise-2 lg:hidden"
        >
          {open ? <PiXBold className="size-5" /> : <PiListBold className="size-5" />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="mx-auto mt-2 max-w-[64rem] rounded-card border border-line-strong bg-raise-1/95 p-2 backdrop-blur-xl lg:hidden"
        >
          <ul className="grid gap-0.5">
            {links.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={link.current ? "true" : undefined}
                  className={`flex min-h-12 items-center justify-between rounded-2xl px-4 text-body transition-colors duration-150 ${
                    link.current ? "bg-violet-dim text-ink" : "text-ink-2 hover:bg-raise-2"
                  }`}
                >
                  {link.label}
                  {link.current ? <span className="led" data-state="live" aria-hidden="true" /> : null}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  window.dispatchEvent(new Event(PALETTE_OPEN_EVENT));
                }}
                className="flex min-h-12 w-full items-center gap-3 rounded-2xl px-4 text-left text-body text-ink-2 transition-colors duration-150 hover:bg-raise-2"
              >
                <PiMagnifyingGlassBold className="text-violet-soft" aria-hidden="true" />
                Search
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
    </MotionConfig>
  );
}
