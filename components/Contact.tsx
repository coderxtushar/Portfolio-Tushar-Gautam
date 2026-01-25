import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-8 sm:py-12 md:py-20 bg-neutral-950 border-t border-neutral-800 px-4 sm:px-6"
    >
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8 md:mb-10">
          <div className="w-1 h-12 bg-linear-to-b from-indigo-500 to-violet-500 rounded-full"></div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            Let's talk
          </h2>
        </div>

        <p className="mt-3 sm:mt-4 text-neutral-400 text-sm sm:text-base md:text-lg">
          Have a project in mind, a question, or just want to say hi?
          Drop a message and I’ll get back to you.
        </p>

        {/* Contact Form */}
        <form className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
          {/* Name */}
          <div>
            <label className="block text-xs sm:text-sm text-neutral-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              placeholder="XYZ Kumar"
              className="w-full rounded-lg sm:rounded-xl bg-neutral-900 border border-neutral-800 px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs sm:text-sm text-neutral-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="XYZ@example.com"
              className="w-full rounded-lg sm:rounded-xl bg-neutral-900 border border-neutral-800 px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs sm:text-sm text-neutral-300 mb-2">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Tell me about your idea..."
              className="w-full rounded-lg sm:rounded-xl bg-neutral-900 border border-neutral-800 px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
            <button
              type="submit"
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white text-black text-sm sm:text-base font-medium hover:bg-neutral-200 transition"
            >
              Send Message
            </button>

            <a
              href="tushar.gautam.dev@email.com"
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-neutral-700 text-neutral-300 text-sm sm:text-base hover:border-neutral-500 hover:text-white transition text-center"
            >
              Email Directly
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
