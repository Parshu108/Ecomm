"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import NewsletterSection from "./pages/newlatter/page";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch("/api/electroproduct");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    getPost();
  }, []);

  return (
    <>
      {/*
        Fonts — add once in app/layout.js:
        import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
        const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
        const body = Inter({ subsets: ["latin"], variable: "--font-body" });
        const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
        <body className={`${display.variable} ${body.variable} ${mono.variable} font-[var(--font-body)]`}>
      */}

      <div className="bg-black">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
          className="relative"
        >
          <CarouselPrevious />
          <CarouselContent>
            <CarouselItem>
              <div className="relative">
                <Image
                  src="/banner.png"
                  alt="Banner1"
                  width={1920}
                  height={765}
                  unoptimized
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative">
                <Image
                  src="/banner.png"
                  alt="Banner2"
                  width={1920}
                  height={765}
                  unoptimized
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative">
                <Image
                  src="/banner3.png"
                  alt="Banner3"
                  width={1920}
                  height={765}
                  unoptimized
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              </div>
            </CarouselItem>
          </CarouselContent>

          <div className="absolute inset-0 flex items-center ml-6 sm:ml-20">
            <div className="pointer-events-auto max-w-lg px-2">
              <span className="inline-block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.25em] uppercase text-[#95D7DE] mb-4 border border-[#95D7DE]/30 px-3 py-1 rounded-full">
                New Season · 2026
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl font-bold text-[#EAF6F8] leading-[1.05] tracking-tight">
                Discover New
                <br />
                Arrivals
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#5C7285] max-w-sm">
                Shop the latest tech with exclusive offers in our seasonal
                collection.
              </p>
              <button className="mt-7 group relative inline-flex items-center gap-2 rounded-full bg-[#95D7DE] pl-6 pr-2 py-2 text-sm font-semibold text-black transition hover:bg-[#EAF6F8] active:scale-95">
                Shop Now
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black text-[#95D7DE] transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Categories Section */}
      <div className="flex flex-col items-center justify-center py-10 bg-black">
        {/* ... same as before ... */}
      </div>

      {/* Products Section */}
      <section className="w-full bg-black py-20 border-t border-[#0A2647]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.25em] uppercase text-[#5C7285]">
                Catalog
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[#EAF6F8] mt-2">
                New Arrivals
              </h2>
            </div>
            <button className="flex items-center gap-2 text-sm font-medium text-[#5C7285] hover:text-[#95D7DE] transition">
              View All
              <span aria-hidden>→</span>
            </button>
          </div>

          {products.length === 0 ? (
            <p className="text-center text-[#5C7285] text-lg py-16 border border-dashed border-[#0A2647] rounded-xl">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="group relative bg-[#001B38] rounded-2xl p-5 border border-[#0A2647] transition-all duration-300 hover:border-[#95D7DE] hover:shadow-[0_0_24px_-4px_rgba(149,215,222,0.35)]"
                >
                  <div className="relative w-full h-[280px] bg-black rounded-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
                      unoptimized
                    />
                  </div>

                  <div className="pt-5">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#EAF6F8] truncate">
                      {item.name}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-3 font-[family-name:var(--font-mono)]">
                      <span className="text-[#95D7DE] text-xl font-bold">
                        ₹{item.price}
                      </span>
                      <span className="text-[#5C7285] line-through text-sm">
                        ₹{item.price + 1000}
                      </span>
                    </div>
                  </div>

                  <button className="mt-4 w-full rounded-lg border border-[#0A2647] py-2.5 text-sm font-medium text-[#5C7285] transition-colors group-hover:border-[#95D7DE] group-hover:text-[#95D7DE]">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </>
  );
}
