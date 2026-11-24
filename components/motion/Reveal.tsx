"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  /* Position in a list, for the stagger */
  index?: number;
  className?: string;
  as?: "div" | "li";
};

/** Rises and sharpens into place the first time it scrolls into view. */
export default function Reveal({ children, index = 0, className = "", as = "div" }: Props) {
  const Component = as === "li" ? motion.li : motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: Math.min(index, 6) * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
