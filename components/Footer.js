"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-bold text-cyan-400 text-xl tracking-tighter">S0</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  Shop<span className="text-cyan-400">0</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">Next Generation</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your ultimate destination for high-tech electronics, gear, and lifestyle products. Designed for speed, security, and quality.
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:bg-cyan-500 hover:text-black hover:border-cyan-400 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Company
            </p>
            <ul className="space-y-2.5">
              {[
                { name: "About us", href: "/about" },
                { name: "Shop Catalog", href: "/shop" },
                { name: "Blog Posts", href: "/blog" },
                { name: "Contact Support", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Shop Categories
            </p>
            <ul className="space-y-2.5">
              {[
                "Audio & Headphones",
                "Wearables & Smartwatches",
                "Laptops & Computers",
                "Gaming Accessories",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/shop"
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Security */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Customer Support
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Need assistance with an order or product recommendation? We are here 24/7.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 hover:border-cyan-500 hover:bg-slate-800 transition-all"
            >
              Contact Support →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-slate-800/80 pt-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-500">
            © 2026 Shop0. All rights reserved. Built with Next.js & React 19.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 mr-2">Secured Payments:</span>
            {["Razorpay", "Visa", "Mastercard", "UPI", "PayPal"].map((p) => (
              <span
                key={p}
                className="rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-slate-400"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
