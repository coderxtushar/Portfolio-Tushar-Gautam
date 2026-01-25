"use client";

import { motion } from "framer-motion";
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiNextdotjs,
  SiEthereum,
} from "react-icons/si";

const highlights = [
  { label: "JavaScript", icon: SiJavascript },
  { label: "TypeScript", icon: SiTypescript },
  { label: "React.js", icon: SiReact },
  { label: "Next.js", icon: SiNextdotjs },
  { label: "Node.js", icon: SiNodedotjs },
  { label: "Blockchain", icon: SiEthereum },
];

const interests = [
  "Web Applications",
  "Blockchain Systems",
  "High-Performance Backends",
  "On-chain / Off-chain Integration",
];

export default function About() {
  return (
    <section id="about" className="py-8 sm:py-10 md:py-16 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        {/* Heading */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8 md:mb-10">
          <div className="w-1 h-12 bg-linear-to-b from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            About
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10 md:mb-12">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-6 leading-relaxed">
              I’m a <span className="text-neutral-900 dark:text-neutral-100 font-medium">
                Software Engineer
              </span>{" "}
              focused on building scalable, reliable systems with clean architecture
              and thoughtful user experience.
            </p>

            <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-6 leading-relaxed">
              My work spans across frontend and backend systems, with a strong interest
              in performance, developer experience, and long-term maintainability.
            </p>

            <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I enjoy working at the intersection of engineering and product -
              translating complex ideas into simple, usable software.
            </p>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-blue-500/20 dark:border-blue-500/30 p-8 bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              Areas of Interest
            </h3>

            <ul className="space-y-4">
              {interests.map((interest, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400"
                >
                  <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                  {interest}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-6">
            Core Technologies
          </h3>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {highlights.map((tech, index) => (
              <motion.div
                key={tech.label}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 p-3 sm:p-5 rounded-xl
                           border border-cyan-300/30 dark:border-cyan-500/30
                           bg-linear-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20
                           hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
              >
                <tech.icon className="text-lg sm:text-2xl text-cyan-500 group-hover:text-blue-500 transition-all duration-300 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  {tech.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 md:mt-14 p-4 sm:p-6 md:p-8 rounded-2xl border border-purple-500/20 dark:border-purple-500/30
                     bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 backdrop-blur-sm"
        >
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <span className="text-neutral-900 dark:text-neutral-100 font-medium">
              Philosophy:
            </span>{" "}
            Build with clarity, ship with intention, and optimize for long-term value.
            Good software should feel obvious to use and easy to evolve.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
