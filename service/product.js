import { NextResponse } from "next/server";
import product from "../model/product";

export const creatproduct = async (req) => {
  const body = await req.json();
  const newProduct = await product.create(body);
  return NextResponse.json(newProduct, {
    message: "Product created successfully",
  });
};

export const getproduct = async () => {
  const products = await product.find();
  return NextResponse.json(products, { message: "All Product Fetched..." });
};
