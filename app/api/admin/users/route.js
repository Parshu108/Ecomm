import connectDB from "@/lib/mongodb";
import User from "@/model/user";
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/Authhelper";

// GET all users (Superadmin only)
export const GET = requireRole("superadmin", async () => {
  try {
    await connectDB();
    const users = await User.find()
      .select("-password -verifyToken -forgetPasswordToken")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, users });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
});

// PUT update user role or status (Superadmin only)
export const PUT = requireRole("superadmin", async (req, currentUser) => {
  try {
    await connectDB();
    const { userId, role, isApproved, isVerified } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    // Prevent demoting oneself
    if (userId === currentUser.id && role && role !== "superadmin") {
      return NextResponse.json(
        { success: false, message: "Superadmin cannot demote their own account" },
        { status: 400 }
      );
    }

    const updates = {};
    if (role && ["user", "admin", "superadmin"].includes(role)) {
      updates.role = role;
    }
    if (typeof isApproved === "boolean") updates.isApproved = isApproved;
    if (typeof isVerified === "boolean") updates.isVerified = isVerified;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `User updated successfully ✅`,
      user: updatedUser,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
});
