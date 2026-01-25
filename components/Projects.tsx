"use client";

import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiFastapi,
  SiTensorflow,
  SiOpencv,
  SiLangchain,
} from "react-icons/si";

type Project = {
  title: string;
  period: string;
  type: string;
  description: string[];
  tech: { name: string; icon: any }[];
};

const projects: Project[] = [
  {
    title: "Snap UI – AI-Powered UI Builder",
    period: "Mar 2025 – Apr 2025",
    type: "Individual Project",
    description: [
      "Built an AI-driven UI builder enabling users to generate and customize modern web interfaces effortlessly.",
      "Implemented dynamic component rendering, real-time editing, and AI-assisted design suggestions using Next.js and Convex.",
      "Automated auth, component generation, and live previews, reducing manual setup effort by ~60%.",
    ],
    tech: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    title: "BrandBot – Autonomous AI Agent",
    period: "Jul 2025 – Aug 2025",
    type: "Individual Project",
    description: [
      "Developed an autonomous LinkedIn AI agent for brand analysis, trend research, and content creation.",
      "Designed a multi-agent workflow with 5+ specialized agents using LangChain and LangGraph.",
      "Integrated real-time search and Gemini-powered reasoning, reducing content ideation effort by ~70%.",
    ],
    tech: [
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "LangChain", icon: SiLangchain },
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    title: "Parking Management – Vehicle Detection & Recognition",
    period: "Sep 2024 – Nov 2024",
    type: "Individual Project",
    description: [
      "Implemented computer vision pipelines using Python and OpenCV to detect vehicles in restricted zones with over 90% accuracy.",
      "Trained vehicle recognition models using TensorFlow/Keras to improve classification across diverse environments.",
      "Enhanced interactivity with JavaScript-based visual components for smoother navigation and usability.",
    ],
    tech: [
      { name: "Python", icon: SiPython },
      { name: "OpenCV", icon: SiOpencv },
      { name: "TensorFlow", icon: SiTensorflow },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-8 sm:py-10 md:py-16 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-8 sm:mb-10 md:mb-12">
          <div className="w-1 h-12 bg-linear-to-b from-emerald-500 to-teal-500 rounded-full"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Projects
          </h2>
        </div>

        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-emerald-500/20 dark:border-emerald-500/30 p-4 sm:p-6 md:p-8
                         bg-linear-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20
                         hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {project.title}
                </h3>
                <span className="text-xs sm:text-sm text-neutral-500">
                  {project.period} · {project.type}
                </span>
              </div>

              {/* Description */}
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {project.description.map((point, i) => (
                  <li
                    key={i}
                    className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed"
                  >
                    {point}
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {project.tech.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm
                               border border-teal-300/50 dark:border-teal-500/30
                               bg-linear-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30
                               hover:shadow-md hover:shadow-teal-500/20 transition-all"
                  >
                    <tech.icon className="text-lg text-neutral-700 dark:text-neutral-300" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub */}
        <div className="mt-8 sm:mt-10 md:py-12 text-center">
          <a
            href="https://github.com/coderxtushar"
            target="_blank"
            className="inline-block px-6 py-3 rounded-xl
                       border border-neutral-300 dark:border-neutral-700
                       text-neutral-700 dark:text-neutral-300
                       hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            View More Projects on GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
