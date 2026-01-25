import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <section id="resume" className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-8 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Resume
              </h1>
              <p className="mt-2 text-neutral-400 text-sm sm:text-base">
                View or download my resume.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 sm:gap-3">
              <a
                href="/resume/Tushar_Gautam_Resume.pdf"
                download
                className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white text-black text-xs sm:text-sm font-medium hover:bg-neutral-200 transition whitespace-nowrap"
              >
                Download PDF
              </a>

              <a
                href="/resume/Tushar_Gautam_Resume.pdf"
                target="_blank"
                className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-neutral-700 text-neutral-300 text-xs sm:text-sm hover:border-neutral-500 hover:text-white transition whitespace-nowrap"
              >
                Open in New Tab
              </a>

              <a
                href="/"
                className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-neutral-700 text-neutral-300 text-xs sm:text-sm hover:border-neutral-500 hover:text-white transition whitespace-nowrap"
              >
                Back to Home
              </a>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="w-full h-96 sm:h-150 md:h-175 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
            <iframe
              src="/resume/Tushar_Gautam_Resume.pdf"
              className="w-full h-full"
              title="Resume Preview"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
