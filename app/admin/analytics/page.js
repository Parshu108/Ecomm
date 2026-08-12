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
      <div className="flex items-center justify-center min-h-[400px] text-muted-foreground bg-background">
        <RefreshCw className="w-6 h-6 animate-spin text-primary mr-2" />
        <span>Loading Analytics Engine...</span>
      </div>
    );
  }

  const maxRevenue = Math.max(
    ...(stats?.salesChart?.map((s) => s.revenue) || [1000])
  );

  return (
    <div className="space-y-8 bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-6 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sales Analytics & Insights</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Revenue trends, product category breakdowns, and performance analytics
          </p>
        </div>
        
         <a href="/api/admin/export?type=products"
          download
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl text-sm font-semibold transition border border-border"
        >
          <Download className="w-4 h-4" />
          Export Product Catalog CSV
        </a>
      </div>

      {/* Revenue Trend Chart Visual */}
      <div className="bg-card p-6 rounded-2xl shadow-sm border border-border space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="font-bold text-foreground text-lg">Revenue Trend</h2>
            <p className="text-xs text-muted-foreground">Daily sales performance over recent period</p>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> ₹{stats?.totalRevenue || 0} Total
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="pt-4 pb-2">
          <div className="h-64 flex items-end gap-4 sm:gap-8 justify-between border-b border-border pb-2">
            {stats?.salesChart && stats.salesChart.length > 0 ? (
              stats.salesChart.map((bar, idx) => {
                const heightPercent = maxRevenue > 0 ? (bar.revenue / maxRevenue) * 100 : 10;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition">
                      ₹{bar.revenue}
                    </span>
                    <div
                      style={{ height: `${Math.max(heightPercent, 8)}%` }}
                      className="w-full bg-primary/80 group-hover:bg-primary rounded-t-xl transition-all duration-300 shadow-md shadow-primary/20"
                    />
                    <span className="text-xs text-muted-foreground font-semibold">{bar.date}</span>
                  </div>
                );
              })
            ) : (
              <div className="w-full flex items-center justify-center text-muted-foreground text-sm">
                No recent sales trends recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Breakdown & Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border space-y-4">
          <h2 className="font-bold text-foreground text-lg border-b border-border pb-3">
            Category Performance
          </h2>
          <div className="space-y-3">
            {stats?.categoryBreakdown?.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-secondary/40 rounded-xl">
                <span className="font-semibold text-foreground capitalize text-sm">{cat.category}</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                  {cat.count} items
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Report Exporter */}
        <div className="bg-secondary text-foreground p-6 rounded-2xl shadow-xl border border-border flex flex-col justify-between space-y-6">
          <div>
            <span className="bg-primary/15 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Data Reports
            </span>
            <h2 className="text-2xl font-bold mt-3 text-foreground">Export Analytics Reports</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Download clean CSV spreadsheets for accounting, inventory audits, and sales reports.
            </p>
          </div>

          <div className="space-y-3">
            
             <a href="/api/admin/export?type=orders"
              download
              className="w-full flex items-center justify-between px-4 py-3 bg-primary hover:opacity-90 text-primary-foreground rounded-xl font-bold text-sm transition"
            >
              <span>Download Full Orders Report</span>
              <Download className="w-4 h-4" />
            </a>
            
             <a href="/api/admin/export?type=customers"
              download
              className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-card/70 border border-border rounded-xl font-bold text-sm transition text-foreground"
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