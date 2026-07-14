"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

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

      router.push("/router/login");
    } catch (err) {
      setError("Something went wrong, please try again");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="w-full max-w-md">
        <div
          className="rounded-2xl p-8 shadow-sm"
          style={{
            backgroundColor: "#001B38",
            border: "1px solid rgba(149, 215, 222, 0.15)",
          }}
        >
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold" style={{ color: "#FFFFFF" }}>
              Create your account
            </h1>
            <p className="mt-2 text-sm" style={{ color: "#A0A0A0" }}>
              Sign up to get started
            </p>
          </div>

          {error && (
            <div
              className="mb-5 rounded-lg px-4 py-3 text-sm"
              style={{
                backgroundColor: "#95D7DE" + "1A", // ~10% opacity accent tint
                border: "1px solid #95D7DE",
                color: "#FFFFFF",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#FFFFFF" }}
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-lg px-3.5 py-2.5 text-sm transition outline-none"
                style={{
                  border: "1px solid rgba(149, 215, 222, 0.2)",
                  color: "#FFFFFF",
                  backgroundColor: "#000000",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#95D7DE")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(149, 215, 222, 0.2)")
                }
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#FFFFFF" }}
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg px-3.5 py-2.5 text-sm transition outline-none"
                style={{
                  border: "1px solid rgba(149, 215, 222, 0.2)",
                  color: "#FFFFFF",
                  backgroundColor: "#000000",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#95D7DE")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(149, 215, 222, 0.2)")
                }
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#FFFFFF" }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full rounded-lg px-3.5 py-2.5 text-sm transition outline-none"
                style={{
                  border: "1px solid rgba(149, 215, 222, 0.2)",
                  color: "#FFFFFF",
                  backgroundColor: "#000000",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#95D7DE")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(149, 215, 222, 0.2)")
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                backgroundColor: loading
                  ? "rgba(149, 215, 222, 0.3)"
                  : "#95D7DE",
                color: "#000000",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.backgroundColor = "#7FC5CD";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.backgroundColor = "#95D7DE";
              }}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: "#A0A0A0" }}>
            Already have an account?{" "}
            <Link
              href="/router/login"
              className="font-medium hover:underline"
              style={{ color: "#95D7DE" }}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
