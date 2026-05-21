import cart from "../../model/cart";
import { NextResponse } from "next/server";

// add item to cart
export const addTocart = async (req) => {
  const body = await req.json();
  const newCart = await cart.create(body);

  return NextResponse.json(newCart, {
    message: "cart sucessfully Created..",
    success: true,
  });
};

// get item to cart

export const getCart = async (req) => {
  const CartItems = await cart.find();
  return NextResponse.json(CartItems, {
    message: "fetch all getItems...",
    success: true,
  });
};

// delete cart

export const clearCart = async (req) => {
  await cart.deleteMany({});
  return NextResponse.json({
    message: "cartitem Cleared...",
    success: true,
  });
};
