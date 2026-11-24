"use client";

import { useState } from "react";
import { PiWarningCircleBold } from "react-icons/pi";
import Button from "./ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD =
  "w-full rounded-pad border border-ink-3/75 bg-ground px-3.5 py-3 text-body text-ink " +
  "placeholder:text-ink-3 transition-colors duration-150 hover:border-violet-edge focus:border-lime " +
  "disabled:opacity-60";

const LABEL = "legend block text-ink-2";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/xvzrvvkp", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      /* The original version ignored the response entirely, so a rejected
         submission was indistinguishable from a successful one. */
      if (!response.ok) {
        throw new Error(`Form service returned ${response.status}`);
      }

      form.reset();
      setStatus("success");
    } catch (cause) {
      setStatus("error");
      setError(
        cause instanceof TypeError
          ? "Could not reach the network. Check your connection and try again."
          : "Something went wrong sending that. Email me directly instead.",
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-4 rounded-ic border border-line-strong bg-raise-1 p-6"
      >
        <span className="led mt-2 shrink-0" data-state="pass" aria-hidden="true" />
        <div>
          <p className="semi-expanded text-h3 font-bold text-ink">Message sent</p>
          <p className="mt-1.5 text-sm text-ink-2">
            I&apos;ll get back to you at the address you provided.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="ink-link mt-4 text-sm"
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="_subject" value="New portfolio enquiry" />

      {/* Honeypot — bots fill it, humans never see it */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label htmlFor="contact-name" className={LABEL}>
          Name <span className="text-ink-3">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          disabled={submitting}
          className={`mt-2 ${FIELD}`}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={LABEL}>
          Email <span className="text-ink-3">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={submitting}
          className={`mt-2 ${FIELD}`}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={LABEL}>
          Message <span className="text-ink-3">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="What are you working on?"
          disabled={submitting}
          className={`mt-2 resize-y ${FIELD}`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" variant="lime" loading={submitting}>
          {submitting ? "Sending" : "Send message"}
        </Button>

        {status === "error" ? (
          <p role="alert" className="flex items-start gap-2 text-sm text-fail">
            <PiWarningCircleBold className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
