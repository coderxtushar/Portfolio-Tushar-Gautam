"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";


const roles = [
  "Software Developer",
  "Front-End Developer",
  "Backend Developer",
  "Full Stack Engineer",
  "Freelancer"
];


function AnimatedRoles({ roles }: { roles: string[] }) {
const [currentRole, setCurrentRole] = useState(0);
const [displayedText, setDisplayedText] = useState("");
const [isTyping, setIsTyping] = useState(true);
const currentRoleText = roles[currentRole];

useEffect(() => {
let timeout: NodeJS.Timeout;

if (isTyping) {
if (displayedText.length < currentRoleText.length) {
timeout = setTimeout(() => {
setDisplayedText(currentRoleText.slice(0, displayedText.length + 1));
}, 100);
} else {
timeout = setTimeout(() => {
setIsTyping(false);
}, 2000);
}
} else {
if (displayedText.length > 0) {
timeout = setTimeout(() => {
setDisplayedText(displayedText.slice(0, -1));
}, 80);
} else {
setIsTyping(true);
    setCurrentRole((prev) => (prev + 1) % roles.length);
}
}

return () => clearTimeout(timeout);
}, [displayedText, isTyping, currentRoleText, currentRole, roles.length]);

return (
<div className="relative h-8 flex items-center">
<span className="text-red-500 font-semibold text-xl md:text-2xl min-h-8">
{displayedText}
<motion.span
animate={{ opacity: [1, 0] }}
transition={{ duration: 0.6, repeat: Infinity }}
className="inline-block w-1 h-8 bg-red-500 ml-1 align-text-bottom"
/>
</span>
</div>
);
}


export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center pt-24 px-4 sm:px-6 md:pt-0">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-6xl">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
            Hi, I'm Tushar.
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
              I build clean, scalable web products.
            </span>
          </h1>

          <div className="mt-6 text-lg sm:text-xl md:text-2xl h-12 flex items-center justify-center md:justify-start">
            <span className="text-neutral-300">I'm a </span>
            <motion.div className="relative w-64 sm:w-72 md:w-80 ml-2">
              <AnimatedRoles roles={roles} />
            </motion.div>
          </div>

          <p className="mt-6 text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto md:mx-0">
            Software engineer focused on performance, clarity, and solving
            real-world problems with simple systems.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#works" className="px-6 py-3 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/40 transition text-center">
              View Work
            </a>
            <a href="#contact" className="px-6 py-3 rounded-lg border border-indigo-500/40 text-indigo-300 font-medium hover:bg-indigo-500/10 hover:border-indigo-500/70 hover:text-indigo-200 hover:shadow-lg hover:shadow-indigo-500/20 transition text-center">
              Get in Touch
            </a>
          </div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative shrink-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80"
        >
          <motion.div
            className="relative w-full h-full cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"
            />
            <div className="absolute inset-1 bg-neutral-900 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="/profile.jpg"
                alt="Tushar Gautam"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
