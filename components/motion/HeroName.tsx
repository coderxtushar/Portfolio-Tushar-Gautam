"use client";

import { motion } from "framer-motion";

type Props = { first: string; last: string };

/**
 * The name arrives letter by letter: each one rises, unblurs and settles with
 * a little overshoot. The surname follows the first name, in violet. The h1's
 * accessible name is the plain text.
 */
export default function HeroName({ first, last }: Props) {
  const line = (word: string, offset: number, className: string) => (
    <span className={`block ${className}`} aria-hidden="true">
      {word.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          initial={{ y: "0.6em", opacity: 0, filter: "blur(10px)", rotate: -6 }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)", rotate: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 22, delay: 0.15 + (offset + index) * 0.045 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );

  return (
    <>
      <span className="sr-only">{`${first} ${last}`}</span>
      {line(first, 0, "")}
      {line(last, first.length + 1, "text-violet-soft")}
    </>
  );
}
