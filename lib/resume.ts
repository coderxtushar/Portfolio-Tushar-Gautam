/* The resume, as HTML. Based on public/resume/Tushar_Gautam_resume.pdf
   (Oct 2026), plus Agent Labs and JobOrbit, which the PDF predates. Their
   bullets restate only facts verified in each repository (Nov 2026). The
   phone number is deliberately omitted. */

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
      href: "https://github.com/coderxtushar/Agent-Labs",
      stack: "Python, FastAPI, Docker, React, TypeScript, SQLAlchemy",
      points: [
        "Built a local-first evaluation harness for coding agents that runs each agent in an isolated Docker sandbox (no network, all capabilities dropped, CPU, memory and process limits) and grades its patch with hidden acceptance tests injected only after the patch is captured.",
        "Implemented fail-to-pass and pass-to-pass grading with per-test JUnit parsing, rejected patches that tamper with test configuration, and reported honest metrics: Wilson intervals, unbiased pass@k and 14 failure categories.",
        "Shipped a FastAPI and SQLAlchemy backend with a crash-recoverable, lease-based worker, an OpenAI-compatible agent loop for local Ollama models and an 18-screen React dashboard, covered by 423 tests.",
      ],
    },
    {
      name: "JobOrbit",
      href: "https://github.com/coderxtushar/JobOrbit",
      stack: "Python, FastAPI, Streamlit, SQLAlchemy, Alembic",
      points: [
        "Built a local-first job-search assistant that pulls listings from 22 sources (public ATS APIs, open feeds, read-only email alerts) without scraping, with three-step cross-source deduplication.",
        "Designed a transparent six-category match scorer with hard-filter reasons, evidence coverage and confidence labels, plus optional AI cover letters guarded against prompt injection and unverified claims.",
        "Enforced human-in-the-loop applying at the database level; 512 tests run in CI behind an 85% coverage gate, mypy, ruff and migration checks.",
      ],
    },
    {
      name: "BrandBot AI Agent",
      stack: "Python, FastAPI, LangChain, React.js, Tailwind CSS",
      points: [
        "Built an autonomous LinkedIn AI agent using LangChain, LangGraph, and Google Gemini that automates brand analysis, trend research and content creation.",
        "Designed a multi-agent workflow with 5+ specialized agents, integrated Tavily Search for real-time insights and reduced manual content ideation effort by ~70%.",
      ],
    },
    {
      name: "Snap UI",
      stack: "Next.js, React.js, TypeScript, Tailwind CSS",
      points: [
        "Developed a powerful AI-driven UI builder that enables users to generate and customise modern web interfaces effortlessly.",
        "Implemented dynamic component rendering, real-time editing, and AI-assisted design suggestions using Next.js, Tailwind CSS and Convex backend.",
        "Automated workflows for auth, component generation, and previews, reducing manual setup effort by ~60%.",
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
