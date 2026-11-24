"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/** Every Framer Motion animation on the site honours the OS reduced-motion setting. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
