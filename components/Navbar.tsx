"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const sections = ["home", "about", "works", "resume", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isResumePage = pathname === "/resume";

  useEffect(() => {
    if (isResumePage) {
      setActive("resume");
      return;
    }

    const handler = () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(id);
        }
      });
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [isResumePage]);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const getNavLink = (section: string) => {
    if (isResumePage) {
      if (section === "resume") return "/resume";
      return `/#${section}`;
    }
    if (section === "resume") return "/resume";
    return `#${section}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] bg-opacity-95 backdrop-blur-sm border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500 font-bold text-lg sm:text-xl hover:opacity-80 transition">
          Tushar Gautam
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 text-sm">
          {sections.map((s) => (
            <a
              key={s}
              href={getNavLink(s)}
              className={`transition-all duration-300 border-b-2 pb-1 ${
                active === s
                  ? "text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500 border-purple-500"
                  : "text-neutral-400 border-transparent hover:border-blue-400 hover:text-blue-300"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-[#0a0a0a]">
          <div className="px-4 py-4 space-y-3">
            {sections.map((s) => (
              <a
                key={s}
                href={getNavLink(s)}
                onClick={handleNavClick}
                className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
                  active === s
                    ? "text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500 bg-neutral-800/50"
                    : "text-neutral-400 hover:bg-neutral-800/50 hover:text-blue-300"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}