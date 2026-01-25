import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 space-y-32 bg-background text-foreground">
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="works">
          <Projects />
        </section>
        {/* <Experience/> */}
        <section className="py-8 sm:py-10 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Resume Section */}
            <div id="resume">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-6">
                Resume
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-6 sm:mb-8">
                Download or view my complete resume to see my experience, education, and skills in detail.
              </p>
              <Resume />
            </div>

            {/* Contact Section */}
            <div id="contact">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-6">
                Let's talk
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-6 sm:mb-8">
                Have a project in mind, a question, or just want to say hi? Drop a message and I'll get back to you.
              </p>
              <ContactForm />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}