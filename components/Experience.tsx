import { education, experience } from "@/lib/data";
import Block from "./ui/Block";
import Reveal from "./motion/Reveal";

/**
 * Experience as a timeline: a violet rail with one node per role, the current
 * role's node live. Education follows as a compact record table.
 */
export default function Experience() {
  return (
    <Block id="experience" title="Where I've done the work.">
      <ol className="relative">
        {/* The rail */}
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-[7px] top-3 w-px bg-gradient-to-b from-violet via-trace-2 to-transparent md:left-[calc(13rem+7px)]"
        />

        {experience.map((role, index) => (
          <Reveal
            as="li"
            key={role.company}
            index={index}
            className="relative grid gap-4 pb-14 pl-9 last:pb-4 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12 md:pl-0"
          >
            <div className="md:pt-1 md:pr-10 md:text-right">
              <p className="text-sm font-semibold text-ink" data-numeric>
                {role.period}
              </p>
              <p className="mt-1 text-sm text-ink-3">{role.location}</p>
            </div>

            {/* Node on the rail */}
            <span
              aria-hidden="true"
              className={`absolute left-0 top-1.5 grid size-[15px] place-items-center rounded-full border md:left-[13rem] ${
                role.current
                  ? "border-violet-soft bg-violet shadow-[0_0_0_5px_rgba(123,97,255,0.18),0_0_18px_rgba(123,97,255,0.8)]"
                  : "border-trace-2 bg-ground"
              }`}
            />

            <div className="md:pl-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="semi-expanded text-[1.6rem] font-bold leading-tight tracking-[-0.02em] text-ink">
                  {role.title}
                </h3>
                {role.current ? (
                  <span className="legend inline-flex items-center gap-2 rounded-full border border-violet-edge bg-violet-dim px-2.5 py-1 text-violet-soft">
                    <span className="led" data-state="live" aria-hidden="true" />
                    Current
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-body font-medium text-violet-soft">{role.company}</p>

              <ul className="mt-6 space-y-3.5">
                {role.points.map((point) => (
                  <li key={point} className="flex max-w-[72ch] gap-4 text-sm text-ink-2 text-pretty">
                    <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-violet" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="mt-16">
        <h3 className="legend text-ink-3">Education</h3>
        <dl className="mt-5 border-t border-line-strong">
          {education.map((entry) => (
            <div
              key={entry.institution}
              className="grid gap-1.5 border-b border-line py-5 md:grid-cols-[13rem_minmax(0,1fr)_auto] md:items-baseline md:gap-12"
            >
              <dt className="text-sm text-ink-3" data-numeric>
                {entry.period}
              </dt>
              <dd>
                <p className="text-body font-medium text-ink">{entry.institution}</p>
                <p className="mt-0.5 text-sm text-ink-3">{entry.qualification}</p>
              </dd>
              <dd className="semi-expanded text-h3 font-bold text-lime" data-numeric>
                {entry.result}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Block>
  );
}
