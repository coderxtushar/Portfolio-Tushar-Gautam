import { profile, type Project } from "@/lib/data";

type Props = {
  project: Project;
  /* Include the stack row (the BOM wants it; the datasheet has a pinout) */
  withStack?: boolean;
  className?: string;
};

/**
 * Provenance ticket: a small label saying where a project came
 * from. Here it says when the project ran and where its figure comes from, so
 * no number on the site stands without a source.
 */
export default function Provenance({ project, withStack = false, className = "" }: Props) {
  const rows: [string, string][] = [
    ["Period", project.period],
    ...(withStack
      ? ([["Stack", project.tech.slice(0, 4).map((tech) => tech.name).join(" · ")]] as [string, string][])
      : []),
    [
      "Figure",
      project.metric
        ? `${project.metric.value}, ${project.metric.source ?? `from resume (${profile.resumeEdition})`}`
        : "Not measured, so none shown",
    ],
  ];

  return (
    <dl
      className={`grid grid-cols-[4.25rem_minmax(0,1fr)] gap-x-3 gap-y-1.5 rounded-2xl border border-line bg-raise-1/70 px-3.5 py-3 text-sm leading-snug ${className}`}
    >
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="legend pt-[0.2em] text-ink-3">{label}</dt>
          <dd className="text-ink-2" data-numeric={label === "Period" || undefined}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
