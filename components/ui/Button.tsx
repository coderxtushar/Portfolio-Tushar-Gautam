import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import type { IconType } from "react-icons";

/* lime: the primary action. ghost: an outlined pill. */
type Variant = "lime" | "ghost";

type Shared = {
  variant?: Variant;
  icon?: IconType;
  children: ReactNode;
  className?: string;
};

type LinkProps = Shared & {
  href: string;
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Shared | "href">;

type ButtonProps = Shared & {
  href?: never;
  external?: never;
  loading?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Shared>;

type Props = LinkProps | ButtonProps;

function isLink(props: Props): props is LinkProps {
  return typeof (props as LinkProps).href === "string";
}

export default function Button(props: Props) {
  if (isLink(props)) {
    const {
      variant = "ghost",
      icon: Icon,
      children,
      className = "",
      href,
      external,
      download,
      ...anchorProps
    } = props;

    const content = (
      <>
        {children}
        {Icon ? <Icon className="size-4 shrink-0" aria-hidden="true" /> : null}
      </>
    );

    /* A plain anchor even for internal routes: a full document navigation is
       what lets the cross-document view transition morph a component into
       its datasheet. Every route is statically generated, so it stays fast. */
    return (
      <a
        href={href}
        data-variant={variant}
        className={`pad-btn ${className}`}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const {
    variant = "ghost",
    icon: Icon,
    children,
    className = "",
    loading = false,
    disabled,
    ...buttonProps
  } = props;

  return (
    <button
      data-variant={variant}
      className={`pad-btn ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...buttonProps}
    >
      {children}
      {Icon && !loading ? <Icon className="size-4 shrink-0" aria-hidden="true" /> : null}
    </button>
  );
}
