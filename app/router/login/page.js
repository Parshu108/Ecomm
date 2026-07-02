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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="bg-[#001B38] rounded-2xl shadow-2xl border border-[#95D7DE]/10 overflow-hidden">
          {/* Header */}
          <div className="border-b border-[#95D7DE]/10 px-8 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Welcome Back
            </h1>
            <p className="text-[#A0A0A0] text-center mt-2">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form className="px-8 py-8 space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-[#95D7DE]/20 rounded-lg text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#95D7DE] focus:border-[#95D7DE]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-[#95D7DE]/20 rounded-lg text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#95D7DE] focus:border-[#95D7DE]"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#95D7DE] hover:bg-[#7FC5CD] text-black font-bold py-3 rounded-lg transition-colors"
            >
              Sign In
            </button>

            {/* Register */}
            <Link
              href="/router/register"
              className="w-full border border-[#95D7DE]/30 text-[#95D7DE] hover:bg-black font-bold py-3 rounded-lg text-center block transition-colors"
            >
              Create Account
            </Link>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
