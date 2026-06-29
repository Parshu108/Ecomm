"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProductcontext } from "../context/productcontext";
import Image from "next/image";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiReturnArrow } from "react-icons/gi";
import { FaShieldAlt } from "react-icons/fa";
import Link from "next/link";

const FALLBACK_IMAGE = "/placeholder.png"; // put a real placeholder in /public

const Page = () => {
  const params = useParams();
  // Next.js can return slug as string or string[] — normalise it
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const { products, addTocart } = useProductcontext();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Wait until products have actually loaded
    if (!products) return;

    if (products.length === 0) {
      // Still loading from context — stay in loading state
      return;
    }

    setLoading(false);

    // FIX: compare as strings; MongoDB _id may come through as an object
    const found = products.find((p) => String(p._id) === String(slug));

    if (!found) {
      setNotFound(true);
      return;
    }

    setProduct(found);
    setSelectedImage(found.image || FALLBACK_IMAGE);
    setRelatedProducts(
      products.filter(
        (p) => p.category === found.category && String(p._id) !== String(slug),
      ),
    );
  }, [slug, products]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-2 border-slate-200 border-t-yellow-400 rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading product...</p>
        </div>
      </div>
    );
  }

  // ── Not found state ────────────────────────────────────────────────────────
  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-2xl">😕</p>
          <p className="text-slate-700 font-medium">Product not found</p>
          <p className="text-sm text-slate-400">
            The product you're looking for doesn't exist or was removed.
          </p>
          <Link
            href="/shop"
            className="mt-2 text-sm font-medium text-yellow-500 hover:underline"
          >
            Back to shop →
          </Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  // ── Derived values ─────────────────────────────────────────────────────────
  const thumbnails =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || FALLBACK_IMAGE];

  const originalPrice =
    product.originalPrice || product.mrp || Math.round(product.price * 1.4);
  const discountPercent = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100,
  );

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
                src={selectedImage || FALLBACK_IMAGE}
                alt={product.name}
                width={360}
                height={360}
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="flex gap-3 mt-4 flex-wrap">
              {thumbnails.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img || FALLBACK_IMAGE)}
                  className={`w-[68px] h-[68px] rounded-xl border bg-white flex items-center justify-center overflow-hidden transition-all
                    ${
                      selectedImage === img
                        ? "border-yellow-400 ring-2 ring-yellow-400 ring-offset-1"
                        : "border-slate-100 hover:border-slate-300"
                    }`}
                >
                  <Image
                    src={img || FALLBACK_IMAGE}
                    alt={`Product view ${i + 1}`}
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
                {product.rating ?? "4.5"} · {product.reviewCount ?? 128} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-slate-900">
                ₹{product.price}
              </span>
              <span className="text-sm text-slate-400 line-through">
                ₹{originalPrice}
              </span>
              <span className="text-xs font-semibold bg-yellow-400 text-slate-900 px-2.5 py-0.5 rounded-full">
                {discountPercent}% off
              </span>
            </div>

            <hr className="border-slate-100" />

            <p className="text-sm text-slate-500 leading-relaxed">
              {product.description || "No description available."}
            </p>

            <hr className="border-slate-100" />

            {/* Quantity */}
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
                Quantity
              </p>
              <div className="flex items-center border border-slate-200 rounded-xl w-fit overflow-hidden mb-5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-800 text-lg flex items-center justify-center transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 1) setQuantity(val);
                  }}
                  className="w-12 h-10 text-center text-sm font-medium text-slate-900 bg-white border-x border-slate-200 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-800 text-lg flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => addTocart(product._id, quantity)}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-yellow-400 py-3 rounded-xl text-sm font-medium transition-colors"
                >
                  🛒 Add to cart
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 py-3 rounded-xl text-sm font-semibold transition-colors">
                  ⚡ Buy now
                </button>
              </div>
            </div>

            {/* Trust badges */}
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
                <Link key={String(item._id)} href={`/product/${item._id}`}>
                  <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden group hover:border-yellow-400 transition-colors cursor-pointer">
                    <div className="bg-gray-50 p-4 flex items-center justify-center h-[200px]">
                      <Image
                        src={item.image || FALLBACK_IMAGE}
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
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addTocart(item._id, 1);
                          }}
                          className="flex-1 bg-slate-800 hover:bg-slate-900 text-yellow-400 text-xs font-medium py-2 rounded-lg transition-colors"
                        >
                          Add to cart
                        </button>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-slate-900 text-xs font-semibold py-2 rounded-lg transition-colors"
                        >
                          Buy now
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
