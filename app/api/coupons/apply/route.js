import connectDB from "@/lib/mongodb";
import Coupon from "@/model/coupon";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { code, cartSubtotal } = await req.json();

    if (!code) {
      return NextResponse.json(
        { success: false, message: "Please enter a promo code" },
        { status: 400 }
      );
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired promo code" },
        { status: 404 }
      );
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, message: "This coupon code has expired" },
        { status: 400 }
      );
    }

    if (cartSubtotal < coupon.minOrderValue) {
      return NextResponse.json(
        {
          success: false,
          message: `Minimum subtotal of ₹${coupon.minOrderValue} required for this coupon`,
        },
        { status: 400 }
      );
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = (cartSubtotal * coupon.discountValue) / 100;
      if (coupon.maxDiscountAmount && discount > coupon.maxDiscountAmount) {
        discount = coupon.maxDiscountAmount;
      }
    } else {
      discount = coupon.discountValue;
    }

    discount = Math.min(discount, cartSubtotal);

    return NextResponse.json({
      success: true,
      message: `Coupon '${coupon.code}' applied successfully! 🎉`,
      code: coupon.code,
      discount: Math.round(discount),
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
