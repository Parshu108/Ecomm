"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Plus,
  Download,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch admin stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-slate-500 font-medium animate-pulse">
          <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
          <span>Loading Dashboard Metrics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time business performance and operational summary
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-600/20 transition"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
          <a
            href="/api/admin/export?type=orders"
            download
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition"
          >
            <Download className="w-4 h-4" />
            Export Orders
          </a>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Revenue */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Revenue</p>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              ₹{(stats?.totalRevenue || 0).toLocaleString()}
            </h3>
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Live Sales Revenue</span>
            </div>
          </div>
          <div className="bg-emerald-50 text-emerald-600 p-3.5 rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Orders</p>
            <h3 className="text-2xl font-black text-slate-900 mt-2">{stats?.totalOrders || 0}</h3>
            <span className="text-slate-400 text-xs font-medium mt-2 block">All-time store orders</span>
          </div>
          <div className="bg-blue-50 text-blue-600 p-3.5 rounded-2xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Pending Shipments */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pending Shipments</p>
            <h3 className="text-2xl font-black text-slate-900 mt-2">{stats?.pendingShipments || 0}</h3>
            <span className="text-amber-600 text-xs font-medium mt-2 block">Needs dispatch</span>
          </div>
          <div className="bg-amber-50 text-amber-600 p-3.5 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Low Stock Alert */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Low Stock Flags</p>
            <h3 className="text-2xl font-black text-slate-900 mt-2">{stats?.lowStockCount || 0}</h3>
            <span className="text-rose-600 text-xs font-medium mt-2 block">Items below threshold</span>
          </div>
          <div className="bg-rose-50 text-rose-600 p-3.5 rounded-2xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Low Stock Warning Section if any */}
      {stats?.lowStockProducts && stats.lowStockProducts.length > 0 && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-base mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Low Stock Inventory Alerts</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {stats.lowStockProducts.map((p) => (
              <div
                key={p._id}
                className="bg-white p-3.5 rounded-xl border border-amber-200/80 flex items-center justify-between shadow-xs"
              >
                <div className="truncate pr-2">
                  <p className="font-semibold text-sm text-slate-800 truncate">{p.name}</p>
                  <p className="text-xs text-slate-500">₹{p.price}</p>
                </div>
                <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                  {p.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-lg">Recent Orders</h2>
            <p className="text-xs text-slate-500">Latest customer transactions</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-indigo-600 hover:text-indigo-700 text-xs font-bold flex items-center gap-1"
          >
            View All Orders <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-6">Customer Email</th>
                <th className="py-3.5 px-6">Payment Method</th>
                <th className="py-3.5 px-6">Total Amount</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                stats.recentOrders.map((o) => {
                  const statusColors = {
                    paid: "bg-emerald-100 text-emerald-700",
                    delivered: "bg-emerald-100 text-emerald-700",
                    pending: "bg-amber-100 text-amber-700",
                    processing: "bg-blue-100 text-blue-700",
                    shipped: "bg-indigo-100 text-indigo-700",
                    cancelled: "bg-rose-100 text-rose-700",
                  };
                  return (
                    <tr key={o._id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-6 font-mono text-xs font-bold text-slate-900">
                        #{o._id.substring(0, 8)}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {o.shippingInfo?.email || o.billingInfo?.email || "Customer"}
                      </td>
                      <td className="py-4 px-6 uppercase text-xs font-bold text-slate-500">
                        {o.paymentMethod || "Razorpay"}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900">₹{o.total}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                            statusColors[o.status] || "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-xs text-slate-400">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">
                    No orders recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
