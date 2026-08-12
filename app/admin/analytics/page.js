"use client";
import React, { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Download, Package, RefreshCw } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.stats);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin text-indigo-600 mr-2" />
        <span>Loading Analytics Engine...</span>
      </div>
    );
  }

  const maxRevenue = Math.max(
    ...(stats?.salesChart?.map((s) => s.revenue) || [1000])
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sales Analytics & Insights</h1>
          <p className="text-slate-500 text-sm mt-1">
            Revenue trends, product category breakdowns, and performance analytics
          </p>
        </div>
        <a
          href="/api/admin/export?type=products"
          download
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition"
        >
          <Download className="w-4 h-4" />
          Export Product Catalog CSV
        </a>
      </div>

      {/* Revenue Trend Chart Visual */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="font-bold text-slate-900 text-lg">Revenue Trend</h2>
            <p className="text-xs text-slate-400">Daily sales performance over recent period</p>
          </div>
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> ₹{stats?.totalRevenue || 0} Total
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="pt-4 pb-2">
          <div className="h-64 flex items-end gap-4 sm:gap-8 justify-between border-b border-slate-200 pb-2">
            {stats?.salesChart && stats.salesChart.length > 0 ? (
              stats.salesChart.map((bar, idx) => {
                const heightPercent = maxRevenue > 0 ? (bar.revenue / maxRevenue) * 100 : 10;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <span className="text-[10px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition">
                      ₹{bar.revenue}
                    </span>
                    <div
                      style={{ height: `${Math.max(heightPercent, 8)}%` }}
                      className="w-full bg-indigo-500 group-hover:bg-indigo-600 rounded-t-xl transition-all duration-300 shadow-md shadow-indigo-500/20"
                    />
                    <span className="text-xs text-slate-500 font-semibold">{bar.date}</span>
                  </div>
                );
              })
            ) : (
              <div className="w-full flex items-center justify-center text-slate-400 text-sm">
                No recent sales trends recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Breakdown & Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h2 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
            Category Performance
          </h2>
          <div className="space-y-3">
            {stats?.categoryBreakdown?.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="font-semibold text-slate-800 capitalize text-sm">{cat.category}</span>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                  {cat.count} items
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Report Exporter */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Data Reports
            </span>
            <h2 className="text-2xl font-bold mt-3">Export Analytics Reports</h2>
            <p className="text-slate-400 text-sm mt-1">
              Download clean CSV spreadsheets for accounting, inventory audits, and sales reports.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="/api/admin/export?type=orders"
              download
              className="w-full flex items-center justify-between px-4 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-sm transition"
            >
              <span>Download Full Orders Report</span>
              <Download className="w-4 h-4" />
            </a>
            <a
              href="/api/admin/export?type=customers"
              download
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-sm transition"
            >
              <span>Download Customer List</span>
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
