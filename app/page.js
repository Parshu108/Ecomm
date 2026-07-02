"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CiMobile3 } from "react-icons/ci";
import { BsLaptop } from "react-icons/bs";
import { SlEarphones } from "react-icons/sl";
import { LuProjector } from "react-icons/lu";
import { IoWatchOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";
import { MdLaptopMac } from "react-icons/md";
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
      <div>
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
              <Image
                src="/banner.png"
                alt="Banner1"
                width={1920}
                height={765}
                className="w-full h-auto object-cover"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src="/banner.png"
                alt="Banner2"
                width={1920}
                height={765}
                className="w-full h-auto object-cover"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src="/banner3.png"
                alt="Banner3"
                width={1920}
                height={765}
                className="w-full h-auto object-cover"
              />
            </CarouselItem>
          </CarouselContent>

          <div className="absolute inset-0 flex items-center ml-20">
            <div className="pointer-events-auto text-center px-6 py-4 bg-transparent rounded-2xl shadow-xl">
              <h2 className="text-3xl font-bold text-yellow-300 sm:text-4xl">
                Discover New Arrivals
              </h2>
              <p className="mt-2 text-sm text-slate-800 sm:text-base">
                Shop latest trends with exclusive offers in our seasonal
                collection.
              </p>
              <button className="mt-5 inline-flex items-center rounded-full bg-yellow-400 px-8 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-500 active:scale-95">
                Shop Now
              </button>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Categories Section - unchanged */}
      <div className="flex flex-col items-center justify-center py-10 bg-gray-50">
        {/* ... same as before ... */}
      </div>

      {/* ✅ Fixed Products Section */}
      <section className="w-full bg-[#f5f5f5] py-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold text-[#111]">New Arrivals</h2>
            <button className="flex items-center gap-2 text-lg font-medium hover:text-yellow-500 transition">
              View More →
            </button>
          </div>

          {products.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((item) => (
                <div
                  key={item._id} // ✅ Error 1 Fix
                  className="group bg-white p-6 relative overflow-hidden transition-all duration-500"
                >
                  <div className="relative w-full h-[320px] bg-[#fafafa] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  <div className="pt-6 text-center">
                    <h3 className="text-2xl font-semibold text-[#222]">
                      {item.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-center gap-3">
                      <span className="text-red-500 text-2xl font-bold">
                        ₹{item.price} {/* ✅ Error 2 Fix */}
                      </span>
                      <span className="text-gray-400 line-through text-xl">
                        ₹{item.price + 1000}
                      </span>
                    </div>
                  </div>
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
