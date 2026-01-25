import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { BsDiscord, BsWhatsapp } from "react-icons/bs";



export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 py-8 sm:py-10 px-4 sm:px-6 flex justify-center gap-4 sm:gap-6">
      <a
        href="https://github.com/coderxtushar"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 sm:p-3 rounded-lg bg-linear-to-br from-slate-700/50 to-slate-900/50 hover:shadow-lg hover:shadow-slate-500/30 transition"
        aria-label="GitHub"
      >
        <Github size={20} className="sm:size-6 text-slate-300 hover:text-slate-100" />
      </a>
      <a
        href="https://linkedin.com/in/tushargautam1010"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 sm:p-3 rounded-lg bg-linear-to-br from-blue-700/50 to-blue-900/50 hover:shadow-lg hover:shadow-blue-500/30 transition"
        aria-label="LinkedIn"
      >
        <Linkedin size={20} className="sm:size-6 text-blue-300 hover:text-blue-100" />
      </a>
      <a
        href="https://twitter.com/coderxtushar"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 sm:p-3 rounded-lg bg-linear-to-br from-sky-700/50 to-sky-900/50 hover:shadow-lg hover:shadow-sky-500/30 transition"
        aria-label="Twitter"
      >
        <Twitter size={20} className="sm:size-6 text-sky-300 hover:text-sky-100" />
      </a>
      <a
        href="https://instagram.com/_tushar_gautam__"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 sm:p-3 rounded-lg bg-linear-to-br from-pink-700/50 to-pink-900/50 hover:shadow-lg hover:shadow-pink-500/30 transition"
        aria-label="Instagram"
      >
        <Instagram size={20} className="sm:size-6 text-pink-300 hover:text-pink-100" />
      </a>
      <a
        href="https://discordapp.com/users/1014353403738079242"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 sm:p-3 rounded-lg bg-linear-to-br from-indigo-700/50 to-indigo-900/50 hover:shadow-lg hover:shadow-indigo-500/30 transition"
        aria-label="Discord"
      >
        <BsDiscord size={20} className="sm:size-6 text-indigo-300 hover:text-indigo-100" />
    </a>
      <a
        href="https://wa.me/+916398505993"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 sm:p-3 rounded-lg bg-linear-to-br from-green-700/50 to-green-900/50 hover:shadow-lg hover:shadow-green-500/30 transition"
        aria-label="WhatsApp"
      >
        <BsWhatsapp size={20} className="sm:size-6 text-green-300 hover:text-green-100" />
    </a>
    </footer>
  );
}
