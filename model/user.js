import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    // seller ke liye extra fields
    shopName: { type: String },
    isApproved: { type: Boolean, default: false }, // superadmin approve karega
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
