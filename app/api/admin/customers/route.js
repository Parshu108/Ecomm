import connectDB from "@/lib/mongodb";
import User from "@/model/user";
import Order from "@/model/order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 });
    const orders = await Order.find();

    const customerList = users.map((u) => {
      const userOrders = orders.filter(
        (o) =>
          o.user?.toString() === u._id.toString() ||
          o.shippingInfo?.email?.toLowerCase() === u.email.toLowerCase() ||
          o.billingInfo?.email?.toLowerCase() === u.email.toLowerCase()
      );

      const totalSpent = userOrders.reduce((sum, o) => sum + (o.total || 0), 0);

      return {
        _id: u._id,
        name: u.name,
        email: u.email,
        createdAt: u.createdAt,
        orderCount: userOrders.length,
        totalSpent,
        orders: userOrders,
      };
    });

    return NextResponse.json({ success: true, customers: customerList });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
