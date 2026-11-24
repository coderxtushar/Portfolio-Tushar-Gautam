import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

/**
 * Page frame shared by every route: the ultraviolet ground with its dot field,
 * the floating nav, and the footer.
 */
export default function Board({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-[100dvh] overflow-x-clip bg-ground">
      <div aria-hidden="true" className="dot-field pointer-events-none absolute inset-x-0 top-0 -z-10 h-[140vh]" />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
