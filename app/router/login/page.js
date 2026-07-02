"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert(res?.error || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="bg-white rounded-2xl shadow-2xl border-1 overflow-hidden">
          {/* Header */}
          <div className=" border-b-2 px-8 py-8">
            <h1 className="text-3xl font-bold text-slate-900 text-center">
              Welcome Back
            </h1>
            <p className="text-slate-900 text-center mt-2">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form className="px-8 py-8 space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-black">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-black">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg"
            >
              Sign In
            </button>

            {/* Register */}
            <Link
              href="/router/register"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg text-center block"
            >
              Create Account
            </Link>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
