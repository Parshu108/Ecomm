// app/model/cart.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  image: String,
  qty: { type: Number, default: 1 },
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
