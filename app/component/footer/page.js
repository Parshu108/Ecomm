// components/Footer.jsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <motion.footer
      className="bg-[#001B38] text-[#A0A0A0]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-lg ">
                {/* Replace with your actual logo image */}
                <Image
                  src="/logo.svg"
                  alt="Shop0 logo"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <p className="text-xl font-semibold text-white leading-none">
                  Shop0
                </p>
                <p className="text-[10px] tracking-[2px] uppercase text-[#95D7DE] mt-0.5">
                  Premium Store
                </p>
              </div>
            </Link>
            <p className="text-sm text-[#A0A0A0] leading-relaxed">
              Your one-stop destination for premium products. Quality, trust,
              and convenience — delivered to your door.
            </p>
            <div className="flex gap-2">
              {[
                { icon: <FaFacebookF />, label: "Facebook" },
                { icon: <FaInstagram />, label: "Instagram" },
                { icon: <FaXTwitter />, label: "Twitter" },
                { icon: <FaYoutube />, label: "YouTube" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#95D7DE]/20 bg-black text-[#A0A0A0] hover:bg-[#95D7DE] hover:text-black hover:border-[#95D7DE] transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="mb-4 text-lg font-semibold uppercase tracking-widest text-white">
              Company
            </p>
            <ul className="space-y-3">
              {[
                "About us",
                "Terms & conditions",
                "Privacy policy",
                "Careers",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-md text-[#A0A0A0] hover:text-[#95D7DE] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <p className="mb-4 text-lg font-semibold uppercase tracking-widest text-white">
              Shop
            </p>
            <ul className="space-y-3">
              {[
                "Flash sale",
                "Best products",
                "New arrivals",
                "Track order",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-md text-[#A0A0A0] hover:text-[#95D7DE] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="mb-4 text-lg font-semibold uppercase tracking-widest text-white">
              Support
            </p>
            <ul className="space-y-3">
              {["Help center", "FAQ", "Live chat", "Become a seller"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-md text-[#A0A0A0] hover:text-[#95D7DE] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#95D7DE]/10 pt-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-[#A0A0A0]">
            © 2025 ShopNest. All rights reserved.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-[#A0A0A0]">We accept</span>
            {["Visa", "Mastercard", "Razorpay", "UPI", "PayPal"].map((p) => (
              <span
                key={p}
                className="rounded border border-[#95D7DE]/20 bg-black px-2.5 py-1 text-[11px] font-medium text-[#A0A0A0]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
