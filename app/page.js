"use client";

import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { useProductcontext } from "../context/productcontext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import NewsletterSection from "./pages/newlatter/page";
import { ToastContainer, Bounce } from "react-toastify";
import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaUndo,
  FaStar,
  FaShoppingCart,
  FaArrowRight,
} from "react-icons/fa";

export default function Home() {
  const { addTocart, getCartdata } = useProductcontext();
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch("/api/electroproduct");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        const normalizedProducts = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : [];
        setProducts(normalizedProducts);
      } catch (error) {
        console.log("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, []);

  const categories = ["All", "Wearables", "Laptop", "Accessories"];

  const displayedProducts =
    filteredCategory === "All"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === filteredCategory.toLowerCase(),
        );

  return (
    <div className="bg-[#07090e] min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-black">
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

      {/* HERO CAROUSEL SECTION */}
      <section className="relative overflow-hidden border-b border-slate-800/80">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full relative"
        >
          <CarouselContent>
            {/* SLIDE 1 */}
            <CarouselItem>
              <div className="relative h-[480px] sm:h-[580px] lg:h-[650px] w-full flex items-center bg-slate-950">
                <Image
                  src="/banner.png"
                  alt="Hero Tech Showcase 1"
                  fill
                  priority
                  unoptimized
                  className="object-cover object-right opacity-40 lg:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/80 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-6 w-full z-10">
                  <div className="max-w-2xl space-y-6">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      ⚡ Seasonal Special · 2026 Edition
                    </span>

                    <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                      Next-Gen Audio & <br />
                      <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-500 bg-clip-text text-transparent">
                        Premium Tech Gear
                      </span>
                    </h1>

                    <p className="text-slate-300 text-base sm:text-lg max-w-lg leading-relaxed">
                      Experience studio-grade acoustics and high-performance
                      smart devices with exclusive seasonal discounts up to 40%
                      off.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                      >
                        Explore Collection <FaArrowRight className="text-xs" />
                      </Link>
                      <Link
                        href="/about"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 border border-slate-700 text-white font-semibold text-sm hover:bg-slate-800 transition-all duration-200"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* SLIDE 2 */}
            <CarouselItem>
              <div className="relative h-[480px] sm:h-[580px] lg:h-[650px] w-full flex items-center bg-slate-950">
                <Image
                  src="/banner3.png"
                  alt="Hero Tech Showcase 2"
                  fill
                  unoptimized
                  className="object-cover object-right opacity-40 lg:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/80 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-6 w-full z-10">
                  <div className="max-w-2xl space-y-6">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                      🔥 Top Rated Electronics
                    </span>

                    <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                      Elevate Your <br />
                      <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                        Digital Lifestyle
                      </span>
                    </h1>

                    <p className="text-slate-300 text-base sm:text-lg max-w-lg leading-relaxed">
                      Discover lightweight wearables, wireless gaming gear, and
                      ultra-durable accessories engineered for perfection.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                      >
                        Shop New Arrivals <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="left-6 bg-slate-900/80 border-slate-700 text-white hover:bg-cyan-500 hover:text-black" />
            <CarouselNext className="right-6 bg-slate-900/80 border-slate-700 text-white hover:bg-cyan-500 hover:text-black" />
          </div>
        </Carousel>
      </section>

      {/* TRUST BADGES BAR */}
      <section className="border-b border-slate-800/80 bg-slate-950/60 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: <FaTruck className="text-cyan-400 text-xl" />,
              title: "Free Express Shipping",
              desc: "On all orders above ₹999",
            },
            {
              icon: <FaUndo className="text-cyan-400 text-xl" />,
              title: "7-Day Easy Returns",
              desc: "Hassle-free replacement guarantee",
            },
            {
              icon: <FaShieldAlt className="text-cyan-400 text-xl" />,
              title: "100% Secure Checkout",
              desc: "Encrypted Razorpay payments",
            },
            {
              icon: <FaHeadset className="text-cyan-400 text-xl" />,
              title: "24/7 Dedicated Support",
              desc: "Expert technical assistance",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60"
            >
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED CATALOG SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              Curated Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Featured Products
            </h2>
          </div>

          {/* CATEGORY FILTER PILLS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilteredCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  filteredCategory === cat
                    ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-96 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800"
              />
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800">
            <p className="text-lg text-slate-400 font-medium">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((item) => {
              const originalPrice = item.price + 1200;
              return (
                <div
                  key={item._id}
                  className="group relative rounded-2xl bg-slate-900/70 border border-slate-800/80 p-5 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.25)] flex flex-col justify-between"
                >
                  <div>
                    {/* PRODUCT IMAGE WRAPPER */}
                    <div className="relative w-full h-[240px] bg-slate-950 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-4">
                      <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-cyan-500 text-black shadow-md">
                        Hot
                      </span>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    </div>

                    {/* PRODUCT INFO */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-amber-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                        <span className="text-slate-400 ml-1.5 text-xs font-mono">
                          (4.8)
                        </span>
                      </div>

                      <Link href={`/${item._id}`}>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                          {item.name}
                        </h3>
                      </Link>

                      <div className="flex items-baseline gap-3 pt-1">
                        <span className="text-2xl font-extrabold text-cyan-400 font-mono">
                          ₹{item.price}
                        </span>
                        <span className="text-sm text-slate-500 line-through font-mono">
                          ₹{originalPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ADD TO CART BUTTON */}
                  <button
                    onClick={() => {
                      addTocart(item.name, item.image, item.price);
                      getCartdata();
                    }}
                    className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-black text-slate-200 py-3 text-sm font-bold transition-all duration-200 border border-slate-700 hover:border-cyan-400"
                  >
                    <FaShoppingCart className="text-sm" /> Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* NEWSLETTER SECTION */}
      <NewsletterSection />
    </div>
  );
}
