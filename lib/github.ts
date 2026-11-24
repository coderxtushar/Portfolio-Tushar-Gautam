/* Server-only module (imported only by server components).

   Public GitHub data for the profile section. Everything here is fetched on
   the server and cached for a day (ISR), with no token: the REST API and the
   public contributions calendar are both unauthenticated. Every fetch fails
   soft and returns null, so a GitHub outage never breaks a build. */

const DAY = 60 * 60 * 24;
const HEADERS = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-site" };

export type Repo = {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
};

export type ContributionDay = { date: string; level: 0 | 1 | 2 | 3 | 4; count: number };

export type GithubData = {
  login: string;
  name: string;
  avatar: string;
  url: string;
  publicRepos: number;
  since: number;
  repos: Repo[];
  languages: { name: string; count: number }[];
  contributions: { total: number; weeks: ContributionDay[][] } | null;
};

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { headers: HEADERS, next: { revalidate: DAY } });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

/* The contributions calendar is the public HTML GitHub renders on a profile.
   Each day is a <td data-date data-level id> and its count lives in the
   matching <tool-tip for=id>. */
async function getContributions(user: string): Promise<GithubData["contributions"]> {
  try {
    const response = await fetch(`https://github.com/users/${user}/contributions`, {
      headers: { "User-Agent": "portfolio-site" },
      next: { revalidate: DAY },
    });
    if (!response.ok) return null;
    const html = await response.text();

    const counts = new Map<string, number>();
    for (const match of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
      const n = /^(\d+)\s+contribution/.exec(match[2].trim());
      counts.set(match[1], n ? Number(n[1]) : 0);
    }

    const days: ContributionDay[] = [];
    for (const match of html.matchAll(/<td[^>]*class="ContributionCalendar-day"[^>]*>/g)) {
      const tag = match[0];
      const date = /data-date="([^"]+)"/.exec(tag)?.[1];
      const level = Number(/data-level="(\d)"/.exec(tag)?.[1] ?? 0);
      const id = /id="([^"]+)"/.exec(tag)?.[1] ?? "";
      if (date) days.push({ date, level: Math.min(4, Math.max(0, level)) as ContributionDay["level"], count: counts.get(id) ?? 0 });
    }
    if (days.length === 0) return null;

    days.sort((a, b) => a.date.localeCompare(b.date));
    /* Pad the first week so columns start on Sunday, like GitHub's grid */
    const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    const padded: (ContributionDay | null)[] = [...Array(firstWeekday).fill(null), ...days];
    const weeks: ContributionDay[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      weeks.push(padded.slice(i, i + 7).map((day) => day ?? { date: "", level: 0, count: -1 }));
    }

    const stated = /([\d,]+)\s+contributions?\s+in the last year/.exec(html.replace(/\s+/g, " "));
    const total = stated ? Number(stated[1].replace(/,/g, "")) : days.reduce((sum, day) => sum + day.count, 0);
    return { total, weeks };
  } catch {
    return null;
  }
}

type ApiUser = { login: string; name: string | null; avatar_url: string; html_url: string; public_repos: number; created_at: string };
type ApiRepo = { name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number; pushed_at: string; fork: boolean; archived: boolean };

export async function getGithubData(user: string): Promise<GithubData | null> {
  const [profile, repos, contributions] = await Promise.all([
    getJson<ApiUser>(`https://api.github.com/users/${user}`),
    getJson<ApiRepo[]>(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`),
    getContributions(user),
  ]);
  if (!profile) return null;

  const own = (repos ?? []).filter((repo) => !repo.fork && !repo.archived);
  const tally = new Map<string, number>();
  for (const repo of own) {
    if (repo.language) tally.set(repo.language, (tally.get(repo.language) ?? 0) + 1);
  }

  return {
    login: profile.login,
    name: (profile.name ?? profile.login).trim(),
    avatar: profile.avatar_url,
    url: profile.html_url,
    publicRepos: profile.public_repos,
    since: new Date(profile.created_at).getUTCFullYear(),
    repos: own.slice(0, 6).map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      pushedAt: repo.pushed_at,
    })),
    languages: [...tally.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
    contributions,
  };
}
