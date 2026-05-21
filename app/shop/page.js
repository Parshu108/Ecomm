"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProductcontext } from "../context/productcontext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);

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
    if (category === "All") {
      setFiltered(products);
    } else {
      const data = products.filter((item) => item.category === category);
      setFiltered(data);
    }
  };

  const filterbyprice = (price) => {
    const data = products.filter((item) => item.price >= price);
    setFiltered(data);
  };

  // ✅ Loading state
  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <>
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
      <div className="min-h-screen bg-gray-100 px-6 py-10">
        {/* 🔥 Header */}
        <h1 className=" text-center text-3xl font-bold text-gray-800 mb-8">
          🛒 Product Store
        </h1>

        <div className="max-w-6xl mx-auto px-2">
          <div className="bg-gray-700 text-white rounded-2xl shadow-md my-6 p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CATEGORY FILTER */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-semibold text-lg">Category:</span>

                <button
                  onClick={() => setFiltered(products)}
                  className="px-4 py-2 text-sm border border-yellow-400 rounded-full hover:bg-yellow-600 hover:text-black transition"
                >
                  All
                </button>

                <button
                  onClick={() => filterbycategory("mobile")}
                  className="px-4 py-2 text-sm border border-yellow-400 rounded-full hover:bg-yellow-600 hover:text-black transition"
                >
                  Mobiles
                </button>

                <button
                  onClick={() => filterbycategory("headphone")}
                  className="px-4 py-2 text-sm border border-yellow-400 rounded-full hover:bg-yellow-600 hover:text-black transition"
                >
                  Headphone
                </button>

                <button
                  onClick={() => filterbycategory("watch")}
                  className="px-4 py-2 text-sm border border-yellow-400 rounded-full hover:bg-yellow-600 hover:text-black transition"
                >
                  Watch
                </button>

                <button
                  onClick={() => filterbycategory("remote")}
                  className="px-4 py-2 text-sm border border-yellow-400 rounded-full hover:bg-yellow-600 hover:text-black transition"
                >
                  Gaming
                </button>
              </div>
              {/* price filter */}
              <div className="flex flex-wrap items-center gap-3 ">
                <span className="font-semibold text-lg">Price:</span>

                <button
                  onClick={() => filterbyprice(1000)}
                  className="px-4 py-2 text-sm border border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition"
                >
                  ≥ ₹1,000
                </button>

                <button
                  onClick={() => filterbyprice(10000)}
                  className="px-4 py-2 text-sm border border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition"
                >
                  ≥ ₹10,000
                </button>

                <button
                  onClick={() => filterbyprice(40000)}
                  className="px-4 py-2 text-sm border border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition"
                >
                  ≥ ₹40,000
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(filtered) &&
            filtered.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition duration-300 flex flex-col"
              >
                {/* IMAGE */}
                <div className="bg-gray-50 rounded-lg p-4 flex justify-center items-center h-[200px]">
                  <Image
                    src={product.image || "/fallback.png"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain hover:scale-105 transition duration-300"
                    unoptimized
                    loading="eager"
                  />
                </div>

                {/* CONTENT */}
                <div className="mt-4 flex flex-col flex-grow">
                  {/* TITLE */}
                  <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 cursor-pointer">
                    {product.name}
                  </h2>

                  {/* RATING */}
                  <div className="flex items-center mt-1 text-sm">
                    <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
                    <span className="text-gray-500 ml-2">(120)</span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                    {product.description?.substring(0, 80)}...
                  </p>

                  {/* PRICE */}
                  <div className="mt-3">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through ml-2">
                      ₹{(product.price * 1.2).toFixed(0)}
                    </span>
                  </div>

                  {/* BUTTON */}
                  <button
                    className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium py-2 rounded-md mt-4 transition"
                    onClick={() => {
                      (addTocart(product.name, product.image, product.price),
                        getCartdata());
                    }}
                  >
                    Add to Cart
                  </button>

                  <Link
                    href={`/${product._id}`}
                    className="w-full text-center border border-gray-300 py-2 mt-2 rounded-lg text-sm hover:bg-gray-100 transition"
                  >
                    view
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
