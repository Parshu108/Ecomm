import connectDB from "@/lib/mongodb";
import Order from "@/model/order";
import Product from "@/model/product";
import User from "@/model/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "orders";

    let csvContent = "";
    let filename = `report_${type}_${Date.now()}.csv`;

    if (type === "orders") {
      const orders = await Order.find().sort({ createdAt: -1 });
      csvContent = "Order ID,Customer Email,Status,Payment Method,Total (INR),Created At\n";
      orders.forEach((o) => {
        const email = o.shippingInfo?.email || o.billingInfo?.email || "Guest";
        csvContent += `"${o._id}","${email}","${o.status}","${o.paymentMethod || "razorpay"}",${o.total},"${new Date(o.createdAt).toLocaleString()}"\n`;
      });
    } else if (type === "products") {
      const products = await Product.find().sort({ name: 1 });
      csvContent = "Product Name,Category,Price (INR),Stock,Rating,Created At\n";
      products.forEach((p) => {
        csvContent += `"${p.name}","${p.category || "general"}",${p.price},${p.stock || 0},${p.rating || 4.5},"${new Date(p.createdAt).toLocaleString()}"\n`;
      });
    } else if (type === "customers") {
      const users = await User.find({ role: "user" }).select("-password");
      csvContent = "Customer Name,Email,Role,Registered At\n";
      users.forEach((u) => {
        csvContent += `"${u.name}","${u.email}","${u.role}","${new Date(u.createdAt).toLocaleString()}"\n`;
      });
    }

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
