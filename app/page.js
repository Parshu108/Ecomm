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

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getPost() {
      try {
        const res = await fetch("/api/electroproduct");

        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

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
                src="/banner1.png"
                alt="Banner 1"
                width={1600}
                height={900}
                className="w-full h-auto object-cover"
              />
            </CarouselItem>

            <CarouselItem>
              <Image
                src="/banner.png"
                alt="Banner 2"
                width={1600}
                height={900}
                className="w-full h-auto object-cover"
              />
            </CarouselItem>

            <CarouselItem>
              <Image
                src="/banner3.png"
                alt="Banner 3"
                width={1600}
                height={900}
                className="w-full h-auto object-cover"
              />
            </CarouselItem>
          </CarouselContent>

          {/* Overlay Content */}
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

      <div className="flex flex-col items-center justify-center py-10 bg-gray-50">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Best Seller</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-6">
          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center cursor-pointer transform hover:-translate-y-1">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4 group-hover:bg-yellow-500 transition">
              <CiMobile3
                className="text-3xl text-gray-600 group-hover:text-white transition duration-300 
                   group-hover:-translate-y-1 group-hover:scale-130"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 group-hover:text-yellow-500 transition">
              Smartphone
            </h2>
          </div>

          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center cursor-pointer transform hover:-translate-y-1">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4 group-hover:bg-yellow-500 transition">
              <BsLaptop
                className="text-3xl text-gray-600 group-hover:text-white transition duration-300 
                   group-hover:-translate-y-1 group-hover:scale-130"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 group-hover:text-yellow-500 transition">
              Laptop
            </h2>
          </div>

          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center cursor-pointer transform hover:-translate-y-1">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4 group-hover:bg-yellow-500 transition">
              <SlEarphones
                className="text-3xl text-gray-600 group-hover:text-white transition duration-300 
                   group-hover:-translate-y-1 group-hover:scale-130"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 group-hover:text-yellow-500 transition">
              Earphones
            </h2>
          </div>

          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center cursor-pointer transform hover:-translate-y-1">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4 group-hover:bg-yellow-500 transition">
              <LuProjector
                className="text-3xl text-gray-600 group-hover:text-white transition duration-300 
                   group-hover:-translate-y-1 group-hover:scale-130"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 group-hover:text-yellow-500 transition">
              Projector
            </h2>
          </div>

          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center cursor-pointer transform hover:-translate-y-1">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4 group-hover:bg-yellow-500 transition">
              <IoWatchOutline
                className="text-3xl text-gray-600 group-hover:text-white transition duration-300 
                   group-hover:-translate-y-1 group-hover:scale-130"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 group-hover:text-yellow-500 transition">
              Watch
            </h2>
          </div>

          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center cursor-pointer transform hover:-translate-y-1">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4 group-hover:bg-yellow-500 transition">
              <IoGameControllerOutline
                className="text-3xl text-gray-600 group-hover:text-white transition duration-300 
                   group-hover:-translate-y-1 group-hover:scale-130"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 group-hover:text-yellow-500 transition">
              Game Controller
            </h2>
          </div>

          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center cursor-pointer transform hover:-translate-y-1">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4 group-hover:bg-yellow-500 transition">
              <MdLaptopMac
                className="text-3xl text-gray-600 group-hover:text-white transition duration-300 
                   group-hover:-translate-y-1 group-hover:scale-130"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 group-hover:text-yellow-500 transition">
              MacBook
            </h2>
          </div>
        </div>
      </div>

      <section className="w-full bg-[#f5f5f5] py-16">
        <div className="max-w-7xl mx-auto px-5">
          {/* Heading */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold text-[#111]">New Arrivals</h2>

            <button className="flex items-center gap-2 text-lg font-medium hover:text-yellow-500 transition">
              View More →
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item) => (
              <div
                key={item.id}
                className="group bg-white p-6 relative overflow-hidden transition-all duration-500"
              >
                {/* Image */}
                <div className="relative w-full h-[320px] bg-[#fafafa] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-all duration-500"
                  />

                  {/* Hover Buttons */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <button className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-yellow-500 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
                      >
                        <circle cx="8" cy="21" r="1" />
                        <circle cx="19" cy="21" r="1" />
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                      </svg>
                    </button>

                    <button className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-eye-icon lucide-eye"
                      >
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-6 text-center">
                  <h3 className="text-2xl font-semibold text-[#222]">
                    {item.name}
                  </h3>

                  <div className="mt-3 flex items-center justify-center gap-3">
                    <span className="text-red-500 text-2xl font-bold">
                      {item.price}
                    </span>

                    <span className="text-gray-400 line-through text-xl">
                      ₹{item.price + 1000}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#eef7fd] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
            {/* Left Image */}
            <div className="relative flex justify-center">
              <div className="absolute -left-24 top-0 w-72 h-72 bg-[#cfe8fb] rotate-45 rounded-3xl"></div>
            </div>

            {/* Right Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-[#111] leading-tight">
                Get <span className="text-[#f7b731]">20%</span> Off Discount
                Coupon
              </h2>

              <p className="mt-3 text-md text-gray-700">
                by Subscribe our Newsletter
              </p>

              {/* Input */}
              <div className="mt-10 flex flex-col sm:flex-row items-center bg-white shadow-lg overflow-hidden max-w-2xl rounded-full mx-auto">
                {/* Input Field */}
                <div className="flex items-center gap-3 w-full px-3 py-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail-icon lucide-mail"
                  >
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>

                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    className="w-full outline-none bg-transparent text-sm tracking-wide"
                  />
                </div>

                {/* Button */}
                <button className="w-full sm:w-auto px-10 py-5 bg-[#f7b731] text-black font-semibold hover:bg-[#111] hover:text-white transition duration-300">
                  Get the Coupon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className=" border-gray-100" />
    </>
  );
}
