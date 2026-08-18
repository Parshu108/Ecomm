"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push(
        callbackUrl
          ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
          : "/login",
      );
    } catch (err) {
      setError("Something went wrong, please try again");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl pl-11 pr-3.5 py-3 text-sm text-white bg-[#001B38] outline-none " +
    "border border-transparent transition " +
    "shadow-[inset_5px_5px_10px_rgba(0,0,0,0.55),inset_-5px_-5px_10px_rgba(149,215,222,0.04)] " +
    "focus:border-[#95D7DE]";

  const iconWrapClass =
    "absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#95D7DE]/85";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="w-full max-w-md">
        <div className="rounded-[2.5rem] p-10 bg-[#001B38] shadow-[9px_9px_18px_rgba(0,0,0,0.55),-9px_-9px_18px_rgba(149,215,222,0.04)]">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-white">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-[#A0A0A0]">
              Sign up to get started
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl px-4 py-3 text-sm text-white bg-[#001B38] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.55),inset_-5px_-5px_10px_rgba(149,215,222,0.04)]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-white"
              >
                Full name
              </label>
              <div className="relative">
                <span className={iconWrapClass}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                  </svg>
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-white"
              >
                Email address
              </label>
              <div className="relative">
                <span className={iconWrapClass}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-white"
              >
                Password
              </label>
              <div className="relative">
                <span className={iconWrapClass}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="5" y="11" width="14" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl px-4 py-3 text-sm font-semibold text-black bg-[#95D7DE] hover:bg-[#7FC5CD] shadow-[6px_6px_12px_rgba(0,0,0,0.5),-6px_-6px_12px_rgba(149,215,222,0.03)] active:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.55),inset_-5px_-5px_10px_rgba(149,215,222,0.04)] disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-[#95D7DE]/30 disabled:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.55),inset_-5px_-5px_10px_rgba(149,215,222,0.04)] transition"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#A0A0A0]">
            Already have an account?{" "}
            <Link
              href={
                callbackUrl
                  ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
                  : "/login"
              }
              className="font-medium hover:underline text-[#95D7DE]"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}
