"use client";

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";

type Props = {
  text: string;
  /* Characters at the end painted lime (the closing full stop) */
  accentTail?: number;
  className?: string;
  delay?: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Words rise out of a mask one after another when the line scrolls into view.
 * The in-view check runs on the visible outer line (a word sitting below its
 * own mask is clipped, so watching the word itself would never fire); the
 * words follow through variants. The text stays real text for screen readers.
 */
export default function RevealText({ text, accentTail = 0, className = "", delay = 0 }: Props) {
  const body = accentTail > 0 ? text.slice(0, -accentTail) : text;
  const tail = accentTail > 0 ? text.slice(-accentTail) : "";
  const words = body.split(" ");

  const word: Variants = {
    hidden: { y: "105%", rotate: 4 },
    show: (index: number) => ({
      y: "0%",
      rotate: 0,
      transition: { duration: 0.75, delay: delay + index * 0.055, ease: EASE },
    }),
  };
  const pop: Variants = {
    hidden: { scale: 0 },
    show: {
      scale: 1,
      transition: { type: "spring", stiffness: 500, damping: 14, delay: delay + words.length * 0.055 + 0.25 },
    },
  };

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {words.map((item, index) => (
        <Fragment key={`${item}-${index}`}>
        <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span className="inline-block" variants={word} custom={index}>
            {item}
            {index === words.length - 1 && tail ? (
              <motion.span className="inline-block text-lime" variants={pop}>
                {tail}
              </motion.span>
            ) : null}
          </motion.span>
        </span>
        {/* The space lives outside the mask: trailing spaces inside an
            inline-block are dropped by the browser */}
        {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
