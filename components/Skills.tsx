"use client";

import { motion } from "framer-motion";
import {
  SiCplusplus,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiGithub,
  SiAmazon,
  SiDocker,
  SiKubernetes,
  SiPostman,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiFastapi,
} from "react-icons/si";

type Skill = {
  name: string;
  icon: any;
  description: string;
};

const coreSkills: Skill[] = [
  { name: "C / C++", icon: SiCplusplus, description: "Systems programming" },
  { name: "JavaScript", icon: SiJavascript, description: "Frontend & backend" },
  { name: "Python", icon: SiPython, description: "APIs & automation" },
  { name: "React.js", icon: SiReact, description: "UI development" },
  { name: "Next.js", icon: SiNextdotjs, description: "Full-stack React" },
  { name: "Node.js", icon: SiNodedotjs, description: "Server runtime" },
  { name: "Express.js", icon: SiExpress, description: "Backend framework" },
  { name: "Tailwind CSS", icon: SiTailwindcss, description: "Utility CSS" },
];

const infraSkills: Skill[] = [
  { name: "MongoDB", icon: SiMongodb, description: "NoSQL database" },
  { name: "MySQL", icon: SiMysql, description: "Relational DB" },
  { name: "PostgreSQL", icon: SiPostgresql, description: "Advanced SQL DB" },
  { name: "Redis", icon: SiRedis, description: "In-memory store" },
  { name: "Firebase", icon: SiFirebase, description: "Realtime backend" },
  { name: "FastAPI", icon: SiFastapi, description: "Python APIs" },
  { name: "Docker", icon: SiDocker, description: "Containers" },
  { name: "Kubernetes", icon: SiKubernetes, description: "Orchestration" },
  { name: "AWS (EC2, S3)", icon: SiAmazon, description: "Cloud infra" },
  { name: "Git / GitHub", icon: SiGithub, description: "Version control" },
  { name: "Postman", icon: SiPostman, description: "API testing" },
];

// duplicate array for seamless looping
const duplicate = (arr: Skill[]) => [...arr, ...arr];

function SkillMarquee({
  skills,
  reverse = false,
}: {
  skills: Skill[];
  reverse?: boolean;
}) {
  return (
    <motion.div
      className="flex gap-3 sm:gap-6 md:gap-8 w-max"
      animate={{
        x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      }}
      whileHover={{ animationPlayState: "paused" }}
    >
      {duplicate(skills).map((skill, i) => (
        <div
          key={`${skill.name}-${i}`}
          className="group relative flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl
                     bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20
                     border border-orange-300/50 dark:border-orange-500/30
                     cursor-pointer hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
        >
          <skill.icon
            className="text-lg sm:text-xl shrink-0 text-orange-500 group-hover:text-red-500 transition-all duration-300"
          />
          <span className="text-xs sm:text-sm whitespace-nowrap">{skill.name}</span>

          {/* Tooltip */}
          <div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3
                       hidden group-hover:block
                       px-3 py-1 rounded-md text-xs
                       bg-black text-white whitespace-nowrap"
          >
            {skill.description}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="overflow-hidden px-4 sm:px-6 py-8 sm:py-10 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6 sm:mb-8 md:mb-10">
          <div className="w-1 h-12 bg-linear-to-b from-orange-500 to-red-500 rounded-full"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Skills
          </h2>
        </div>

        <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
          {/* Core Stack */}
          <div>
            <p className="mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wide text-neutral-500">
              Core Stack
            </p>
            <div className="overflow-hidden">
              <SkillMarquee skills={coreSkills} />
            </div>
          </div>

          {/* Backend & Infra */}
          <div>
            <p className="mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wide text-neutral-500">
              Backend & Infra
            </p>
            <div className="overflow-hidden">
              <SkillMarquee skills={infraSkills} reverse />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
