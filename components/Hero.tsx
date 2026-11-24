import { PiArrowDownBold, PiFilePdfBold } from "react-icons/pi";
import { profile } from "@/lib/data";
import Button from "./ui/Button";
import Circuit from "./Circuit";
import HeroAurora from "./motion/HeroAurora";
import HeroName from "./motion/HeroName";
import Magnetic from "./motion/Magnetic";
import RevealText from "./motion/RevealText";

/**
 * First viewport: the name arrives letter by letter over a scroll-parallax
 * aurora, the headline rises word by word, and the live project graph powers
 * on beside it. On phones the graph moves up between the headline and the
 * summary, so the first screen already shows the work.
 */
export default function Hero() {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-x-clip pb-10 pt-28 md:pb-14 md:pt-36"
    >
      <HeroAurora />

      <div className="shell grid grid-cols-[minmax(0,1fr)] gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_auto]">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <h1 id="hero-title" className="expanded text-part font-extrabold text-ink max-sm:text-[17vw]">
            <HeroName first={first} last={rest.join(" ")} />
          </h1>

          <p className="semi-expanded mt-7 max-w-[22ch] text-[1.5rem] font-semibold leading-[1.18] tracking-[-0.02em] text-ink text-balance md:text-[1.75rem]">
            <RevealText text={profile.headline.lead.trim()} delay={0.55} />{" "}
            <span className="text-lime">
              <RevealText text={profile.headline.emphasis} delay={0.85} />
            </span>
          </p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <Circuit />
        </div>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <p className="max-w-[54ch] text-body text-ink-2 text-pretty">{profile.summary}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button href="#work" variant="lime" icon={PiArrowDownBold}>
                Read the case studies
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button href="/resume" variant="ghost" icon={PiFilePdfBold}>
                Resume
              </Button>
            </Magnetic>
          </div>

          <p className="mt-7 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-line-strong bg-raise-1/70 py-1.5 pl-3 pr-3.5 text-sm text-ink-2">
            <span className="led" data-state="live" aria-hidden="true" />
            {profile.title} at <span className="text-ink">{profile.company}</span>
            <span aria-hidden="true" className="text-ink-3">·</span>
            <span className="text-ink-3">{profile.location}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
