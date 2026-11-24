"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * The hero's ambient aurora. It drifts on its own (CSS) and also slides apart
 * as you scroll, so the light seems to sit behind the page rather than on it.
 */
export default function HeroAurora() {
  const { scrollY } = useScroll();
  const violetY = useTransform(scrollY, [0, 900], [0, 180]);
  const limeY = useTransform(scrollY, [0, 900], [0, -120]);
  const fade = useTransform(scrollY, [0, 700], [1, 0.35]);

  return (
    <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ opacity: fade }}>
      <motion.span className="absolute left-[-12%] top-[-14%]" style={{ y: violetY }}>
        <span className="aurora aurora-violet relative block size-[46rem]" />
      </motion.span>
      <motion.span className="absolute right-[-10%] top-[24%]" style={{ y: limeY }}>
        <span className="aurora aurora-lime relative block size-[30rem]" />
      </motion.span>
    </motion.div>
  );
}
