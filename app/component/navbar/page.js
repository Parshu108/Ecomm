"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useProductcontext } from "@/context/productcontext";

const Navbar = () => {
  const pathname = usePathname();
  const { cart, products } = useProductcontext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const cartCount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (item.qty || 1), 0)
    : 0;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const filteredSearchResults = searchQuery.trim() && Array.isArray(products)
    ? products.filter((p) =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
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

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/60">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-cyan-300 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* SEARCH BAR (DESKTOP) */}
          <div className="hidden lg:block relative w-64 xl:w-80">
            <div className={`relative flex items-center rounded-full bg-slate-900/90 border transition-all duration-200 ${
              searchFocused ? "border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.25)]" : "border-slate-800"
            }`}>
              <FaSearch className="ml-4 text-slate-400 text-sm" />
              <input
                type="text"
                placeholder="Search tech, products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mr-3 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* SEARCH DROPDOWN RESULTS */}
            {searchFocused && filteredSearchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 p-2">
                {filteredSearchResults.map((item) => (
                  <Link
                    key={item._id}
                    href={`/${item._id}`}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors"
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-contain bg-slate-950 p-1"
                        unoptimized
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-xs text-cyan-400 font-semibold">₹{item.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ACTIONS (CART & LOGIN) */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-11 h-11 rounded-full bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-200"
              aria-label="View Cart"
            >
              <FaShoppingCart className="text-lg" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-[11px] rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            <Link
              href="/login"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-200"
              aria-label="User Account"
            >
              <FaUser className="text-base" />
            </Link>

            {/* MOBILE MENU TOGGLE BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-cyan-400"
            >
              {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl px-4 py-5 space-y-4"
          >
            <div className="relative w-full">
              <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-sm" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                      : "text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
