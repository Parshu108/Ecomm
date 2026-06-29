import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  razorpay_order_id: String,
  razorpay_payment_id: String,
  items: Array,
  billingInfo: Object,
  shippingInfo: Object,
  total: Number,
  status: { type: String, default: "paid" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
