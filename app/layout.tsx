import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import CommandPalette from "@/components/CommandPalette";
import MotionProvider from "@/components/motion/MotionProvider";
import { profile } from "@/lib/data";

/* Display face with real character for names and headings */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

/* Reading face */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

/* Mono appears only where the content is code: harness logs and test names */
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const description =
  "Software engineer at Ethara AI building long-horizon benchmarks for AI coding agents, " +
  "plus full-stack product work in Next.js and Node.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  keywords: [
    "Tushar Gautam",
    "software engineer",
    "AI agent benchmarking",
    "LLM evaluation",
    "Next.js",
    "TypeScript",
    "Python",
    "full-stack developer",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    url: profile.siteUrl,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — ${profile.title}`,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@coderxtushar",
    title: `${profile.name} — ${profile.title}`,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#07060d",
};

/* Person schema so search engines resolve the identity rather than guessing */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  url: profile.siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gurgaon",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  worksFor: { "@type": "Organization", name: profile.company },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Invertis University" },
  sameAs: [
    "https://github.com/coderxtushar",
    "https://linkedin.com/in/tushargautam1010",
    "https://twitter.com/coderxtushar",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* The font variables must be declared on <html>: globals.css sets
       --font-sans: var(--font-geist) at :root, and a nested var() resolves
       against the element where it is declared, not where it is used. */
    <html lang="en" className={`${bricolage.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Scroll reveals start hidden in the server HTML. Without JavaScript
            nothing would reveal them, so show everything instead. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans">
        {/* First focusable node on the page — required for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ground"
        >
          Skip to content
        </a>

        <div className="grain" aria-hidden="true" />

        <MotionProvider>{children}</MotionProvider>

        <CommandPalette />
        {/* The insights script is served by Vercel's edge, so mounting it
            elsewhere only produces a 404 in the console. */}
        {process.env.VERCEL ? <Analytics /> : null}

        <script
          type="application/ld+json"
          // Static, build-time constant — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
