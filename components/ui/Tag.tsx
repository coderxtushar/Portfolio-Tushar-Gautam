import type { ReactNode } from "react";
import type { IconType } from "react-icons";

type Props = {
  children: ReactNode;
  icon?: IconType;
  className?: string;
};

/**
 * Static chip: a thin outlined label for metadata. Not interactive, so it has
 * no hover state.
 */
export default function Tag({ children, icon: Icon, className = "" }: Props) {
  return (
    <span
      className={`inline-flex min-h-7 items-center gap-2 rounded-full border border-line bg-raise-1/60 px-3 text-sm text-ink-2 ${className}`}
    >
      {Icon ? <Icon className="size-3.5 shrink-0 text-ink-3" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
