import { PiDownloadSimpleBold, PiFilePdfBold } from "react-icons/pi";
import { profile, socials } from "@/lib/data";
import ContactForm from "./ContactForm";
import Block from "./ui/Block";
import Button from "./ui/Button";

/**
 * Contact: the form in a lit card, with direct email, socials and the resume
 * beside it.
 */
export default function Contact() {
  return (
    <Block
      id="contact"
      title="Start a conversation."
      lead="Hiring, collaborating, or comparing notes on agent evaluation: either route below reaches me."
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
        <div className="card p-6 md:p-8">
          <ContactForm />
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="legend text-ink-3">Direct</h3>
            <a
              href={`mailto:${profile.email}`}
              className="ink-link semi-expanded mt-4 inline-block break-all text-h3 font-semibold"
            >
              {profile.email}
            </a>
            <p className="mt-3 text-sm text-ink-3">
              Based in {profile.location}.
            </p>
          </div>

          <div>
            <h3 className="legend text-ink-3">Elsewhere</h3>
            {/* A row of header pins, one per network */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="group grid size-12 place-items-center rounded-full border border-line-strong text-ink-2 transition-colors duration-150 hover:border-violet-edge hover:bg-violet-dim hover:text-ink"
                  >
                    <social.icon className="size-[1.15rem]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="legend text-ink-3">Resume</h3>
            <p className="mt-3 text-sm text-ink-2 text-pretty">
              Full history, education, and certifications on one page.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/resume" variant="ghost" icon={PiFilePdfBold}>
                View
              </Button>
              <Button href={profile.resumePath} variant="ghost" icon={PiDownloadSimpleBold} download>
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Block>
  );
}
