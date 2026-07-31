import { NextResponse } from "next/server";
import product from "../model/product";

export const creatproduct = async (req) => {
  const body = await req.json();
  const newProduct = await product.create(body);
  // Return a structured JSON body and proper status
  return NextResponse.json(
    {
      success: true,
      message: "Product created successfully",
      product: newProduct,
    },
    { status: 201 },
  );
};

export const getproduct = async () => {
  const products = await product.find();
  // Return products wrapped in an object so client can rely on a consistent shape
  return NextResponse.json(
    { success: true, message: "All products fetched", products },
    { status: 200 },
  );
};
