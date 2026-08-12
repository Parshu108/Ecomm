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
      <div className="flex items-center justify-center min-h-[400px] bg-background">
        <div className="flex items-center gap-3 text-muted-foreground font-medium animate-pulse">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          <span>Loading Dashboard Metrics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-background min-h-screen p-1">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-6 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time business performance and operational summary
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:opacity-90 text-primary-foreground rounded-xl text-sm font-semibold shadow-md shadow-primary/20 transition"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
          
           <a href="/api/admin/export?type=orders"
            download
            className="flex items-center gap-2 px-4 py-2.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl text-sm font-semibold transition border border-border"
          >
            <Download className="w-4 h-4" />
            Export Orders
          </a>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Revenue */}
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Revenue</p>
            <h3 className="text-2xl font-black text-foreground mt-2">
              ₹{(stats?.totalRevenue || 0).toLocaleString()}
            </h3>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Live Sales Revenue</span>
            </div>
          </div>
          <div className="bg-emerald-500/10 text-emerald-400 p-3.5 rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Orders</p>
            <h3 className="text-2xl font-black text-foreground mt-2">{stats?.totalOrders || 0}</h3>
            <span className="text-muted-foreground text-xs font-medium mt-2 block">All-time store orders</span>
          </div>
          <div className="bg-primary/10 text-primary p-3.5 rounded-2xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Pending Shipments */}
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pending Shipments</p>
            <h3 className="text-2xl font-black text-foreground mt-2">{stats?.pendingShipments || 0}</h3>
            <span className="text-amber-400 text-xs font-medium mt-2 block">Needs dispatch</span>
          </div>
          <div className="bg-amber-500/10 text-amber-400 p-3.5 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Low Stock Alert */}
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Low Stock Flags</p>
            <h3 className="text-2xl font-black text-foreground mt-2">{stats?.lowStockCount || 0}</h3>
            <span className="text-destructive text-xs font-medium mt-2 block">Items below threshold</span>
          </div>
          <div className="bg-destructive/10 text-destructive p-3.5 rounded-2xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Low Stock Warning Section if any */}
      {stats?.lowStockProducts && stats.lowStockProducts.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Low Stock Inventory Alerts</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {stats.lowStockProducts.map((p) => (
              <div
                key={p._id}
                className="bg-card p-3.5 rounded-xl border border-amber-500/20 flex items-center justify-between"
              >
                <div className="truncate pr-2">
                  <p className="font-semibold text-sm text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">₹{p.price}</p>
                </div>
                <span className="bg-destructive/10 text-destructive text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                  {p.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders Table */}
      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-bold text-foreground text-lg">Recent Orders</h2>
            <p className="text-xs text-muted-foreground">Latest customer transactions</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-primary hover:text-accent text-xs font-bold flex items-center gap-1"
          >
            View All Orders <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 text-muted-foreground uppercase text-[11px] font-bold tracking-wider border-b border-border">
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-6">Customer Email</th>
                <th className="py-3.5 px-6">Payment Method</th>
                <th className="py-3.5 px-6">Total Amount</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm font-medium text-foreground/90">
              {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                stats.recentOrders.map((o) => {
                  const statusColors = {
                    paid: "bg-emerald-500/10 text-emerald-400",
                    delivered: "bg-emerald-500/10 text-emerald-400",
                    pending: "bg-amber-500/10 text-amber-400",
                    processing: "bg-primary/10 text-primary",
                    shipped: "bg-accent/10 text-accent",
                    cancelled: "bg-destructive/10 text-destructive",
                  };
                  return (
                    <tr key={o._id} className="hover:bg-secondary/40 transition">
                      <td className="py-4 px-6 font-mono text-xs font-bold text-foreground">
                        #{o._id.substring(0, 8)}
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {o.shippingInfo?.email || o.billingInfo?.email || "Customer"}
                      </td>
                      <td className="py-4 px-6 uppercase text-xs font-bold text-muted-foreground">
                        {o.paymentMethod || "Razorpay"}
                      </td>
                      <td className="py-4 px-6 font-bold text-foreground">₹{o.total}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                            statusColors[o.status] || "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-xs text-muted-foreground">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground text-sm">
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