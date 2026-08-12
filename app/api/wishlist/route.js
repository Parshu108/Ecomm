import connectDB from "@/lib/mongodb";
import User from "@/model/user";
import Product from "@/model/product";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ success: true, wishlist: [] });
    }

    const user = await User.findById(userId).populate("wishlist");
    return NextResponse.json({
      success: true,
      wishlist: user?.wishlist || [],
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { success: false, message: "User ID and Product ID required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const exists = user.wishlist?.some((id) => id.toString() === productId);
    if (exists) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
      await user.save();
      return NextResponse.json({
        success: true,
        message: "Removed from wishlist 🤍",
        added: false,
      });
    } else {
      user.wishlist.push(productId);
      await user.save();
      return NextResponse.json({
        success: true,
        message: "Added to wishlist ❤️",
        added: true,
      });
    }
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
