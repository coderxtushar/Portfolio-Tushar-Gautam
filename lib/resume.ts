/* The resume, as HTML. Based on public/resume/Tushar_Gautam_resume.pdf
   (Oct 2026), plus Agent Labs, JobOrbit and Rivera, which the PDF predates,
   and BrandBot rewritten from its current code. Their bullets restate only
   facts verified in each repository (Nov 2026). The phone number is
   deliberately omitted. */

export const resume = {
  name: "Tushar Gautam",
  role: "Software Engineer at Ethara AI",
  location: "Gurgaon, Haryana",
  email: "tushar.gautam.dev@gmail.com",
  links: [
    { label: "Portfolio", href: "https://coderxtushar.vercel.app/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tushargautam1010/" },
    { label: "GitHub", href: "https://github.com/coderxtushar" },
    { label: "LeetCode", href: "https://leetcode.com/u/coderxtushar/" },
  ],
  education: [
    {
      school: "Invertis University",
      place: "Bareilly, Uttar Pradesh",
      degree: "Bachelor of Technology in Computer Science Engineering",
      period: "Aug 2022 – Jun 2026",
    },
  ],
  experience: [
    {
      title: "Software Engineer",
      company: "Ethara AI",
      period: "May 2026 – Present",
      place: "Gurgaon, Haryana",
      points: [
        "Contribute to the Long Horizon Terminal Benchmarking (LHTB) project, evaluating AI agent performance on complex software engineering tasks through repository-level benchmarks, terminal execution and automated test validation.",
        "Work with Docker-based benchmarking pipelines to build repository-specific images, configure dependencies, apply code patches and execute isolated test environments across software repositories.",
        "Evaluate AI-generated code fixes against ground-truth patches using structured test execution workflows, analyzing baseline, test-patch and fix-patch results to measure task resolution and functional correctness.",
        "Analyze automated test outcomes and execution logs, transforming raw outputs into structured test results, including passed, failed, skipped and error states.",
        "Assess benchmark validity through test-state transition analysis, including fail-to-pass (f2p), skip-to-pass (s2p), none-to-pass (n2p) and pass-to-pass (p2p), identifying resolved issues, regressions and unsuccessful fixes.",
        "Support evaluation harnesses and reporting workflows for model-generated code patches, validating test outcomes, detecting regressions and assessing the reliability of AI-driven software engineering agents.",
      ],
    },
  ],
  projects: [
    {
      name: "Agent Labs",
      live: "https://agent-labs.tushar-gautam-dev.workers.dev/",
      repo: "https://github.com/coderxtushar/Agent-Labs",
      preview: "/projects/agent-labs.jpg",
      stack: "Python, FastAPI, Docker, React, TypeScript, SQLAlchemy",
      points: [
        "Built a local-first evaluation harness for coding agents that runs each agent in an isolated Docker sandbox (no network, all capabilities dropped, CPU, memory and process limits) and grades its patch with hidden acceptance tests injected only after the patch is captured.",
        "Implemented fail-to-pass and pass-to-pass grading with per-test JUnit parsing, rejected patches that tamper with test configuration, and reported honest metrics: Wilson intervals, unbiased pass@k and 14 failure categories.",
        "Shipped a FastAPI and SQLAlchemy backend with a crash-recoverable, lease-based worker, an OpenAI-compatible agent loop for local Ollama models and an 18-screen React dashboard, covered by 423 tests.",
      ],
    },
    {
      name: "JobOrbit",
      live: "https://job-orbit-chi.vercel.app",
      repo: "https://github.com/coderxtushar/JobOrbit",
      preview: "/projects/joborbit.jpg",
      stack: "Python, FastAPI, Streamlit, SQLAlchemy, Alembic",
      points: [
        "Built a local-first job-search assistant that pulls listings from 22 sources (public ATS APIs, open feeds, read-only email alerts) without scraping, with three-step cross-source deduplication.",
        "Designed a transparent six-category match scorer with hard-filter reasons, evidence coverage and confidence labels, plus optional AI cover letters guarded against prompt injection and unverified claims.",
        "Enforced human-in-the-loop applying at the database level; 512 tests run in CI behind an 85% coverage gate, mypy, ruff and migration checks.",
      ],
    },
    {
      name: "BrandBot",
      live: "https://brandbot-studio.vercel.app",
      repo: "https://github.com/coderxtushar/BrandBot-Ai-Agent",
      preview: "/projects/brandbot.jpg",
      stack: "Python, FastAPI, LangGraph, Gemini, Tavily, Next.js, SQLAlchemy",
      points: [
        "Built a LangGraph content pipeline with five roles (profile, planner, writer, editor, art director) and Tavily research that turns one idea into on-brand posts for six platforms.",
        "Gave each platform a write, review and rewrite loop with a voice linter that sends machine-sounding drafts back; runs pause for human approval and survive restarts through LangGraph checkpointers.",
        "Shipped OAuth publishing to LinkedIn, X, Threads and Instagram with encrypted tokens and scheduled posts, on a FastAPI backend with 45 endpoints and 150 tests in CI.",
      ],
    },
    {
      name: "Rivera",
      live: "https://learn-rivera.vercel.app",
      repo: "https://github.com/coderxtushar/Rivera",
      preview: "/projects/rivera.jpg",
      stack: "Node.js, Express, MongoDB, Next.js, TypeScript, Tailwind CSS",
      points: [
        "Built a course marketplace on an Express 5 and MongoDB API (68 route handlers) with a Next.js front end, where students buy courses, learn lesson by lesson and earn verifiable certificates.",
        "Implemented JWT authentication with rotating refresh tokens that revoke the whole token family on replay, plus student, instructor and admin roles with their own dashboards.",
        "Integrated Razorpay and Stripe checkout behind one provider interface with verified webhooks, automatic refunds, coupons and a configurable platform fee, covered by 55 integration tests.",
      ],
    },
  ],
  skills: [
    { label: "Programming Languages", items: "Python, JavaScript, C++, C" },
    {
      label: "GenAI / Agentic AI",
      items:
        "Agentic AI, LLM Evaluation, AI Agent Benchmarking, Reinforcement Learning Trajectory Analysis, Model-Generated Code Evaluation, Evaluation Harnesses, Benchmarking Pipelines",
    },
    {
      label: "Tools / Platforms",
      items:
        "Git/GitHub, Docker, Kubernetes, AWS, GitHub Actions, Linux, Terminal-Based Workflows, Automated Test Execution, Regression Detection, Test Result Analysis",
    },
    { label: "Backend / Databases", items: "Node.js, Express.js, FastAPI, MongoDB, PostgreSQL, MySQL, Redis, Firebase" },
    { label: "Libraries / Frameworks", items: "React.js, Next.js, Mongoose, Tailwind CSS, Postman" },
  ],
};
