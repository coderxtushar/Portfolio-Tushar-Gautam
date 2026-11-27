import { PiGithubLogoBold } from "react-icons/pi";
import { socials } from "@/lib/data";
import Block from "./ui/Block";
import Button from "./ui/Button";
import ProjectStack from "./ProjectStack";

const github = socials.find((social) => social.label === "GitHub");

/**
 * The work: the four main projects as a scroll-driven stack of panels, each
 * with its live site in a browser frame, how it works, its measured figure,
 * and links to the live site, the case study and the code.
 */
export default function Projects() {
  return (
    <Block
      id="work"
      title="Things I've built."
      lead="Four projects, each live. Scroll to watch each one run in its own browser frame, then open the real thing."
    >
      <ProjectStack />

      {github ? (
        <div className="mt-12">
          <Button href={github.href} variant="ghost" icon={PiGithubLogoBold} external>
            More on GitHub
          </Button>
        </div>
      ) : null}
    </Block>
  );
}
