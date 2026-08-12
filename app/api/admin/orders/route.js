import connectDB from "@/lib/mongodb";
import Order from "@/model/order";
import { sendOrderEmail } from "@/lib/email";
import { NextResponse } from "next/server";

// GET all orders
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query = status && status !== "all" ? { status } : {};
    const orders = await Order.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// PUT update order status & send email notification
export async function PUT(req) {
  try {
    await connectDB();
    const { orderId, status, returnStatus } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID required" },
        { status: 400 }
      );
    }

    const updates = {};
    if (status) updates.status = status;
    if (returnStatus) updates.returnStatus = returnStatus;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, {
      new: true,
    });

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // Send email notification to customer if email is present
    const customerEmail =
      updatedOrder.shippingInfo?.email ||
      updatedOrder.billingInfo?.email;

    if (customerEmail && status) {
      await sendOrderEmail({
        to: customerEmail,
        subject: `Order Update: Your Order #${updatedOrder._id} is now ${status.toUpperCase()}`,
        order: updatedOrder,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Order status updated to ${status || returnStatus} ✅`,
      order: updatedOrder,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
