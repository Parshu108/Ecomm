import connectDB from "@/lib/mongodb";
import Product from "@/model/product";
import { NextResponse } from "next/server";

// GET all products for admin
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, products });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// POST create product
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { name, price, description, image, category, stock, lowStockThreshold } = body;

    if (!name || !price || !description || !image) {
      return NextResponse.json(
        { success: false, message: "Name, price, description, and image are required" },
        { status: 400 }
      );
    }

    const slug = body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") + "-" + Date.now();

    const newProduct = await Product.create({
      name,
      slug,
      price: Number(price),
      description,
      image,
      category: category || "general",
      stock: Number(stock) || 10,
      lowStockThreshold: Number(lowStockThreshold) || 5,
    });

    return NextResponse.json({
      success: true,
      message: "Product created successfully ✅",
      product: newProduct,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// PUT update product
export async function PUT(req) {
  try {
    await connectDB();
    const { id, ...updates } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      message: "Product updated successfully ✅",
      product: updatedProduct,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID required" },
        { status: 400 }
      );
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully ✅",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
