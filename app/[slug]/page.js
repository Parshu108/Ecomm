"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProductcontext } from "../../context/productcontext";
import Image from "next/image";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiReturnArrow } from "react-icons/gi";
import { FaShieldAlt, FaStar, FaShoppingCart, FaBolt, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const FALLBACK_IMAGE = "/placeholder.png";

const Page = () => {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const { products, addTocart, getCartdata } = useProductcontext();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const timer = setTimeout(() => {
      setLoading(false);

      const found = products.find((p) => String(p._id) === String(slug));

      if (!found) {
        setNotFound(true);
        return;
      }

      setProduct(found);
      setSelectedImage(found.image || FALLBACK_IMAGE);
      setRelatedProducts(
        products.filter(
          (p) => p.category === found.category && String(p._id) !== String(slug)
        )
      );
    }, 0);

    return () => clearTimeout(timer);
  }, [slug, products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07090e]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-slate-800 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-xs font-mono tracking-widest text-slate-400 uppercase">
            Loading Product Details...
          </p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07090e] px-4">
        <div className="glass-panel p-10 rounded-3xl text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl mx-auto">
            🔍
          </div>
          <h2 className="text-xl font-bold text-white">Product Not Found</h2>
          <p className="text-xs text-slate-400">
            The requested item might have been removed or is temporarily unavailable.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-all"
          >
            <FaArrowLeft /> Back to Shop Catalog
          </Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const thumbnails =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || FALLBACK_IMAGE];

  const originalPrice = Math.round(product.price * 1.35);
  const discountPercent = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100
  );

  return (
    <div className="bg-[#07090e] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* BREADCRUMB */}
        <nav className="text-xs text-slate-400 flex items-center gap-2 font-mono">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-cyan-400 transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-white truncate font-semibold">{product.name}</span>
        </nav>

        {/* MAIN DISPLAY GRID */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* GALLERY LEFT */}
          <div className="space-y-4">
            <div className="relative bg-slate-950 rounded-3xl p-8 flex items-center justify-center h-[380px] sm:h-[460px] border border-slate-800 shadow-2xl">
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-cyan-500 text-black shadow-lg">
                In Stock
              </span>
              <Image
                src={selectedImage || FALLBACK_IMAGE}
                alt={product.name}
                fill
                className="object-contain p-6 transition-all duration-300"
                unoptimized
              />
            </div>

            {/* THUMBNAILS */}
            {thumbnails.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {thumbnails.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img || FALLBACK_IMAGE)}
                    className={`relative w-20 h-20 rounded-2xl border bg-slate-950 p-2 overflow-hidden flex-shrink-0 transition-all ${
                      selectedImage === img
                        ? "border-cyan-400 ring-2 ring-cyan-400/30"
                        : "border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <Image
                      src={img || FALLBACK_IMAGE}
                      alt={`View ${i + 1}`}
                      fill
                      className="object-contain p-1"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS RIGHT */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                {product.category || "Electronics"}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {product.name}
              </h1>

              {/* RATING */}
              <div className="flex items-center gap-2 pt-1 text-amber-400 text-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <span className="text-xs text-slate-400 font-mono ml-2">
                  4.9 Rating · 240 Verified Reviews
                </span>
              </div>
            </div>

            {/* PRICE BAR */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400 block font-mono uppercase">Special Offer Price</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-slate-500 line-through font-mono">
                    ₹{originalPrice}
                  </span>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Save {discountPercent}%
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {product.description ||
                "Engineered for high performance and daily reliability. Features ultra-low latency, premium materials, and manufacturer warranty."}
            </p>

            {/* QUANTITY & ACTIONS */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono tracking-wider uppercase text-slate-400">
                  Quantity
                </span>
                <div className="flex items-center border border-slate-800 rounded-xl bg-slate-900 overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 text-white font-bold hover:bg-slate-800 transition-colors flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-sm font-bold font-mono text-cyan-400">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 text-white font-bold hover:bg-slate-800 transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    addTocart(product.name, product.image, product.price);
                    getCartdata();
                  }}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400 text-sm font-bold hover:bg-cyan-500 hover:text-black hover:border-cyan-400 transition-all duration-200"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <Link
                  href="/cart"
                  onClick={() => {
                    addTocart(product.name, product.image, product.price);
                    getCartdata();
                  }}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-500 text-black text-sm font-extrabold hover:bg-cyan-400 transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <FaBolt /> Buy Now
                </Link>
              </div>
            </div>

            {/* TRUST GUARANTEES */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <CiDeliveryTruck className="text-2xl text-cyan-400 mb-1" />
                <span className="text-[11px] font-bold text-white">Free Express</span>
                <span className="text-[10px] text-slate-400">Delivery in 48h</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <GiReturnArrow className="text-2xl text-cyan-400 mb-1" />
                <span className="text-[11px] font-bold text-white">7 Days Return</span>
                <span className="text-[10px] text-slate-400">Instant Refund</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <FaShieldAlt className="text-2xl text-cyan-400 mb-1" />
                <span className="text-[11px] font-bold text-white">1 Year Warranty</span>
                <span className="text-[10px] text-slate-400">Official Brand</span>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-slate-800">
            <h2 className="text-2xl font-extrabold text-white">Related Tech Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <div
                  key={item._id}
                  className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center gap-4"
                >
                  <div className="relative w-20 h-20 bg-slate-950 rounded-xl flex-shrink-0 p-2">
                    <Image
                      src={item.image || FALLBACK_IMAGE}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                    <p className="text-xs text-cyan-400 font-mono font-bold mt-0.5">₹{item.price}</p>
                    <Link
                      href={`/${item._id}`}
                      className="text-[11px] text-slate-400 hover:text-cyan-400 mt-1 inline-block"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
