"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { IconType } from "react-icons";
import {
  PiArrowSquareOutBold,
  PiFilePdfBold,
  PiFolderOpenBold,
  PiHashBold,
  PiMagnifyingGlassBold,
} from "react-icons/pi";
import { profile, projects, sections, socials } from "@/lib/data";

export const PALETTE_OPEN_EVENT = "palette:open";

type Item = {
  id: string;
  label: string;
  hint: string;
  href: string;
  external?: boolean;
  icon: IconType;
};

const items: Item[] = [
  ...sections.map((section) => ({
    id: `section-${section.id}`,
    label: section.label,
    hint: "Section",
    href: `/#${section.id}`,
    icon: PiHashBold,
  })),
  ...projects.map((project) => ({
    id: `project-${project.slug}`,
    label: project.title,
    hint: "Case study",
    href: `/projects/${project.slug}`,
    icon: PiFolderOpenBold,
  })),
  {
    id: "resume",
    label: "Resume",
    hint: "View",
    href: "/resume",
    icon: PiFilePdfBold,
  },
  {
    id: "email",
    label: profile.email,
    hint: "Email",
    href: `mailto:${profile.email}`,
    external: true,
    icon: PiArrowSquareOutBold,
  },
  ...socials.map((social) => ({
    id: `social-${social.label}`,
    label: social.label,
    hint: "External",
    href: social.href,
    external: true,
    icon: social.icon,
  })),
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) =>
      `${item.label} ${item.hint}`.toLowerCase().includes(term),
    );
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    restoreFocusTo.current?.focus();
  }, []);

  const show = useCallback(() => {
    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => {
          if (!value) restoreFocusTo.current = document.activeElement as HTMLElement | null;
          return !value;
        });
      }
    };

    const onOpenRequest = () => show();

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener(PALETTE_OPEN_EVENT, onOpenRequest);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(PALETTE_OPEN_EVENT, onOpenRequest);
    };
  }, [show]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const activate = useCallback(
    (item: Item) => {
      close();
      if (item.external) {
        window.open(
          item.href,
          item.href.startsWith("mailto:") ? "_self" : "_blank",
          "noopener,noreferrer",
        );
        return;
      }
      router.push(item.href);
    },
    [close, router],
  );

  if (!open) return null;

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((value) => (results.length === 0 ? 0 : (value + 1) % results.length));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) =>
        results.length === 0 ? 0 : (value - 1 + results.length) % results.length,
      );
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const item = results[active];
      if (item) activate(item);
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center px-4 pt-[14vh]"
      role="presentation"
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        aria-label="Close command palette"
        onClick={close}
        className="absolute inset-0 cursor-default bg-void/80 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-xl overflow-hidden rounded-ic border border-violet-edge bg-raise-1"
      >
        <div className="flex items-center gap-3 border-b border-line-strong px-4">
          <PiMagnifyingGlassBold className="size-4 shrink-0 text-lime" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
            aria-autocomplete="list"
            aria-label="Search sections, case studies and links"
            placeholder="Search sections, work, links…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            className="min-h-13 w-full bg-transparent text-body text-ink outline-none placeholder:text-ink-3"
          />
          <kbd className="legend shrink-0 rounded-[3px] border border-line-strong px-2 py-1 text-ink-3">
            ESC
          </kbd>
        </div>

        {results.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-ink-3">
            Nothing matches “{query}”.
          </p>
        ) : (
          <ul
            ref={listRef}
            id="palette-list"
            role="listbox"
            aria-label="Results"
            className="max-h-[50vh] overflow-y-auto p-2"
          >
            {results.map((item, index) => {
              const isActive = index === active;
              return (
                <li key={item.id} role="none">
                  <button
                    type="button"
                    id={`palette-${item.id}`}
                    role="option"
                    aria-selected={isActive}
                    data-index={index}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => activate(item)}
                    className={`flex min-h-11 w-full items-center gap-3 rounded-pad px-3 text-left transition-colors duration-100 ${
                      isActive ? "bg-lime-dim text-ink" : "text-ink-2"
                    }`}
                  >
                    <item.icon
                      className={`size-4 shrink-0 ${isActive ? "text-lime" : "text-ink-3"}`}
                      aria-hidden="true"
                    />
                    <span className="flex-1 truncate text-sm">{item.label}</span>
                    <span className="legend shrink-0 text-ink-3">
                      {item.hint}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
