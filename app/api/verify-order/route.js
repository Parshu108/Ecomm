// app/api/verify-order/route.js
export const runtime = "nodejs";

import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import Order from "@/model/order"; // create this model

export async function POST(request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      billingInfo,
      shippingInfo,
      total,
    } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return Response.json(
        { success: false, error: "Invalid signature" },
        { status: 400 },
      );
    }

    // ✅ Save order to DB after verification
    await connectDB();
    await Order.create({
      razorpay_order_id,
      razorpay_payment_id,
      items,
      billingInfo,
      shippingInfo,
      total,
      status: "paid",
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
      message: "Payment verified and order saved",
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
