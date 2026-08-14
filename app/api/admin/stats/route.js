import connectDB from "@/lib/mongodb";
import Order from "@/model/order";
import Product from "@/model/product";
import User from "@/model/user";
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/Authhelper";

export const GET = requireRole("admin", async () => {
  try {
    await connectDB();

    const totalOrders = await Order.countDocuments();
    const orders = await Order.find().sort({ createdAt: -1 });

    const totalRevenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);
    const pendingShipments = orders.filter(
      (o) => o.status === "pending" || o.status === "processing"
    ).length;

    const totalCustomers = await User.countDocuments({ role: "user" });
    const products = await Product.find();

    const lowStockProducts = products.filter(
      (p) => (p.stock || 0) <= (p.lowStockThreshold || 5)
    );

    // Sales over time (group by date)
    const salesByDateMap = {};
    orders.forEach((o) => {
      const dateStr = new Date(o.createdAt || Date.now()).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      salesByDateMap[dateStr] = (salesByDateMap[dateStr] || 0) + (o.total || 0);
    });

    const salesChart = Object.keys(salesByDateMap)
      .slice(-7)
      .map((date) => ({
        date,
        revenue: salesByDateMap[date],
      }));

    // Category performance
    const categoryMap = {};
    products.forEach((p) => {
      const cat = p.category || "General";
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    const categoryBreakdown = Object.keys(categoryMap).map((cat) => ({
      category: cat,
      count: categoryMap[cat],
    }));

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        pendingShipments,
        totalCustomers,
        lowStockCount: lowStockProducts.length,
        lowStockProducts,
        recentOrders: orders.slice(0, 5),
        salesChart,
        categoryBreakdown,
      },
    });
  } catch (err) {
    console.error("GET /api/admin/stats error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch stats" },
      { status: 500 }
    );
  }
});

