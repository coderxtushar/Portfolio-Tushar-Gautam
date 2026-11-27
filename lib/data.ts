import type { IconType } from "react-icons";
import {
  SiC,
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglegemini,
  SiJavascript,
  SiKeras,
  SiKubernetes,
  SiLangchain,
  SiLinux,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiAmazonwebservices,
  SiJenkins,
  SiOllama,
  SiOpenai,
  SiSqlalchemy,
  SiStreamlit,
} from "react-icons/si";
import {
  PiDiscordLogoBold,
  PiGithubLogoBold,
  PiInstagramLogoBold,
  PiLinkedinLogoBold,
  PiXLogoBold,
} from "react-icons/pi";

/* ---------------------------------------------------------------------------
   Single source of truth for every piece of content on the site.
   Sourced from Tushar_Gautam_resume.pdf (Oct 2026). Do not hardcode copy
   inside components.
   --------------------------------------------------------------------------- */

export const profile = {
  name: "Tushar Gautam",
  title: "Software Engineer",
  company: "Ethara AI",
  location: "Gurgaon, Haryana",
  email: "tushar.gautam.dev@gmail.com",
  siteUrl: "https://coderxtushar.vercel.app",
  resumePath: "/resume/Tushar_Gautam_resume.pdf",
  /* Edition of the resume every figure on the site is restated from */
  resumeEdition: "Oct 2026",
  /* Hero headline. `emphasis` is the phrase set in lime. */
  headline: { lead: "I build web products, and the systems that ", emphasis: "evaluate AI agents." },
  summary:
    "Software engineer at Ethara AI working on long-horizon benchmarks for AI coding agents — Docker-based evaluation pipelines, test-state analysis, and the harnesses that decide whether a generated patch actually fixes anything. Before that, full-stack product work in Next.js and Node.",
} as const;

export type Social = {
  label: string;
  href: string;
  icon: IconType;
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/coderxtushar", icon: PiGithubLogoBold },
  { label: "LinkedIn", href: "https://linkedin.com/in/tushargautam1010", icon: PiLinkedinLogoBold },
  { label: "X", href: "https://twitter.com/coderxtushar", icon: PiXLogoBold },
  { label: "Instagram", href: "https://instagram.com/_tushar_gautam__", icon: PiInstagramLogoBold },
  { label: "Discord", href: "https://discordapp.com/users/1014353403738079242", icon: PiDiscordLogoBold },
];

export type Skill = {
  name: string;
  icon?: IconType;
};

export type SkillGroup = {
  label: string;
  note: string;
  items: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    note: "Day-to-day implementation",
    items: [
      { name: "Python", icon: SiPython },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "C++", icon: SiCplusplus },
      { name: "C", icon: SiC },
    ],
  },
  {
    label: "GenAI & agent evaluation",
    note: "Current focus at Ethara AI",
    items: [
      { name: "Agentic AI" },
      { name: "LLM evaluation" },
      { name: "Agent benchmarking" },
      { name: "Evaluation harnesses" },
      { name: "Trajectory analysis" },
      { name: "LangChain", icon: SiLangchain },
      { name: "Gemini", icon: SiGooglegemini },
    ],
  },
  {
    label: "Frontend",
    note: "Product surfaces",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    label: "Backend & data",
    note: "Services and persistence",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "FastAPI", icon: SiFastapi },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Mongoose", icon: SiMongoose },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "Redis", icon: SiRedis },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    label: "Infrastructure & tooling",
    note: "Build, ship, observe",
    items: [
      { name: "Docker", icon: SiDocker },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "AWS", icon: SiAmazonwebservices },
      { name: "Jenkins", icon: SiJenkins },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "Linux", icon: SiLinux },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Postman", icon: SiPostman },
    ],
  },
];

export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  current: boolean;
  points: string[];
};

export const experience: Role[] = [
  {
    company: "Ethara AI",
    title: "Software Engineer",
    period: "May 2026 — Present",
    location: "Gurgaon, Haryana",
    current: true,
    points: [
      "Contribute to the Long Horizon Terminal Benchmarking (LHTB) project, evaluating AI agent performance on complex software engineering tasks through repository-level benchmarks, terminal execution, and automated test validation.",
      "Work with Docker-based benchmarking pipelines to build repository-specific images, configure dependencies, apply code patches, and execute isolated test environments across software repositories.",
      "Evaluate AI-generated code fixes against ground-truth patches using structured test execution workflows, analysing baseline, test-patch, and fix-patch results to measure task resolution and functional correctness.",
      "Analyse automated test outcomes and execution logs, transforming raw output into structured results across passed, failed, skipped, and error states.",
      "Assess benchmark validity through test-state transition analysis — fail-to-pass, skip-to-pass, none-to-pass, and pass-to-pass — identifying resolved issues, regressions, and unsuccessful fixes.",
      "Support evaluation harnesses and reporting workflows for model-generated patches, detecting regressions and assessing the reliability of AI-driven software engineering agents.",
    ],
  },
  {
    company: "Dysmech Competency Services",
    title: "Web Developer Intern",
    period: "Jan 2025 — Apr 2025",
    location: "Bareilly, India",
    current: false,
    points: [
      "Built and deployed full-stack web applications in Next.js, React, and MongoDB with dynamic routing, API integrations, and responsive UI components.",
      "Delivered a Smart Bus Management System with real-time tracking and route optimisation, improving transport coordination efficiency.",
      "Collaborated with the engineering team to scope and refine project requirements end to end.",
    ],
  },
];

export type Education = {
  institution: string;
  qualification: string;
  period: string;
  result: string;
};

export const education: Education[] = [
  {
    institution: "Invertis University",
    qualification: "B.Tech, Computer Science Engineering",
    period: "Aug 2022 — Jun 2026",
    result: "CGPA 8.45",
  },
  {
    institution: "B.B.L. Public School, Bareilly",
    qualification: "Senior Secondary (XII)",
    period: "2022",
    result: "84%",
  },
  {
    institution: "G.K. City Montessori School, Bareilly",
    qualification: "Higher Secondary (X)",
    period: "2020",
    result: "85%",
  },
];

export type Project = {
  slug: string;
  /* Stable internal key for a project node; not shown in the UI. */
  designator: string;
  title: string;
  tagline: string;
  period: string;
  problem: string;
  points: string[];
  tech: Skill[];
  /* Featured projects form the hero graph, in this order */
  featured?: boolean;
  /* Headline figure. `source` says where it comes from (the resume, or a
     count taken from the repository). Omitted where nothing was measured: the
     case study renders nothing rather than inventing one. */
  metric?: { value: string; label: string; source?: string };
  /* Null means no public URL yet — the UI renders no button rather than a dead link */
  liveUrl: string | null;
  repoUrl: string | null;
  /* How the product works end to end, as a short chip row */
  flow?: string[];
  /* Full-page snapshot of the live site (1440 wide), scrolled inside a
     browser frame on the Work section */
  snapshot?: { src: string; height: number };
};

export const projects: Project[] = [
  {
    slug: "agent-labs",
    designator: "U1",
    featured: true,
    title: "Agent Labs",
    tagline: "Evaluation harness for coding agents",
    period: "Nov 2026",
    problem:
      "Coding-agent benchmarks often trust the agent's own report, can be gamed by editing the tests, and count a broken environment as a failed model.",
    points: [
      "Built a local-first harness that runs each coding agent inside a throwaway Docker container with no network, every Linux capability dropped, and CPU, memory and process limits, while model calls stay on the host.",
      "Designed layered, agent-independent grading: hidden acceptance tests are injected only after the patch is captured, then fail-to-pass and pass-to-pass checks run with per-test JUnit parsing.",
      "Closed a test-gaming hole by rejecting any patch that touches pytest configuration or a conftest.py before a single test runs.",
      "Reported results honestly: Wilson confidence intervals, unbiased pass@k only when there are enough samples, 14 evidence-backed failure categories, and infrastructure errors kept out of success rates.",
      "Shipped a FastAPI and SQLAlchemy backend with a lease-based worker that recovers from crashes without a queue, an OpenAI-compatible agent loop that runs local Ollama models, a Typer CLI and an 18-screen React dashboard.",
    ],
    tech: [
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Docker", icon: SiDocker },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "SQLAlchemy", icon: SiSqlalchemy },
      { name: "Ollama", icon: SiOllama },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
    metric: { value: "423", label: "tests guarding the harness", source: "test functions counted in the repository" },
    liveUrl: "https://agent-labs.tushar-gautam-dev.workers.dev/",
    repoUrl: "https://github.com/coderxtushar/Agent-Labs",
    flow: ["Sandbox", "Run agent", "Hidden tests", "Verdict"],
    snapshot: { src: "/projects/agent-labs-full.jpg", height: 3600 },
  },
  {
    slug: "joborbit",
    designator: "U2",
    featured: true,
    title: "JobOrbit",
    tagline: "Truthful job-search assistant",
    period: "Oct 2026",
    problem:
      "Job hunting means sifting hundreds of listings across platforms that ban automation, and most auto-apply tools break those rules and invent answers.",
    points: [
      "Built a local-first job-search assistant that parses a resume and pulls listings from five public ATS board APIs, opt-in open feeds and read-only email alerts, keeping restricted platforms import-only with no scraping.",
      "Wrote a transparent six-category scorer (skills, title, experience, location, freshness, preferences) that shows hard-filter reasons, evidence coverage and a confidence label for every match.",
      "Added three-step cross-source deduplication (source id, canonical URL, content fingerprint) that enriches existing records instead of overwriting them.",
      "Made optional AI cover letters safe: job text is fenced against prompt injection, drafts that state unverified facts are rejected, and a rule-based letter is the fallback.",
      "Kept applying human-in-the-loop down to a database constraint, with a resumable bulk-preparation engine, an application state machine with an audit log, and 512 tests gated in CI on an 85% coverage floor, mypy, ruff and migration checks.",
    ],
    tech: [
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Streamlit", icon: SiStreamlit },
      { name: "SQLAlchemy", icon: SiSqlalchemy },
      { name: "Alembic" },
      { name: "OpenAI (optional)", icon: SiOpenai },
      { name: "GitHub Actions", icon: SiGithubactions },
    ],
    metric: { value: "22", label: "job sources, none of them scrapers", source: "source adapters counted in the repository" },
    liveUrl: "https://job-orbit-chi.vercel.app",
    repoUrl: "https://github.com/coderxtushar/JobOrbit",
    flow: ["Import", "Deduplicate", "Score", "Prepare"],
    snapshot: { src: "/projects/joborbit-full.jpg", height: 3600 },
  },
  {
    slug: "brandbot",
    designator: "U3",
    featured: true,
    title: "BrandBot",
    tagline: "AI content team for personal brands",
    period: "Sep 2025, rebuilt Nov 2026",
    problem:
      "Writing on-brand, researched posts for several social platforms by hand is slow and inconsistent.",
    points: [
      "Built a LangGraph pipeline with five roles (profile, planner, writer, editor, art director) and Tavily research that turns one idea into posts for six platforms: LinkedIn, X, Threads, Instagram, Medium and YouTube Shorts.",
      "Gave every platform its own write, review and rewrite loop, with a voice linter that sends machine-sounding drafts back for revision; runs pause for human approval and survive restarts through LangGraph checkpointers.",
      "Shipped OAuth publishing to LinkedIn, X, Threads and Instagram with encrypted tokens and atomically claimed scheduled posts, on a FastAPI and SQLAlchemy backend with 45 endpoints and 150 tests in CI.",
    ],
    tech: [
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "LangGraph" },
      { name: "Gemini", icon: SiGooglegemini },
      { name: "Tavily Search" },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "SQLAlchemy", icon: SiSqlalchemy },
    ],
    metric: { value: "6", label: "platforms written for, from one idea", source: "platform specs counted in the repository" },
    liveUrl: "https://brandbot-studio.vercel.app",
    repoUrl: "https://github.com/coderxtushar/BrandBot-Ai-Agent",
    flow: ["Brand profile", "Plan + research", "Write + review", "Publish"],
    snapshot: { src: "/projects/brandbot-full.jpg", height: 2200 },
  },
  {
    slug: "rivera",
    designator: "U4",
    featured: true,
    title: "Rivera",
    tagline: "Course marketplace for instructors",
    period: "Nov 2026",
    problem:
      "Instructors need one place to publish and sell courses, and students need one place to buy them, learn and get certified.",
    points: [
      "Built a course marketplace on an Express 5 and MongoDB API (68 route handlers) with a Next.js front end: students browse, buy, learn lesson by lesson and earn certificates with a public verify page.",
      "Implemented JWT access tokens with rotating refresh tokens, where replaying a revoked token revokes its whole token family, plus student, instructor and admin roles with their own dashboards.",
      "Integrated Razorpay and Stripe checkout behind one provider interface with verified signatures and webhooks, automatic refunds for orders that cannot be honoured, coupons and a configurable platform fee, covered by 55 integration tests.",
    ],
    tech: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
    metric: { value: "55", label: "integration tests on the API", source: "integration tests counted in the repository" },
    liveUrl: "https://learn-rivera.vercel.app",
    repoUrl: "https://github.com/coderxtushar/Rivera",
    flow: ["Browse", "Checkout", "Learn", "Certificate"],
    snapshot: { src: "/projects/rivera-full.jpg", height: 2216 },
  },
  {
    slug: "snap-ui",
    designator: "U5",
    title: "Snap UI",
    tagline: "AI-driven UI builder",
    period: "Mar 2025 — Apr 2025",
    problem: "Hand-building the same layout scaffolding for every new interface is slow and repetitive.",
    points: [
      "Built an AI-driven UI builder that generates and customises modern web interfaces from a description.",
      "Implemented dynamic component rendering, real-time editing, and AI-assisted design suggestions on Next.js with a Convex backend.",
      "Automated auth, component generation, and live previews, cutting manual setup effort by roughly 60%.",
    ],
    tech: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Convex" },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
    metric: { value: "~60%", label: "less manual setup effort" },
    liveUrl: "https://snap-ui-lovat.vercel.app",
    repoUrl: "https://github.com/coderxtushar/Snap-UI",
  },
  {
    slug: "ci-cd-pipeline",
    designator: "U6",
    title: "Jenkins to EC2 delivery pipeline",
    tagline: "Automated deployment infrastructure",
    period: "Apr 2025 — May 2025",
    problem: "Manual deploys to EC2 are slow, inconsistent, and easy to get wrong under pressure.",
    points: [
      "Designed a CI/CD pipeline across AWS, Docker, and Jenkins that deploys code to EC2 instances automatically.",
      "Built Jenkins workflows with secure SSH integration and custom deployment scripts for repeatable releases.",
    ],
    tech: [
      { name: "AWS", icon: SiAmazonwebservices },
      { name: "Jenkins", icon: SiJenkins },
      { name: "Docker", icon: SiDocker },
      { name: "Linux", icon: SiLinux },
      { name: "Git", icon: SiGit },
    ],
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: "parking-vehicle-detection",
    designator: "U7",
    title: "Parking management",
    tagline: "Vehicle detection and recognition",
    period: "Sep 2024 — Nov 2024",
    problem: "Restricted parking zones need automatic enforcement rather than a human watching a camera feed.",
    points: [
      "Implemented computer vision pipelines in Python and OpenCV to detect vehicles in restricted zones at over 90% accuracy.",
      "Trained recognition models with TensorFlow and Keras, improving classification across varied lighting and weather.",
      "Added interactive visual components for smoother navigation of detection results.",
    ],
    tech: [
      { name: "Python", icon: SiPython },
      { name: "OpenCV", icon: SiOpencv },
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "Keras", icon: SiKeras },
    ],
    metric: { value: "90%+", label: "vehicle detection accuracy" },
    liveUrl: null,
    repoUrl: null,
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const certifications: { name: string; issuer: string }[] = [
  { name: "Zero Trust Cloud Security", issuer: "Zscaler" },
  { name: "Postman API Fundamentals Student Expert", issuer: "Postman" },
  { name: "Mastering DSA in C/C++", issuer: "Udemy" },
];

export const achievements: { label: string; detail: string }[] = [
  { label: "Hackathons", detail: "5+ including Adobe India Hackathon 2025 and ISRO's Bhartiya Antariksh Hackathon" },
  { label: "LeetCode", detail: "1497 contest rating" },
  { label: "Codeforces", detail: "848 contest rating" },
];

/* About block copy */
export const about = {
  title: "I build the infrastructure that grades AI code.",
  lead: "Most of my time goes into deciding whether a model's patch genuinely fixed something or only looked like it did. The rest goes into building product.",
  paragraphs: [
    "At Ethara AI I contribute to the Long Horizon Terminal Benchmark, which evaluates coding agents against real repository-level tasks. In practice that means building a Docker image per repository, pinning its dependencies, applying candidate patches, and running the test suite in isolation, then reading the results closely enough to tell a genuine fix from a lucky one.",
    "The interesting part is the transitions. A patch that turns a failing test green is only useful if it did not quietly break three passing ones, so I spend a lot of time on fail-to-pass, pass-to-pass, and regression analysis, turning raw execution logs into structured verdicts.",
    "Before this I was shipping product: full-stack Next.js and Node applications, a real-time bus routing system during my internship, and a few AI tools of my own. Having written the kind of code I now evaluate makes it much harder to be fooled by a patch that reads well and does nothing.",
  ],
};

/* Test points: measured values a visitor can probe. Real figures only. */
export const testPoints: { ref: string; label: string; value: string }[] = [
  { ref: "TP1", label: "CGPA, B.Tech CSE", value: "8.45" },
  { ref: "TP2", label: "LeetCode contest rating", value: "1497" },
  { ref: "TP3", label: "Codeforces contest rating", value: "848" },
  { ref: "TP4", label: "Hackathons, including Adobe India Hackathon 2025 and ISRO's Bhartiya Antariksh Hackathon", value: "5+" },
];

/* The LHTB evaluation loop, in the order it actually runs. */
export const pipeline: { step: string; detail: string }[] = [
  { step: "Build", detail: "Repository-specific Docker image, dependencies pinned" },
  { step: "Patch", detail: "Apply the candidate or ground-truth diff" },
  { step: "Execute", detail: "Run the suite in an isolated container" },
  { step: "Parse", detail: "Logs to structured pass / fail / skip / error" },
  { step: "Judge", detail: "Transition analysis decides if the issue is resolved" },
];

/* Test-state transitions used to decide benchmark validity. `bad` marks the
   transition that turns a fix into a regression. */
export const verdicts: { code: string; meaning: string; bad?: boolean }[] = [
  { code: "f2p", meaning: "Fail to pass: the issue is genuinely resolved" },
  { code: "p2p", meaning: "Pass to pass: nothing previously working broke" },
  { code: "s2p", meaning: "Skip to pass: previously skipped, now covered" },
  { code: "n2p", meaning: "None to pass: a newly introduced passing test" },
  { code: "p2f", meaning: "Pass to fail: a regression, so the patch is rejected", bad: true },
];

export type TestState = "pass" | "fail" | "skip" | "none";

export type HarnessTest = {
  name: string;
  before: TestState;
  /* After-state per candidate patch */
  after: { fix: TestState; lucky: TestState };
};

/* Illustrative harness run for the home page. Synthetic by design: this is
   a demonstration of the method, not data from the LHTB benchmark, and the
   UI labels it as such. */
export const harnessDemo = {
  repo: "example/dateparse",
  issue: "ISO-8601 strings with a UTC offset are parsed as local time",
  candidates: [
    { id: "fix", label: "Candidate A", note: "Real fix" },
    { id: "lucky", label: "Candidate B", note: "Lucky patch" },
  ] as const,
  tests: [
    { name: "test_parse_iso_offset", before: "fail", after: { fix: "pass", lucky: "pass" } },
    { name: "test_parse_basic_date", before: "pass", after: { fix: "pass", lucky: "pass" } },
    { name: "test_format_roundtrip", before: "pass", after: { fix: "pass", lucky: "fail" } },
    { name: "test_dst_boundary", before: "skip", after: { fix: "pass", lucky: "pass" } },
    { name: "test_offset_minutes", before: "none", after: { fix: "pass", lucky: "pass" } },
  ] satisfies HarnessTest[],
  log: [
    "docker build -t dateparse:eval .",
    "git apply candidate.patch",
    "pytest -q --json-report",
    "parse report.json → 5 results",
    "diff baseline → transitions",
  ],
};

/* Sections of the board. `ref` is the reference designator printed on the
   block outline. */
export const sections = [
  { id: "about", label: "About", ref: "U5" },
  { id: "work", label: "Work", ref: "BOM" },
  { id: "experience", label: "Experience", ref: "REV" },
  { id: "skills", label: "Skills", ref: "U6" },
  { id: "github", label: "GitHub", ref: "GH" },
  { id: "contact", label: "Contact", ref: "J2" },
] as const;

/* Taglines set on the opposite side of each section heading */
export const taglines: Record<string, string> = {
  about: "Looks right is not the same as is right",
  work: "Shipped, tested, measured",
  experience: "Every role left a commit history",
  skills: "Picked for the job, not the résumé",
  github: "Where the work actually lives",
  contact: "Inbox open, latency low",
};

/* Tokens for the marquee ribbons: the pipeline, the verdicts, the work */
export const ribbonTokens = {
  pipeline: ["Build", "Patch", "Execute", "Parse", "Judge"],
  verdicts: ["f2p", "p2p", "s2p", "n2p", "p2f"],
  /* The moving band under the hero: what I work on and with */
  keywords: [
    "Agentic AI",
    "LLM Evaluation",
    "Agent Benchmarking",
    "Evaluation Harnesses",
    "Trajectory Analysis",
    "Multi-Agent Systems",
    "LangGraph",
    "Python",
    "TypeScript",
    "Next.js",
    "FastAPI",
    "Docker",
    "Kubernetes",
    "AWS",
  ],
};

/* GitHub profile section */
export const github = {
  user: "coderxtushar",
  title: "Built in the open.",
  lead: "Live from GitHub: what I've been pushing, in what, and how often.",
};

