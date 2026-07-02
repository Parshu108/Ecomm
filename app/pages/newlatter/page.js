"use client";

import Link from "next/link";
import { useState } from "react";

const BENEFITS = [
  { icon: "⚡", text: "Early access to flash sales" },
  { icon: "🎁", text: "Exclusive subscriber deals" },
  { icon: "📦", text: "New arrivals, first" },
];

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      // await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email: trimmed }) });
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }
  };

  return (
    <section className="relative bg-black py-24 px-6 border-t border-[#0A2647] overflow-hidden">
      {/* Ambient glow — signature touch echoing the product-card "power on" glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#95D7DE]/[0.06] blur-[100px] rounded-full" />

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] bg-[#001B38] border border-[#0A2647] text-[#95D7DE] text-xs font-medium tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#95D7DE] animate-pulse" />
          Newsletter
        </span>

        {/* Headline */}
        <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-[#EAF6F8] leading-tight mb-4 tracking-tight">
          Deals straight to <span className="text-[#95D7DE]">your inbox.</span>
        </h2>

        {/* Subheading */}
        <p className="text-[#5C7285] text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
          Join 40,000+ shoppers getting the best tech deals weekly. No spam —
          unsubscribe any time.
        </p>

        {/* Benefits row */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {BENEFITS.map(({ icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-2 bg-[#001B38] border border-[#0A2647] text-[#A9C4D4] text-sm px-4 py-2 rounded-full"
            >
              <span>{icon}</span>
              {text}
            </span>
          ))}
        </div>

        {/* Form */}
        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="w-14 h-14 rounded-full bg-[#95D7DE]/10 border border-[#95D7DE]/40 flex items-center justify-center text-2xl text-[#95D7DE]">
              ✓
            </div>
            <p className="text-[#EAF6F8] font-semibold text-lg">You're in!</p>
            <p className="text-[#5C7285] text-sm">
              Check your inbox for a welcome email.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 text-xs text-[#5C7285] hover:text-[#95D7DE] underline underline-offset-2 transition-colors"
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="you@example.com"
                aria-label="Email address"
                aria-describedby={status === "error" ? "nl-error" : undefined}
                disabled={status === "loading"}
                className={`w-full bg-[#001B38] border text-[#EAF6F8] text-sm placeholder-[#5C7285] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 transition-colors disabled:opacity-50
                  ${
                    status === "error"
                      ? "border-red-400 focus:ring-red-400/30"
                      : "border-[#0A2647] focus:ring-[#95D7DE]/40 focus:border-[#95D7DE]"
                  }`}
              />
              {status === "error" && (
                <p
                  id="nl-error"
                  className="absolute -bottom-5 left-0 text-xs text-red-400"
                >
                  {errorMsg}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#95D7DE] hover:bg-[#EAF6F8] active:bg-[#7CC5CD] text-black font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#95D7DE]/50"
            >
              {status === "loading" ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>
        )}

        {/* Privacy note */}
        {status !== "success" && (
          <p className="mt-8 text-xs text-[#5C7285]">
            By subscribing you agree to our{" "}
            <Link
              href="#"
              className="hover:text-[#95D7DE] underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </Link>
            . Unsubscribe at any time.
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
