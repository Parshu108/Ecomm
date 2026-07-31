import connectDB from "@/lib/mongodb";
import { creatproduct, getproduct } from "@/service/product";
import { NextResponse } from "next/server";

// ✅ GET all products
export async function GET(req) {
  try {
    await connectDB();
    return await getproduct(req);
  } catch (err) {
    console.error("GET /api/electroproduct error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// ✅ CREATE product
export async function POST(req) {
  try {
    await connectDB();
    return await creatproduct(req);
  } catch (err) {
    console.error("POST /api/electroproduct error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to create product" },
      { status: 500 },
    );
  }
}
