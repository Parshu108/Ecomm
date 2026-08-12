import connectDB from "@/lib/mongodb";
import Review from "@/model/review";
import Product from "@/model/product";
import { NextResponse } from "next/server";

// GET reviews for a product or all reviews for admin moderation
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const filter = productId ? { product: productId, isApproved: true } : {};
    const reviews = await Review.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, reviews });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// POST submit a review
export async function POST(req) {
  try {
    await connectDB();
    const { productId, rating, comment, userName, userEmail } = await req.json();

    if (!productId || !rating || !comment || !userName) {
      return NextResponse.json(
        { success: false, message: "Product, rating, comment and user name are required" },
        { status: 400 }
      );
    }

    const review = await Review.create({
      product: productId,
      user: "660000000000000000000000", // Default guest user ID if unauthenticated
      userName,
      userEmail,
      rating: Number(rating),
      comment,
      isApproved: true,
    });

    // Update Product average rating & numReviews
    const allProductReviews = await Review.find({ product: productId, isApproved: true });
    const avgRating =
      allProductReviews.reduce((sum, r) => sum + r.rating, 0) /
      (allProductReviews.length || 1);

    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(avgRating * 10) / 10,
      numReviews: allProductReviews.length,
    });

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully! ⭐",
      review,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// PUT moderation (approve/reject review)
export async function PUT(req) {
  try {
    await connectDB();
    const { reviewId, isApproved } = await req.json();

    const updated = await Review.findByIdAndUpdate(
      reviewId,
      { isApproved },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Review moderation status updated ✅",
      review: updated,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// DELETE review
export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Review.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Review deleted ✅" });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
