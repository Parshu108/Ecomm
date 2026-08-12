import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    razorpay_order_id: String,
    razorpay_payment_id: String,
    paymentMethod: {
      type: String,
      enum: ["razorpay", "cod"],
      default: "razorpay",
    },
    items: Array,
    billingInfo: Object,
    shippingInfo: Object,
    subtotal: Number,
    discountAmount: {
      type: Number,
      default: 0,
    },
    couponCode: String,
    taxAmount: {
      type: Number,
      default: 0,
    },
    shippingAmount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    returnStatus: {
      type: String,
      enum: ["none", "requested", "approved", "rejected"],
      default: "none",
    },
    returnReason: String,
  },
  { timestamps: true },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
