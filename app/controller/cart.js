import cart from "../../model/cart";
import { NextResponse } from "next/server";

// add item to cart
export const addTocart = async (req) => {
  const body = await req.json();
  const { name } = body;

  // check if this product already exists in the cart
  const existing = await cart.findOne({ name });

  if (existing) {
    return NextResponse.json(
      { message: "Product already added to cart", success: false },
      { status: 409 },
    );
  }

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


// ✅ update quantity (increase / decrease) for a single item
export const updateCartQty = async (id, req) => {
  const { action } = await req.json();

  const item = await cart.findById(id);
  if (!item) {
    return NextResponse.json(
      { message: "Cart item not found", success: false },
      { status: 404 },
    );
  }

  const currentQty = item.qty || 1;

  if (action === "increase") {
    item.qty = currentQty + 1;
  } else if (action === "decrease") {
    item.qty = Math.max(1, currentQty - 1);
  }

  await item.save();

  return NextResponse.json(item, {
    message: "Quantity updated",
    success: true,
  });
};

// ✅ remove a single item from cart
export const removeCartItem = async (id) => {
  const deleted = await cart.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json(
      { message: "Cart item not found", success: false },
      { status: 404 },
    );
  }

  return NextResponse.json(
    { message: "Item removed from cart", success: true },
    { status: 200 },
  );
};