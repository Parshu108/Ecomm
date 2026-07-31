"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProductcontext } from "../../context/productcontext";
import { ToastContainer, Bounce } from "react-toastify";
import { FaSearch, FaStar, FaShoppingCart, FaEye, FaSlidersH } from "react-icons/fa";

const CATEGORIES = [
  { label: "All Products", value: "All" },
  { label: "Mobiles & Phones", value: "mobile" },
  { label: "Headphones & Audio", value: "headphone" },
  { label: "Smartwatches", value: "watch" },
  { label: "Accessories", value: "remote" },
];

const PRICE_TIERS = [
  { label: "All Prices", price: 0 },
  { label: "Under ₹5,000", price: 1000 },
  { label: "₹5,000 - ₹20,000", price: 10000 },
  { label: "Premium (≥ ₹40,000)", price: 40000 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [input, setInput] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePrice, setActivePrice] = useState(0);

  const { addTocart, getCartdata } = useProductcontext();

  useEffect(() => {
    async function getPost() {
      try {
        const res = await fetch("/api/electroproduct");
        // if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    getPost();
  }, []);

  const filterProducts = (category = activeCategory, price = activePrice, searchQuery = input) => {
    let result = [...products];

    if (category && category !== "All") {
      result = result.filter((item) => item.category?.toLowerCase() === category.toLowerCase());
    }

    if (price > 0) {
      result = result.filter((item) => item.price >= price);
    }

    if (searchQuery.trim()) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFiltered(result);
  };

  const handleCategorySelect = (val) => {
    setActiveCategory(val);
    filterProducts(val, activePrice, input);
  };

  const handlePriceSelect = (priceVal) => {
    setActivePrice(priceVal);
    filterProducts(activeCategory, priceVal, input);
  };

  const handleSearchChange = (val) => {
    setInput(val);
    filterProducts(activeCategory, activePrice, val);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-slate-800 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-sm font-mono tracking-widest text-slate-400 uppercase">
            Loading product catalog...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER TITLE */}
        <div className="text-center space-y-2">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            Explore All Tech
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Shop Catalog
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Browse our full range of high-performance electronics, audio devices, and accessories with instant checkout.
          </p>
        </div>

        {/* SEARCH & FILTER BAR PANEL */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-6">
          {/* SEARCH INPUT */}
          <div className="relative w-full max-w-2xl mx-auto">
            <FaSearch className="absolute left-4 top-3.5 text-slate-400 text-base" />
            <input
              type="text"
              placeholder="Search by product name or keyword..."
              value={input}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-800/80">
            {/* CATEGORY SELECTOR */}
            <div className="space-y-2">
              <span className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-slate-400">
                <FaSlidersH className="text-cyan-400" /> Filter by Category
              </span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => handleCategorySelect(value)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeCategory === value
                        ? "bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                        : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE SELECTOR */}
            <div className="space-y-2">
              <span className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-slate-400">
                Price Tier
              </span>
              <div className="flex flex-wrap gap-2">
                {PRICE_TIERS.map(({ label, price }) => (
                  <button
                    key={label}
                    onClick={() => handlePriceSelect(price)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activePrice === price
                        ? "bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                        : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800">
            <p className="text-lg text-slate-400 font-medium">No matching products found.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setActivePrice(0);
                setInput("");
                setFiltered(products);
              }}
              className="mt-4 px-5 py-2 rounded-xl bg-slate-800 text-cyan-400 text-xs font-bold hover:bg-slate-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div
                key={product._id}
                className="group relative rounded-2xl bg-slate-900/70 border border-slate-800/80 p-4 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.25)] flex flex-col justify-between"
              >
                <div>
                  {/* IMAGE */}
                  <div className="relative w-full h-[200px] bg-slate-950 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-3">
                    <Image
                      src={product.image || "/fallback.png"}
                      alt={product.name}
                      fill
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                      <span className="text-slate-400 ml-1 font-mono text-[11px]">(4.9)</span>
                    </div>

                    <Link href={`/${product._id}`}>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {product.description || "High quality tech component with warranty."}
                    </p>

                    <div className="flex items-baseline gap-2 pt-2 font-mono">
                      <span className="text-xl font-extrabold text-cyan-400">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-slate-500 line-through">
                        ₹{Math.round(product.price * 1.3)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-5 space-y-2">
                  <button
                    onClick={() => {
                      addTocart(product.name, product.image, product.price);
                      getCartdata();
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black py-2.5 text-xs font-extrabold transition-all duration-200"
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>

                  <Link
                    href={`/${product._id}`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 text-xs font-semibold transition-all border border-slate-700"
                  >
                    <FaEye /> View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
