import { updateCartQty, removeCartItem } from "@/app/controller/cart";
import connectDB from "@/lib/mongodb";

// increase / decrease quantity
// POST http://localhost:3000/api/cart/:id
export async function POST(req, { params }) {
  await connectDB();
  const { id } = await params;
  return updateCartQty(id, req);
}

// remove single item
// DELETE http://localhost:3000/api/cart/:id
export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  return removeCartItem(id);
}
