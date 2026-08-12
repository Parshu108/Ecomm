"use client";
import React, { useEffect, useState } from "react";
import {
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderValue: "500",
    maxDiscountAmount: "1000",
  });

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/coupons");
      const data = await res.json();
      if (data.success) setCoupons(data.coupons || []);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setFormData({
          code: "",
          discountType: "percentage",
          discountValue: "",
          minOrderValue: "500",
          maxDiscountAmount: "1000",
        });
        fetchCoupons();
      } else {
        alert(data.message || "Failed to create coupon");
      }
    } catch (err) {
      alert("Error creating coupon");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this promo coupon?")) return;
    try {
      const res = await fetch(`/api/coupons?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchCoupons();
    } catch (err) {
      alert("Error deleting coupon");
    }
  };

  return (
    <div className="space-y-6 bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-6 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Coupon & Promo Code Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create discount codes to boost conversions and manage promotional
            offers
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:opacity-90 text-primary-foreground rounded-xl text-sm font-semibold shadow-md shadow-primary/20 transition"
        >
          <Plus className="w-4 h-4" />
          Create New Coupon
        </button>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <RefreshCw className="w-6 h-6 animate-spin text-primary mr-2" />
            <span>Loading Coupons...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/50 text-muted-foreground uppercase text-[11px] font-bold tracking-wider border-b border-border">
                  <th className="py-3.5 px-6">Coupon Code</th>
                  <th className="py-3.5 px-6">Discount Type</th>
                  <th className="py-3.5 px-6">Value</th>
                  <th className="py-3.5 px-6">Min Order Value</th>
                  <th className="py-3.5 px-6">Times Used</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm font-medium text-foreground/90">
                {coupons.length > 0 ? (
                  coupons.map((c) => (
                    <tr
                      key={c._id}
                      className="hover:bg-secondary/40 transition"
                    >
                      <td className="py-4 px-6 font-mono font-bold text-primary text-base">
                        {c.code}
                      </td>
                      <td className="py-4 px-6 capitalize">{c.discountType}</td>
                      <td className="py-4 px-6 font-bold text-foreground">
                        {c.discountType === "percentage"
                          ? `${c.discountValue}% OFF`
                          : `₹${c.discountValue} OFF`}
                      </td>
                      <td className="py-4 px-6">₹{c.minOrderValue}</td>
                      <td className="py-4 px-6 font-semibold text-muted-foreground">
                        {c.usedCount || 0} times
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(c._id)}
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
                      colSpan={6}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No active coupons. Click "Create New Coupon" to add one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-foreground text-lg border-b border-border pb-3">
              Create Promo Coupon
            </h3>
            <form onSubmit={handleCreate} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WELCOME10"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  className="w-full px-3.5 py-2 bg-background border border-input rounded-xl uppercase font-mono font-bold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Type
                  </label>
                  <select
                    value={formData.discountType}
                    onChange={(e) =>
                      setFormData({ ...formData, discountType: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="10"
                    value={formData.discountValue}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountValue: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 bg-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Minimum Order Subtotal (₹)
                </label>
                <input
                  type="number"
                  value={formData.minOrderValue}
                  onChange={(e) =>
                    setFormData({ ...formData, minOrderValue: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:opacity-90 text-primary-foreground rounded-xl font-semibold shadow-md shadow-primary/20 transition"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
