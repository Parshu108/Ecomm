"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProductcontext } from "../../context/productcontext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Bounce } from "react-toastify";

const CATEGORIES = [
  { label: "All", value: "All" },
  { label: "Mobiles", value: "mobile" },
  { label: "Headphone", value: "headphone" },
  { label: "Watch", value: "watch" },
  { label: "Gaming", value: "remote" },
];

const PRICE_TIERS = [1000, 10000, 40000];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [input, setInput] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePrice, setActivePrice] = useState(null);

  const { addTocart, getCartdata } = useProductcontext();

  useEffect(() => {
    async function getPost() {
      try {
        const res = await fetch("/api/electroproduct");

        const data = await res.json();

        setProducts(data); // ✅ FIXED
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    getPost();
  }, []);

  const filterbycategory = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFiltered(products);
    } else {
      const data = products.filter((item) => item.category === category);
      setFiltered(data);
    }
  };

  const filterbyprice = (price) => {
    setActivePrice(price);
    const data = products.filter((item) => item.price >= price);
    setFiltered(data);
  };

  const filterbyname = (value) => {
    const data = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFiltered(data);
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-center text-[#5C7285] font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <>
      {/*
        Fonts — add once in app/layout.js:
        import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
        const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
        const body = Inter({ subsets: ["latin"], variable: "--font-body" });
        const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
      */}

      <div className="w-full bg-[#001B38] py-3 px-4 border-b border-[#0A2647]">
        {/* Search Bar */}
        <div className="flex flex-1 h-12 max-w-xl rounded-lg overflow-hidden border border-[#0A2647]">
          <input
            type="text"
            placeholder="Search here"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              filterbyname(e.target.value);
            }}
            className="flex-1 px-4 text-sm text-[#EAF6F8] placeholder-[#5C7285] bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#95D7DE]"
          />

          <button
            className="bg-[#95D7DE] hover:bg-[#EAF6F8] active:bg-[#7CC5CD] w-12 flex items-center justify-center transition-colors duration-150"
            aria-label="Search"
            onClick={() => filterbyname(input)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.34-4.34" />
            </svg>
          </button>
        </div>
      </div>

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
      <div className="min-h-screen bg-black px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.25em] uppercase text-[#5C7285]">
            Full Catalog
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[#EAF6F8] mt-2">
            Product Store
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-2">
          <div className="bg-[#001B38] text-[#EAF6F8] rounded-2xl border border-[#0A2647] my-6 p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CATEGORY FILTER */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#5C7285]">
                  Category
                </span>

                {CATEGORIES.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => filterbycategory(value)}
                    className={`px-4 py-2 text-sm rounded-full border transition ${
                      activeCategory === value
                        ? "bg-[#95D7DE] text-black border-[#95D7DE] font-medium"
                        : "border-[#0A2647] text-[#A9C4D4] hover:border-[#95D7DE] hover:text-[#95D7DE]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* PRICE FILTER */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[#5C7285]">
                  Price
                </span>

                {PRICE_TIERS.map((price) => (
                  <button
                    key={price}
                    onClick={() => filterbyprice(price)}
                    className={`px-4 py-2 text-sm rounded-full border font-[family-name:var(--font-mono)] transition ${
                      activePrice === price
                        ? "bg-[#95D7DE] text-black border-[#95D7DE] font-medium"
                        : "border-[#0A2647] text-[#95D7DE] hover:bg-[#95D7DE] hover:text-black"
                    }`}
                  >
                    ≥ ₹{price.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(filtered) &&
            filtered.map((product) => (
              <div
                key={product._id}
                className="group bg-[#001B38] rounded-2xl p-4 border border-[#0A2647] transition-all duration-300 hover:border-[#95D7DE] hover:shadow-[0_0_24px_-4px_rgba(149,215,222,0.35)] flex flex-col"
              >
                {/* IMAGE */}
                <div className="bg-black rounded-lg p-4 flex justify-center items-center h-[200px] overflow-hidden">
                  <Image
                    src={product.image || "/fallback.png"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.05]"
                    unoptimized
                    loading="eager"
                  />
                </div>

                {/* CONTENT */}
                <div className="mt-4 flex flex-col flex-grow">
                  {/* TITLE */}
                  <h2 className="text-sm font-semibold text-[#EAF6F8] line-clamp-2 hover:text-[#95D7DE] cursor-pointer transition-colors">
                    {product.name}
                  </h2>

                  {/* RATING */}
                  <div className="flex items-center mt-1 text-sm">
                    <span className="text-[#95D7DE]">⭐⭐⭐⭐☆</span>
                    <span className="text-[#5C7285] ml-2">(120)</span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-[#5C7285] text-xs mt-2 line-clamp-2">
                    {product.description?.substring(0, 80)}...
                  </p>

                  {/* PRICE */}
                  <div className="mt-3 font-[family-name:var(--font-mono)]">
                    <span className="text-lg font-bold text-[#95D7DE]">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-[#5C7285] line-through ml-2">
                      ₹{(product.price * 1.2).toFixed(0)}
                    </span>
                  </div>

                  {/* BUTTON */}
                  <button
                    className="mt-auto bg-[#95D7DE] hover:bg-[#EAF6F8] text-black text-sm font-medium py-2 rounded-md mt-4 transition"
                    onClick={() => {
                      (addTocart(product.name, product.image, product.price),
                        getCartdata());
                    }}
                  >
                    Add to Cart
                  </button>

                  <Link
                    href={`/${product._id}`}
                    className="w-full text-center border border-[#0A2647] py-2 mt-2 rounded-lg text-sm text-[#A9C4D4] hover:border-[#95D7DE] hover:text-[#95D7DE] transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
