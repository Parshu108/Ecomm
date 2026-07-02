import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const name = formData.get("name");
    const brand = formData.get("brand");
    const price = formData.get("price");
    const category = formData.get("category");
    const description = formData.get("description");
    const image = formData.get("image"); // File | null

    let imageUrl = null;

    if (image && typeof image !== "string" && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // sanitize + uniquify filename
      const ext = path.extname(image.name) || ".jpg";
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}${ext}`;

      const uploadDir = path.join(process.cwd(), "public", "store");
      await mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);

      imageUrl = `/store/${fileName}`; // public URL path
    }

    const product = await Product.create({
      name,
      brand,
      price: Number(price),
      category,
      description,
      imageUrl,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
