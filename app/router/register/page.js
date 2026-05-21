"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

const Page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    alert("User Registered!");
    window.location.href = "/router/login";

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="min-h-80  bg-white  flex items-center  justify-center px-4 py-8">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Card Container */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl border overflow-hidden"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Header */}
          <div className="bg-transprant px-4 py-4">
            <motion.h1
              className="text-3xl font-bold text-yellow-400 text-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Create Account
            </motion.h1>
            <motion.p
              className="text-slate-300 text-center mt-1"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Join our community today
            </motion.p>
          </div>
          <hr/>

          {/* Form Section */}
          <motion.form
            className="px-4 py-4 space-y-5"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* First Name Field */}
            <motion.div
              className="space-y-2"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-black"
              >
                Name
              </label>
              <motion.input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-yellow-500/40 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all text-black placeholder-slate-400"
                initial={{ borderColor: "#cbd5e1" }}
                whileFocus={{
                  borderColor: "#fbbf24",
                  boxShadow: "0 0 0 3px rgba(251, 191, 36, 0.1)",
                }}
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              className="space-y-2"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-black"
              >
                Email Address
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-yellow-500/40 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all text-black placeholder-slate-400"
                initial={{ borderColor: "#cbd5e1" }}
                whileFocus={{
                  borderColor: "#fbbf24",
                  boxShadow: "0 0 0 3px rgba(251, 191, 36, 0.1)",
                }}
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              className="space-y-2"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-black"
              >
                Password
              </label>
              <motion.input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-yellow-500/40 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all text-black placeholder-slate-400"
                initial={{ borderColor: "#cbd5e1" }}
                whileFocus={{
                  borderColor: "#fbbf24",
                  boxShadow: "0 0 0 3px rgba(251, 191, 36, 0.1)",
                }}
              />
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div
              className="space-y-2"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-black"
              >
                Confirm Password
              </label>
              <motion.input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-yellow-500/40 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all text-black placeholder-slate-400"
                initial={{ borderColor: "#cbd5e1" }}
                whileFocus={{
                  borderColor: "#fbbf24",
                  boxShadow: "0 0 0 3px rgba(251, 191, 36, 0.1)",
                }}
              />
            </motion.div>

            {/* Terms Checkbox */}
            <motion.div
              className="flex items-center space-x-3"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
            >
              <input
                type="checkbox"
                id="terms"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="w-5 h-5 rounded cursor-pointer accent-yellow-400"
              />
              <label htmlFor="terms" className="text-sm text-slate-700">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-yellow-500 hover:text-yellow-600 font-semibold"
                >
                  Terms & Conditions
                </a>
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!isAgreed}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={
                isAgreed
                  ? {
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(251, 191, 36, 0.3)",
                    }
                  : {}
              }
              whileTap={isAgreed ? { scale: 0.98 } : {}}
            >
              Create Account
            </motion.button>

            {/* Divider */}
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.85 }}
            >
              <div className="flex-1 h-px bg-slate-300"></div>
              <span className="text-sm text-slate-500">
                Already have an account?
              </span>
              <div className="flex-1 h-px bg-slate-300"></div>
            </motion.div>

            {/* Login Link Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Link href="/router/login" className="w-full block">
                <motion.button
                  type="button"
                  className="w-full border-2 border-black text-black font-bold py-3 rounded-lg hover:bg-black hover:text-yellow-400 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
              </Link>
            </motion.div>
          </motion.form>

          {/* Footer */}
          <motion.div
            className="bg-slate-50 px-8 py-6 text-center border-t border-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <p className="text-sm text-slate-600">
              We respect your privacy and security
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
