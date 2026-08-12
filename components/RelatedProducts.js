"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import WishlistButton from "./WishlistButton";
import { Star, ShoppingCart } from "lucide-react";

export default function RelatedProducts({ currentProductId, category }) {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    fetch("/api/electroproduct")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products)) {
          const filtered = data.products
            .filter(
              (p) =>
                p._id !== currentProductId &&
                ((p.category || "").toLowerCase() === (category || "").toLowerCase() || !category)
            )
            .slice(0, 4);
          setRelated(filtered);
        }
      })
      .catch((err) => console.error("Error fetching related products:", err));
  }, [currentProductId, category]);

  if (related.length === 0) return null;

  return (
    <div className="space-y-6 pt-12 border-t border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">You May Also Like</h2>
          <p className="text-xs text-slate-500 mt-1">Recommended products in the same category</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((p) => (
          <div
            key={p._id}
            className="group bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between"
          >
            <div className="absolute top-6 right-6 z-10">
              <WishlistButton productId={p._id} />
            </div>

            <div>
              <Link href={`/shop/${p.slug || p._id}`}>
                <div className="aspect-square rounded-xl bg-slate-50 overflow-hidden mb-4 relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              </Link>

              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md capitalize">
                {p.category || "General"}
              </span>

              <Link href={`/shop/${p.slug || p._id}`}>
                <h3 className="font-bold text-slate-900 text-base mt-2 line-clamp-1 group-hover:text-indigo-600 transition">
                  {p.name}
                </h3>
              </Link>

              <div className="flex items-center gap-1.5 text-xs text-amber-500 mt-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold text-slate-700">{p.rating || 4.5}</span>
                <span className="text-slate-400">({p.numReviews || 12})</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
              <span className="text-lg font-black text-slate-900">₹{p.price}</span>
              <Link
                href={`/shop/${p.slug || p._id}`}
                className="px-3.5 py-2 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
              >
                <ShoppingCart className="w-3.5 h-3.5" /> View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
