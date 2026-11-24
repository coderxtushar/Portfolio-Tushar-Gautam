import type { CSSProperties } from "react";
import {
  MONOGRAM_FLOURISH,
  MONOGRAM_LETTERS,
  MONOGRAM_VIEWBOX,
  SIGNATURE_FLOURISH,
  SIGNATURE_LETTERS,
  SIGNATURE_VIEWBOX,
} from "./signature-paths";

const MARKS = {
  name: { viewBox: SIGNATURE_VIEWBOX, letters: SIGNATURE_LETTERS, flourish: SIGNATURE_FLOURISH },
  monogram: { viewBox: MONOGRAM_VIEWBOX, letters: MONOGRAM_LETTERS, flourish: MONOGRAM_FLOURISH },
};

type Props = {
  /* "name" signs Tushar Gautam in full; "monogram" signs TG */
  mark?: keyof typeof MARKS;
  className?: string;
  style?: CSSProperties;
};

/**
 * Autograph. It sits hidden over the name and, while its `.sig-host` parent
 * is hovered or focused, traces each letter's outline left to right, inks it
 * in, then sweeps the flourish underneath. Pure CSS (see `.sig` in
 * globals.css), so it replays every time the pointer comes back. The ink
 * colour comes from `--sig-ink`.
 */
export default function Signature({ mark = "name", className = "", style }: Props) {
  const { viewBox, letters, flourish } = MARKS[mark];
  return (
    <svg viewBox={viewBox} className={`sig ${className}`} style={style} aria-hidden="true">
      {letters.map((d, index) => (
        <path key={index} d={d} pathLength={1} className="sig-letter" style={{ "--i": index } as CSSProperties} />
      ))}
      <path d={flourish} pathLength={1} className="sig-flourish" style={{ "--i": letters.length } as CSSProperties} />
    </svg>
  );
}
