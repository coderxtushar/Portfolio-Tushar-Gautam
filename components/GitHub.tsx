import Image from "next/image";
import type { CSSProperties } from "react";
import { PiArrowUpRightBold, PiGithubLogoBold, PiStarBold } from "react-icons/pi";
import { github, profile } from "@/lib/data";
import { getGithubData, type ContributionDay } from "@/lib/github";
import Block from "./ui/Block";
import Button from "./ui/Button";
import CountUp from "./motion/CountUp";
import InView from "./motion/InView";
import Reveal from "./motion/Reveal";
import SpotlightGroup from "./motion/SpotlightGroup";

/* Language dots: the violet family in steps, lime for the leader */
const LANG_TONES = ["bg-lime", "bg-violet", "bg-violet-soft", "bg-violet-hi", "bg-trace-2", "bg-ink-3"];
const HEAT = ["bg-raise-3", "bg-violet-deep", "bg-violet", "bg-violet-soft", "bg-lime"];

const monthFormat = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });
const dayFormat = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function relative(iso: string) {
  const days = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.round(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

function Heatmap({ weeks, total }: { weeks: ContributionDay[][]; total: number }) {
  /* Month labels sit over the first week that starts a new month */
  const labels = weeks.map((week, index) => {
    const first = week.find((day) => day.date);
    if (!first) return "";
    const month = first.date.slice(0, 7);
    const previous = weeks[index - 1]?.find((day) => day.date)?.date.slice(0, 7);
    return month !== previous ? monthFormat.format(new Date(`${first.date}T00:00:00Z`)) : "";
  });
  const active = weeks.flat().filter((day) => day.count > 0).length;

  return (
    <div className="card overflow-hidden p-5 md:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-body text-ink">
          <CountUp value={String(total)} className="semi-expanded text-value font-bold text-lime" />{" "}
          <span className="text-ink-2">contributions in the last year</span>
        </p>
        <p className="text-sm text-ink-3">
          {active} active day{active === 1 ? "" : "s"}
        </p>
      </div>

      <InView className="heatmap mt-6 overflow-x-auto pb-1" threshold={0.3}>
        <div className="grid w-max gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks.length}, 11px)` }}>
          {labels.map((label, index) => (
            <span key={`m-${index}`} className="h-4 whitespace-nowrap text-[0.6875rem] leading-none text-ink-3" aria-hidden="true">
              {label}
            </span>
          ))}
          {weeks.map((week, x) =>
            week.map((day, y) => (
              <span
                key={`${x}-${y}`}
                title={day.date ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${dayFormat.format(new Date(`${day.date}T00:00:00Z`))}` : undefined}
                className={`heat-cell size-[11px] rounded-[3px] ${day.count < 0 ? "opacity-0" : HEAT[day.level]}`}
                style={{ gridColumn: x + 1, gridRow: y + 2, ["--d" as string]: x + y } as CSSProperties}
              />
            )),
          )}
        </div>
      </InView>

      <div className="mt-4 flex items-center justify-end gap-1.5 text-[0.6875rem] text-ink-3" aria-hidden="true">
        Less
        {HEAT.map((tone) => (
          <span key={tone} className={`size-[11px] rounded-[3px] ${tone}`} />
        ))}
        More
      </div>
    </div>
  );
}

/**
 * GitHub profile section, live from the public API (cached for a day).
 * When GitHub can't be reached the section still renders, as a link.
 */
export default async function GitHub() {
  const data = await getGithubData(github.user);
  const profileUrl = `https://github.com/${github.user}`;

  return (
    <Block id="github" title={github.title} lead={github.lead}>
      {!data ? (
        <Button href={profileUrl} variant="ghost" icon={PiGithubLogoBold} external>
          github.com/{github.user}
        </Button>
      ) : (
        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          {/* Profile card */}
          <Reveal className="card relative flex flex-col overflow-hidden p-6 md:p-7">
            <span aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-violet/35 blur-3xl" />
            <div className="relative flex items-center gap-4">
              <span className="relative">
                <Image
                  src={data.avatar}
                  alt={`${profile.name} on GitHub`}
                  width={64}
                  height={64}
                  className="size-16 rounded-2xl border border-violet-edge object-cover"
                />
                <span className="led absolute -bottom-0.5 -right-0.5 ring-2 ring-raise-1" data-state="live" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="semi-expanded truncate text-h3 font-bold text-ink">{profile.name}</p>
                <p className="text-sm text-violet-soft">@{data.login}</p>
              </div>
            </div>

            <dl className="relative mt-7 grid grid-cols-3 gap-3">
              {[
                { label: "Public repos", value: String(data.publicRepos) },
                { label: "Languages", value: String(data.languages.length) },
                { label: "On GitHub since", value: String(data.since) },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-line bg-raise-2/60 p-3">
                  <dt className="text-[0.6875rem] leading-tight text-ink-3">{stat.label}</dt>
                  <dd className="mt-1.5">
                    <CountUp value={stat.value} className="semi-expanded text-[1.4rem] font-bold leading-none text-ink" />
                  </dd>
                </div>
              ))}
            </dl>

            {/* Language mix by repository */}
            <div className="relative mt-7">
              <p className="legend text-ink-3">Languages by repo</p>
              <InView className="lang-bar mt-3 flex h-2.5 overflow-hidden rounded-full bg-raise-3">
                {data.languages.map((lang, index) => (
                  <span
                    key={lang.name}
                    className={`lang-seg h-full ${LANG_TONES[index] ?? "bg-ink-3"}`}
                    style={{ width: `${(lang.count / data.languages.reduce((s, l) => s + l.count, 0)) * 100}%`, ["--d" as string]: index } as CSSProperties}
                  />
                ))}
              </InView>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                {data.languages.slice(0, 6).map((lang, index) => (
                  <li key={lang.name} className="flex items-center gap-1.5 text-sm text-ink-2">
                    <span aria-hidden="true" className={`size-2 rounded-full ${LANG_TONES[index] ?? "bg-ink-3"}`} />
                    {lang.name}
                    <span className="text-ink-3">{lang.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-auto pt-8">
              <Button href={data.url} variant="lime" icon={PiArrowUpRightBold} external>
                Follow on GitHub
              </Button>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {data.contributions ? (
              <Reveal index={1}>
                <Heatmap weeks={data.contributions.weeks} total={data.contributions.total} />
              </Reveal>
            ) : null}

            {/* Recently pushed repositories */}
            <SpotlightGroup as="ul" className="grid gap-3 sm:grid-cols-2">
              {data.repos.map((repo, index) => (
                <Reveal as="li" key={repo.name} index={index + 2}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-spot
                    className="card spot-card glow-hover group flex h-full flex-col p-5"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="semi-expanded break-all text-[1.1rem] font-bold leading-tight text-ink group-hover:text-violet-soft">
                        {repo.name}
                      </span>
                      <PiArrowUpRightBold className="mt-1 size-4 shrink-0 text-ink-3 transition-[color,transform] duration-300 group-hover:text-lime motion-safe:group-hover:rotate-45" aria-hidden="true" />
                    </span>
                    {repo.description ? (
                      <span className="mt-2 line-clamp-2 text-sm text-ink-3">{repo.description}</span>
                    ) : null}
                    <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-sm text-ink-3">
                      {repo.language ? (
                        <span className="flex items-center gap-1.5 text-ink-2">
                          <span aria-hidden="true" className="size-2 rounded-full bg-violet-soft" />
                          {repo.language}
                        </span>
                      ) : null}
                      {repo.stars > 0 ? (
                        <span className="flex items-center gap-1">
                          <PiStarBold className="size-3.5" aria-hidden="true" />
                          {repo.stars}
                        </span>
                      ) : null}
                      <span>Pushed {relative(repo.pushedAt)}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </SpotlightGroup>
          </div>
        </div>
      )}
    </Block>
  );
}
