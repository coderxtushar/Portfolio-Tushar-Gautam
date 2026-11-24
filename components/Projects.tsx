import { PiArrowUpRightBold, PiGithubLogoBold } from "react-icons/pi";
import { projects, socials } from "@/lib/data";
import Block from "./ui/Block";
import Button from "./ui/Button";
import Provenance from "./ui/Provenance";
import CountUp from "./motion/CountUp";
import Reveal from "./motion/Reveal";
import SpotlightGroup from "./motion/SpotlightGroup";

const github = socials.find((social) => social.label === "GitHub");

/**
 * The work as a list of large rows: the name in display type, the problem it
 * answers, a provenance ticket for every figure, and the figure itself in
 * lime. Every row opens the case study, the site's primary action.
 */
export default function Projects() {
  return (
    <Block
      id="work"
      title="Things I've built."
      lead="Each one started with a problem worth the effort. The figures are measured, not estimated upward."
    >
      <SpotlightGroup as="ol" className="border-t border-line-strong">
        {projects.map((project, index) => (
          <Reveal as="li" key={project.slug} index={index}>
            <a
              href={`/projects/${project.slug}`}
              data-spot
              className="bom-row spot-card group relative grid gap-x-8 gap-y-4 border-b border-line py-9 transition-colors duration-300 hover:bg-raise-1/60 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.5fr)_10rem_3rem] md:items-start md:px-2"
            >
              <div>
                <span className="semi-expanded block text-[1.9rem] font-bold leading-[1.02] tracking-[-0.03em] text-ink transition-colors duration-200 group-hover:text-violet-soft md:text-[2.15rem]">
                  {project.title}
                </span>
                <span className="mt-2 block text-sm text-ink-3">{project.tagline}</span>
                {index === 0 ? (
                  <span className="legend mt-3 inline-flex rounded-full bg-lime px-2.5 py-1 text-[0.625rem] text-ground">
                    Main project
                  </span>
                ) : null}
              </div>

              <div className="text-sm text-ink-2 text-pretty">
                {project.problem}
                <Provenance project={project} withStack className="mt-4" />
              </div>

              <div className="md:text-right">
                {project.metric ? (
                  <>
                    <CountUp value={project.metric.value} className="semi-expanded block text-value font-bold text-lime" />
                    <span className="mt-1.5 block text-sm leading-snug text-ink-3">
                      {project.metric.label}
                    </span>
                  </>
                ) : (
                  <span className="block text-sm text-ink-3">Not measured</span>
                )}
              </div>

              <div className="flex items-center gap-3 md:justify-end">
                <span className="text-sm font-medium text-ink md:sr-only">Open case study</span>
                <span className="grid size-11 place-items-center rounded-full border border-line-strong text-ink-2 transition-[background-color,border-color,color,transform] duration-300 motion-safe:group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-ground">
                  <PiArrowUpRightBold className="size-4" aria-hidden="true" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </SpotlightGroup>

      {github ? (
        <div className="mt-10">
          <Button href={github.href} variant="ghost" icon={PiGithubLogoBold} external>
            More on GitHub
          </Button>
        </div>
      ) : null}
    </Block>
  );
}
