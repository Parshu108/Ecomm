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
    <section className="bg-white py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          Newsletter
        </span>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-4">
          Deals straight to <span className="text-yellow-400">your inbox.</span>
        </h2>

        {/* Subheading */}
        <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
          Join 40,000+ shoppers getting the best tech deals weekly. No spam —
          unsubscribe any time.
        </p>

        {/* Benefits row */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {BENEFITS.map(({ icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-600 text-sm px-4 py-2 rounded-full"
            >
              <span>{icon}</span>
              {text}
            </span>
          ))}
        </div>

        {/* Form */}
        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="w-14 h-14 rounded-full bg-yellow-400/10 border border-yellow-400/40 flex items-center justify-center text-2xl text-yellow-500">
              ✓
            </div>
            <p className="text-slate-900 font-semibold text-lg">Youre in!</p>
            <p className="text-slate-500 text-sm">
              Check your inbox for a welcome email.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 text-xs text-slate-400 hover:text-yellow-500 underline underline-offset-2 transition-colors"
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
                className={`w-full bg-white border text-slate-900 text-sm placeholder-slate-400 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 transition-colors disabled:opacity-50
                  ${
                    status === "error"
                      ? "border-red-400 focus:ring-red-400/30"
                      : "border-slate-300 focus:ring-yellow-400/40 focus:border-yellow-400"
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
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-900 font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
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
          <p className="mt-8 text-xs text-slate-400">
            By subscribing you agree to our{" "}
            <Link href="#"
              
              className="hover:text-yellow-500 underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </Link>
             Unsubscribe at any time.
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
