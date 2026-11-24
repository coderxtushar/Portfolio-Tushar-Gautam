import { about, certifications, testPoints } from "@/lib/data";
import Block from "./ui/Block";
import Harness from "./Harness";
import Tag from "./ui/Tag";
import CountUp from "./motion/CountUp";

export default function About() {
  return (
    <Block id="about" title={about.title} lead={about.lead}>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        <div className="space-y-12">
          <div className="space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="max-w-[62ch] text-body text-ink-2 text-pretty">
                {paragraph}
              </p>
            ))}
          </div>

          <div>
            <h3 className="legend text-ink-3">Measured</h3>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {testPoints.map((point) => (
                <div key={point.ref} className="flex items-baseline gap-6 py-4">
                  <dt className="flex-1 text-sm text-ink-2 text-pretty">{point.label}</dt>
                  <dd>
                    <CountUp value={point.value} className="semi-expanded text-value font-bold text-ink" />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="legend text-ink-3">Certifications</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {certifications.map((certification) => (
                <li key={certification.name}>
                  <Tag>
                    {certification.name}
                    <span className="text-ink-3">{certification.issuer}</span>
                  </Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Harness />
      </div>
    </Block>
  );
}
