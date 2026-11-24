import About from "@/components/About";
import Board from "@/components/Board";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import GitHub from "@/components/GitHub";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Ribbon from "@/components/Ribbon";
import SignalBus from "@/components/SignalBus";
import Skills from "@/components/Skills";

/* GitHub data is fetched on the server; refresh the page once a day */
export const revalidate = 86400;

export default function HomePage() {
  return (
    <Board>
      <SignalBus />
      <Hero />
      <Ribbon />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <GitHub />
      <Contact />
    </Board>
  );
}
