"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { setAuthToken } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
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

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/users/login", {
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

      if (data.token) {
        setAuthToken(data.token);
      }

      const role = data.user?.role || "user";

      if (role === "admin" || role === "superadmin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (err) {
      setError("Something went wrong, please try again");
      setLoading(false);
    }
  };

  // Shared classnames for the neumorphic "pressed in" fields.
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
        <div
          className="rounded-[2.5rem] p-10 bg-[#001B38]
          shadow-[9px_9px_18px_rgba(0,0,0,0.55),-9px_-9px_18px_rgba(149,215,222,0.04)]"
        >
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
            <p className="mt-2 text-sm text-[#A0A0A0]">
              Log in to your account
            </p>
          </div>

          {error && (
            <div
              className="mb-5 rounded-2xl px-4 py-3 text-sm text-white bg-[#001B38]
              shadow-[inset_5px_5px_10px_rgba(0,0,0,0.55),inset_-5px_-5px_10px_rgba(149,215,222,0.04)]"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium hover:underline text-[#A0A0A0] hover:text-[#95D7DE] transition"
                >
                  Forgot password?
                </Link>
              </div>
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
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl px-4 py-3 text-sm font-semibold text-black
              bg-[#95D7DE] hover:bg-[#7FC5CD]
              shadow-[6px_6px_12px_rgba(0,0,0,0.5),-6px_-6px_12px_rgba(149,215,222,0.03)]
              active:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.55),inset_-5px_-5px_10px_rgba(149,215,222,0.04)]
              disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-[#95D7DE]/30
              disabled:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.55),inset_-5px_-5px_10px_rgba(149,215,222,0.04)]
              transition"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#A0A0A0]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium hover:underline text-[#95D7DE]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
