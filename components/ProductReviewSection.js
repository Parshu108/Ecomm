"use client";
import React, { useEffect, useState } from "react";
import { Star, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function ProductReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !comment) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          userName,
          rating,
          comment,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setComment("");
        fetchReviews();
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch (err) {
      alert("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pt-10 border-t border-slate-800 text-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
            Customer Reviews & Ratings
          </h2>
          <p className="text-xs text-slate-400 mt-1">Verified buyer feedback & ratings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Write a Review Form */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-white text-base">Write a Review</h3>

          {submitted && (
            <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Review submitted! Thank you.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Rating</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 text-slate-400 hover:text-amber-400 transition"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Your Feedback</label>
              <textarea
                rows={3}
                required
                placeholder="Share your experience with this product..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? "Submitting..." : "Post Review"}
            </button>
          </form>
        </div>

        {/* Review List */}
        <div className="lg:col-span-2 space-y-4">
          {reviews.length > 0 ? (
            reviews.map((r) => (
              <div key={r._id} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-900/50 text-indigo-300 font-bold text-xs flex items-center justify-center border border-indigo-700/50">
                      {r.userName?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{r.userName}</h4>
                      <p className="text-[10px] text-slate-500">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{r.rating}/5</span>
                  </div>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed pt-1">{r.comment}</p>
              </div>
            ))
          ) : (
            <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl text-center text-slate-500 text-xs">
              No reviews yet for this product. Be the first to leave a review above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
