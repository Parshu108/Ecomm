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
    <div className="space-y-6 bg-background">
      <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
        <h1 className="text-2xl font-bold text-foreground">
          Review Moderation
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Approve, filter, and moderate customer product reviews and ratings
        </p>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <RefreshCw className="w-6 h-6 animate-spin text-primary mr-2" />
            <span>Loading Reviews...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/50 text-muted-foreground uppercase text-[11px] font-bold tracking-wider border-b border-border">
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Rating</th>
                  <th className="py-3.5 px-6">Review Content</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm font-medium text-foreground/90">
                {reviews.length > 0 ? (
                  reviews.map((r) => (
                    <tr
                      key={r._id}
                      className="hover:bg-secondary/40 transition"
                    >
                      <td className="py-4 px-6">
                        <p className="font-bold text-foreground">
                          {r.userName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {r.userEmail || "No email"}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center text-amber-400 font-bold gap-1 text-xs">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span>{r.rating}/5</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 max-w-md">
                        <p className="text-foreground/90 line-clamp-2">
                          {r.comment}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() =>
                            handleToggleApprove(r._id, r.isApproved)
                          }
                          className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                            r.isApproved
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-amber-500/10 text-amber-400"
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
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-8 text-center text-muted-foreground"
                    >
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
