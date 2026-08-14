import connectDB from "@/lib/mongodb";
import Product from "@/model/product";
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/Authhelper";

export const POST = requireRole("admin", async (req) => {
  try {
    await connectDB();
    const { products } = await req.json();

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { success: false, message: "No product data provided" },
        { status: 400 }
      );
    }

    const created = [];
    for (const p of products) {
      if (!p.name || !p.price) continue;
      const slug = (p.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
      const newP = await Product.create({
        name: p.name,
        slug,
        price: Number(p.price) || 0,
        description: p.description || "Uploaded product",
        image: p.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        category: p.category || "general",
        stock: Number(p.stock) || 15,
      });
      created.push(newP);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${created.length} products! 🚀`,
      count: created.length,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
});

