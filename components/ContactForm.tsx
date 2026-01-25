export default function ContactForm() {
  return (
    <form className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
      {/* Name */}
      <div>
        <label className="block text-xs sm:text-sm bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-2 font-medium">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="XYZ Kumar"
          className="w-full rounded-lg sm:rounded-xl bg-linear-to-br from-indigo-950/30 to-violet-950/30 border border-indigo-500/30 px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs sm:text-sm bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-2 font-medium">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="XYZ@example.com"
          className="w-full rounded-lg sm:rounded-xl bg-linear-to-br from-indigo-950/30 to-violet-950/30 border border-indigo-500/30 px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs sm:text-sm bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-2 font-medium">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Tell me about your idea..."
          className="w-full rounded-lg sm:rounded-xl bg-linear-to-br from-indigo-950/30 to-violet-950/30 border border-indigo-500/30 px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-none transition"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
        <button
          type="submit"
          className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-linear-to-r from-indigo-500 to-violet-600 text-white text-sm sm:text-base font-medium hover:shadow-lg hover:shadow-indigo-500/40 transition"
        >
          Send Message
        </button>

        <a
          href="mailto:tushar.gautam.dev@email.com"
          className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-indigo-500/40 text-indigo-300 text-sm sm:text-base hover:border-indigo-500/70 hover:text-indigo-200 hover:shadow-lg hover:shadow-indigo-500/20 transition text-center"
        >
          Email Directly
        </a>
      </div>
    </form>
  );
}
