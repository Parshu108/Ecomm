"use client";
import React, { useEffect, useState } from "react";
import { Star, CheckCircle2, XCircle, Trash2, RefreshCw } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (data.success) setReviews(data.reviews || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleToggleApprove = async (reviewId, isApproved) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId, isApproved: !isApproved }),
      });
      const data = await res.json();
      if (data.success) fetchReviews();
    } catch (err) {
      alert("Error updating review moderation");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this review permanently?")) return;
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchReviews();
    } catch (err) {
      alert("Error deleting review");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Review Moderation</h1>
        <p className="text-slate-500 text-sm mt-1">
          Approve, filter, and moderate customer product reviews and ratings
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin text-indigo-600 mr-2" />
            <span>Loading Reviews...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-100">
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Rating</th>
                  <th className="py-3.5 px-6">Review Content</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {reviews.length > 0 ? (
                  reviews.map((r) => (
                    <tr key={r._id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-900">{r.userName}</p>
                        <p className="text-xs text-slate-400">{r.userEmail || "No email"}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center text-amber-500 font-bold gap-1 text-xs">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span>{r.rating}/5</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 max-w-md">
                        <p className="text-slate-800 line-clamp-2">{r.comment}</p>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleApprove(r._id, r.isApproved)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                            r.isApproved
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {r.isApproved ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" /> Pending
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(r._id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No customer reviews submitted yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
