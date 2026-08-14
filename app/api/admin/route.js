import connectDB from "@/lib/mongodb";
import User from "@/model/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/Authhelper";

export const POST = requireRole("superadmin", async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Account with this email already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role && ["admin", "superadmin", "user"].includes(role) ? role : "admin",
      isVerified: true,
    });

    const userObj = newUser.toObject();
    delete userObj.password;

    return NextResponse.json({
      message: "Admin user created successfully ✅",
      data: userObj,
    });
  } catch (error) {
    console.error("Admin user creation error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
});

