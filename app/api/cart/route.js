import { addTocart, getCart, clearCart } from "@/service/cart";
import connectDB from "@/lib/mongodb";

// addtocart

// http://localhost:3000/api/cart
export async function POST(req) {
  await connectDB();
  return addTocart(req);
}

// getcart
export async function GET(req) {
  await connectDB();
  return getCart(req);
}

// deletecart

export async function DELETE(req) {
  await connectDB();
  return clearCart(req);
}
