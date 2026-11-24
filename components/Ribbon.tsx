import { projects, ribbonTokens } from "@/lib/data";

/* Two bands that cross under the hero: the evaluation pipeline and its
   verdicts on one, the work on the other. Pure CSS marquee; hover pauses it,
   reduced motion holds it still. Decorative, so hidden from assistive tech. */
function Band({ items, tone, reverse, speed }: { items: string[]; tone: "lime" | "violet"; reverse?: boolean; speed: string }) {
  const loop = [...items, ...items, ...items, ...items];
  const lime = tone === "lime";
  return (
    <div
      className={`ribbon overflow-hidden border-y py-3.5 ${
        lime ? "border-lime/40 bg-lime text-ground" : "border-violet-edge bg-raise-2 text-ink"
      }`}
    >
      <div className="ribbon-track" data-reverse={reverse || undefined} style={{ ["--ribbon-speed" as string]: speed }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {loop.map((item, index) => (
              <span key={`${copy}-${index}`} className="flex items-center">
                <span className="semi-expanded whitespace-nowrap px-6 text-[1.35rem] font-bold tracking-[-0.02em] md:text-[1.6rem]">
                  {item}
                </span>
                <span
                  aria-hidden="true"
                  className={`size-2.5 shrink-0 rotate-45 ${lime ? "bg-ground" : "bg-lime"}`}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Ribbon() {
  const pipeline = ribbonTokens.pipeline.flatMap((step, index) => [step, ribbonTokens.verdicts[index] ?? ""]).filter(Boolean);
  const work = projects.filter((project) => project.featured).map((project) => project.title);

  return (
    <div aria-hidden="true" className="relative isolate overflow-hidden py-14 md:py-20">
      <div className="-mx-8 -rotate-2">
        <Band items={pipeline} tone="lime" speed="42s" />
      </div>
      <div className="-mx-8 -mt-3 rotate-[1.5deg]">
        <Band items={work} tone="violet" reverse speed="50s" />
      </div>
    </div>
  );
}
