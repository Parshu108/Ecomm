"use client";
import React, { useState } from "react";
import { Heart } from "lucide-react";

export default function WishlistButton({ productId, isInitiallyWishlisted = false }) {
  const [wishlisted, setWishlisted] = useState(isInitiallyWishlisted);
  const [loading, setLoading] = useState(false);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Default guest userId if user not logged in
    const userId = "660000000000000000000000";
    setLoading(true);

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await res.json();
      if (data.success) {
        setWishlisted(data.added);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={loading}
      className={`p-2.5 rounded-full transition-all duration-200 shadow-sm border ${
        wishlisted
          ? "bg-rose-50 border-rose-200 text-rose-600 scale-110"
          : "bg-white/90 border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-white"
      }`}
      title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <Heart className={`w-5 h-5 ${wishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
    </button>
  );
}
