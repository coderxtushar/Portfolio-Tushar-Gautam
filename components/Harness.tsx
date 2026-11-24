"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { PiArrowClockwiseBold, PiPlayFill } from "react-icons/pi";
import { harnessDemo, pipeline, verdicts, type TestState } from "@/lib/data";

type CandidateId = (typeof harnessDemo.candidates)[number]["id"];

/* -1 idle, 0..4 running through the pipeline, 5 judged */
const IDLE = -1;
const DONE = pipeline.length;
const PARSE = 3;
const JUDGE = 4;
const STEP_MS = 720;

const SHORT: Record<TestState, string> = { pass: "p", fail: "f", skip: "s", none: "n" };
const LABEL: Record<TestState, string> = { pass: "Pass", fail: "Fail", skip: "Skip", none: "New" };

const transitionOf = (before: TestState, after: TestState) => `${SHORT[before]}2${SHORT[after]}`;

function judge(candidate: CandidateId) {
  const rows = harnessDemo.tests.map((test) => ({
    ...test,
    afterState: test.after[candidate],
    code: transitionOf(test.before, test.after[candidate]),
  }));
  const regressions = rows.filter((row) => row.code === "p2f");
  const counts = rows.reduce<Record<string, number>>((tally, row) => {
    tally[row.code] = (tally[row.code] ?? 0) + 1;
    return tally;
  }, {});
  return { rows, regressions, counts, resolved: regressions.length === 0 && (counts.f2p ?? 0) > 0 };
}

function StateCell({ state }: { state: TestState }) {
  const led = state === "pass" ? "pass" : state === "fail" ? "fail" : undefined;
  return (
    <span className="inline-flex items-center gap-2">
      <span className="led" data-state={led} aria-hidden="true" />
      {/* Narrow screens keep the LED and drop the word, which stays for AT */}
      <span
        className={`max-sm:sr-only ${state === "fail" ? "text-fail" : state === "pass" ? "text-ink" : "text-ink-3"}`}
      >
        {LABEL[state]}
      </span>
    </span>
  );
}

/**
 * The signature demonstration: an evaluation harness run, scaled down. The
 * visitor picks a candidate patch and runs it through build, patch, execute,
 * parse and judge, then sees how test-state transitions decide the verdict.
 * The default state is a finished run, so the panel is complete without JS.
 */
export default function Harness() {
  const reduceMotion = useReducedMotion();
  const [candidate, setCandidate] = useState<CandidateId>("fix");
  const [stage, setStage] = useState<number>(DONE);
  const [highlight, setHighlight] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const run = useCallback(() => {
    clearTimers();
    if (reduceMotion) {
      setStage(DONE);
      return;
    }
    setStage(0);
    for (let step = 1; step <= DONE; step += 1) {
      timers.current.push(setTimeout(() => setStage(step), step * STEP_MS));
    }
  }, [reduceMotion]);

  const choose = (id: CandidateId) => {
    if (id === candidate) return;
    clearTimers();
    setCandidate(id);
    setStage(IDLE);
  };

  const result = judge(candidate);
  const running = stage >= 0 && stage < DONE;
  const parsed = stage > PARSE;
  const judged = stage > JUDGE;
  const present = new Set(judged ? result.rows.map((row) => row.code) : []);

  const status =
    stage === IDLE
      ? "Ready. Press run."
      : running
        ? `Running: ${pipeline[stage].step}`
        : result.resolved
          ? "Resolved"
          : "Rejected";

  return (
    /* reducedMotion="user": Framer's own transitions honour the OS setting too */
    <MotionConfig reducedMotion="user">
    <div className="grid-panel relative overflow-hidden rounded-card border border-line-strong shadow-[0_40px_100px_-40px_rgba(123,97,255,0.45)]">
      {/* Fixture header */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-5 py-3.5">
        <p className="legend text-ink">
          <span className="led mr-2 align-middle" data-state="live" aria-hidden="true" />Evaluation harness
        </p>
        <p className="legend text-ink-3">Illustrative run · synthetic data</p>
      </div>

      <div className="space-y-6 p-4 sm:p-5 md:p-6">
        <div>
          <p className="font-mono text-mono text-ink-2">{harnessDemo.repo}</p>
          <p className="mt-1 text-sm text-ink-3 text-pretty">Issue: {harnessDemo.issue}</p>
        </div>

        {/* Candidate selector + run */}
        <div className="flex flex-wrap items-center gap-3">
          <div
            role="radiogroup"
            aria-label="Candidate patch"
            className="inline-flex rounded-full border border-line-strong bg-ground/60 p-1"
          >
            {harnessDemo.candidates.map((option) => {
              const checked = option.id === candidate;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  onClick={() => choose(option.id)}
                  className={`relative min-h-10 rounded-full px-4 text-left text-sm transition-colors duration-150 ${
                    checked ? "text-ground" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {checked ? (
                    <motion.span
                      layoutId="candidate-pad"
                      className="absolute inset-0 rounded-full bg-violet-soft"
                      transition={{ type: "spring", stiffness: 520, damping: 40 }}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="relative block font-semibold sm:inline">{option.label}</span>
                  <span className={`relative block sm:ml-2 sm:inline ${checked ? "text-ground/70" : "text-ink-3"}`}>
                    {option.note}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={run}
            disabled={running}
            data-variant="lime"
            className="pad-btn"
          >
            {stage === IDLE ? (
              <PiPlayFill className="size-3.5" aria-hidden="true" />
            ) : (
              <PiArrowClockwiseBold className="size-4" aria-hidden="true" />
            )}
            {running ? "Running" : stage === IDLE ? "Run harness" : "Run again"}
          </button>
        </div>

        {/* Pipeline: five pads on one trace */}
        <ol className="relative grid grid-cols-5 gap-1">
          <span
            aria-hidden="true"
            className="absolute inset-x-[10%] top-[9px] h-[2px] rounded-full bg-gradient-to-r from-violet via-trace-2 to-trace"
          />
          {pipeline.map((step, index) => {
            const state = stage === IDLE ? "idle" : index < stage ? "done" : index === stage ? "active" : "idle";
            return (
              <li key={step.step} className="stage relative flex flex-col items-center" data-state={state}>
                <span className="stage-pad relative size-[20px]" />
                <span
                  className={`legend mt-2.5 text-center transition-colors duration-200 max-sm:text-[0.6875rem] max-sm:tracking-[0.02em] ${
                    state === "idle" ? "text-ink-3" : "text-ink"
                  }`}
                >
                  {step.step}
                </span>
              </li>
            );
          })}
        </ol>

        <p className="min-h-[1.6em] text-sm text-ink-3" aria-hidden="true">
          {running ? pipeline[stage].detail : stage === IDLE ? "Choose a patch and run it." : "Run complete."}
        </p>

        {/* Results table */}
        <div className="overflow-hidden rounded-2xl border border-line bg-ground/50">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Test results for {harnessDemo.candidates.find((c) => c.id === candidate)?.label}</caption>
            <thead className="bg-raise-2/70">
              <tr className="legend text-ink-3">
                <th scope="col" className="px-3 py-2.5 font-semibold sm:px-4">Test</th>
                <th scope="col" className="px-2 py-2.5 font-semibold">Before</th>
                <th scope="col" className="px-2 py-2.5 font-semibold">After</th>
                <th scope="col" className="px-3 py-2.5 text-right font-semibold sm:px-4">
                  <span className="max-sm:hidden">Transition</span>
                  <span className="sm:hidden">Δ</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, index) => {
                const lit = highlight !== null && judged && row.code === highlight;
                return (
                  <tr
                    key={row.name}
                    className={`border-t border-line transition-colors duration-200 ${
                      lit ? "bg-lime-dim" : judged && row.code === "p2f" ? "bg-fail/8" : ""
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-3 py-2.5 font-mono text-[0.75rem] font-normal text-ink-2 sm:px-4 sm:text-mono"
                    >
                      {/* Break only at underscores on narrow screens */}
                      {row.name.split("_").map((part, i, all) => (
                        <span key={`${part}-${i}`}>
                          {part}
                          {i < all.length - 1 ? (
                            <>
                              _<wbr />
                            </>
                          ) : null}
                        </span>
                      ))}
                    </th>
                    <td className="px-2 py-2.5">
                      <StateCell state={row.before} />
                    </td>
                    <td className="px-2 py-2.5">
                      <AnimatePresence mode="wait" initial={false}>
                        {parsed ? (
                          <motion.span
                            key="after"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-block"
                          >
                            <StateCell state={row.afterState} />
                          </motion.span>
                        ) : (
                          <motion.span key="wait" exit={{ opacity: 0 }} className="text-ink-3">
                            —
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </td>
                    <td className="px-3 py-2.5 text-right sm:px-4">
                      {judged ? (
                        <button
                          type="button"
                          onMouseEnter={() => setHighlight(row.code)}
                          onMouseLeave={() => setHighlight(null)}
                          onFocus={() => setHighlight(row.code)}
                          onBlur={() => setHighlight(null)}
                          aria-describedby={`legend-${row.code}`}
                          className={`rounded-full px-2 font-mono text-mono font-medium ${
                            row.code === "p2f" ? "text-fail" : "text-lime"
                          }`}
                        >
                          {row.code}
                        </button>
                      ) : (
                        <span className="text-ink-3">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Log + verdict */}
        <div className="grid gap-4 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="min-h-[8.5rem] rounded-2xl border border-line bg-void/70 p-4 font-mono text-mono text-ink-3">
            <AnimatePresence initial={false}>
              {harnessDemo.log.map((line, index) =>
                stage === DONE || index <= stage ? (
                  <motion.p
                    key={`${candidate}-${line}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="truncate"
                  >
                    <span className="text-lime" aria-hidden="true">$ </span>
                    {line}
                  </motion.p>
                ) : null,
              )}
            </AnimatePresence>
          </div>

          <div
            className="flex flex-col justify-between gap-3 rounded-2xl border border-line bg-raise-2/60 p-4"
            role="status"
            aria-live="polite"
          >
            <p className="legend text-ink-3">Verdict</p>
            <AnimatePresence mode="wait" initial={false}>
              {judged ? (
                <motion.div
                  key={`${candidate}-verdict`}
                  initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p
                    className={`expanded flex items-center gap-3 text-h3 font-extrabold uppercase ${
                      result.resolved ? "text-pass" : "text-fail"
                    }`}
                  >
                    <span className="led" data-state={result.resolved ? "pass" : "fail"} aria-hidden="true" />
                    {status}
                  </p>
                  <p className="mt-2 text-sm text-ink-2 text-pretty">
                    {result.resolved
                      ? "The target test now passes and nothing that passed before broke."
                      : `The target test passes, but ${result.regressions
                          .map((row) => row.name)
                          .join(", ")} regressed. Looking right is not the same as being right.`}
                  </p>
                </motion.div>
              ) : (
                <motion.p key="pending" exit={{ opacity: 0 }} className="text-sm text-ink-3">
                  {status}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Margin legend: every term of art, defined */}
        <dl className="grid gap-x-6 gap-y-2.5 border-t border-line pt-5 sm:grid-cols-2">
          {verdicts.map((verdict) => {
            const lit = highlight === verdict.code || (highlight === null && present.has(verdict.code) && judged);
            return (
              <div
                key={verdict.code}
                id={`legend-${verdict.code}`}
                className={`flex gap-3 text-sm transition-opacity duration-200 ${
                  judged && !lit ? "opacity-85" : "opacity-100"
                }`}
              >
                <dt className={`w-9 shrink-0 font-mono text-mono font-medium ${verdict.bad ? "text-fail" : "text-lime"}`}>
                  {verdict.code}
                </dt>
                <dd className="text-ink-2">{verdict.meaning}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
    </MotionConfig>
  );
}
