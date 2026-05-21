"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProductcontext } from "../context/productcontext";
import Image from "next/image";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiReturnArrow } from "react-icons/gi";
import { FaShieldAlt } from "react-icons/fa";
import Link from "next/link";

// 60% = white/gray-50  →  backgrounds, cards, surfaces
// 30% = slate-800/900  →  text, navbar, headers, cart button
// 10% = yellow-400     →  buy button, badges, accent icons, hover highlights

const Page = () => {
  const { slug } = useParams();
  const { products, addTocart } = useProductcontext();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!products || products.length === 0) return;
    const found = products.find((p) => p._id === slug);
    if (found) {
      setProduct(found);
      setSelectedImage(found.image);
      setRelatedProducts(
        products.filter(
          (p) => p.category === found.category && p._id !== found._id,
        ),
      );
    }
  }, [slug, products]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-2 border-slate-200 border-t-yellow-400 rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* BREADCRUMB */}
        <nav className="text-xs text-slate-400 mb-8 flex items-center gap-1.5">
          <Link href="/" className="hover:text-slate-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-slate-700 transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-slate-700 truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* LEFT — IMAGES */}
          <div>
            <div className="bg-white border border-slate-100 rounded-2xl p-8 flex items-center justify-center min-h-[340px]">
              <Image
                src={selectedImage}
                alt={product.name}
                width={360}
                height={360}
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="flex gap-3 mt-4">
              {[product.image, product.image, product.image].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-[68px] h-[68px] rounded-xl border bg-white flex items-center justify-center overflow-hidden transition-all
                    ${
                      selectedImage === img
                        ? "border-yellow-400 ring-2 ring-yellow-400 ring-offset-1"
                        : "border-slate-100 hover:border-slate-300"
                    }`}
                >
                  <Image
                    src={img}
                    alt="thumb"
                    width={56}
                    height={56}
                    className="object-contain"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — DETAILS */}
          <div className="space-y-4">
            {/* 10% accent — yellow badge on dark bg */}
            <span className="inline-flex items-center gap-1.5 bg-slate-800 text-yellow-400 text-xs font-medium px-3 py-1 rounded-full">
              ✓ In stock
            </span>

            <h1 className="text-2xl font-semibold text-slate-900 leading-snug">
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              {"★★★★★".split("").map((s, i) => (
                <span key={i}>{s}</span>
              ))}
              <span className="text-slate-400 text-xs ml-1.5">
                4.5 · 128 reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-slate-900">
                ₹{product.price}
              </span>
              <span className="text-sm text-slate-400 line-through">
                ₹{Math.round(product.price * 1.4)}
              </span>
              {/* 10% accent — yellow pill */}
              <span className="text-xs font-semibold bg-yellow-400 text-slate-900 px-2.5 py-0.5 rounded-full">
                {Math.round(
                  ((product.price * 1.4 - product.price) /
                    (product.price * 1.4)) *
                    100,
                )}
                % off
              </span>
            </div>

            <hr className="border-slate-100" />

            <p className="text-sm text-slate-500 leading-relaxed">
              {product.description}
            </p>

            <hr className="border-slate-100" />

            {/* Quantity */}
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
                Quantity
              </p>
              <div className="flex items-center border border-slate-200 rounded-xl w-fit overflow-hidden mb-5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-800 text-lg flex items-center justify-center transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className="w-12 h-10 text-center text-sm font-medium text-slate-900 bg-white border-x border-slate-200 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-800 text-lg flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>

              <div className="flex gap-3">
                {/* 30% — dark slate button */}
                <button
                  onClick={() => addTocart(product._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-yellow-400 py-3 rounded-xl text-sm font-medium transition-colors"
                >
                  🛒 Add to cart
                </button>
                {/* 10% — yellow accent button */}
                <button className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 py-3 rounded-xl text-sm font-semibold transition-colors">
                  ⚡ Buy now
                </button>
              </div>
            </div>

            {/* Trust badges — 10% accent icons */}
            <div className="flex gap-4 pt-1 flex-wrap">
              {[
                { icon: <CiDeliveryTruck />, text: "Free delivery" },
                { icon: <GiReturnArrow />, text: "7-day returns" },
                { icon: <FaShieldAlt />, text: "1-year warranty" },
              ].map(({ icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-1.5 text-xs text-slate-400"
                >
                  {icon} {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-base font-semibold text-slate-800 whitespace-nowrap">
              Related products
            </h2>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {relatedProducts.length === 0 ? (
            <p className="text-sm text-slate-400">No related products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {relatedProducts.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden group hover:border-yellow-400 transition-colors cursor-pointer"
                >
                  <div className="bg-gray-50 p-4 flex items-center justify-center h-[200px]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-medium text-slate-800 truncate mb-0.5">
                      {item.name}
                    </h3>
                    <p className="text-sm font-semibold text-slate-900 mb-3">
                      ₹{item.price}
                    </p>
                    <div className="flex gap-2">
                      {/* 30% dark */}
                      <button
                        onClick={() => addTocart(item._id)}
                        className="flex-1 bg-slate-800 hover:bg-slate-900 text-yellow-400 text-xs font-medium py-2 rounded-lg transition-colors"
                      >
                        Add to cart
                      </button>
                      {/* 10% yellow */}
                      <button className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-slate-900 text-xs font-semibold py-2 rounded-lg transition-colors">
                        Buy now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
