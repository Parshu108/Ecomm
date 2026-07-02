import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../model/user";
import bcrypt from "bcryptjs"; // ✅ bcrypt ki jagah bcryptjs use karo

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    console.log("📧 Email received:", email); // debug

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 },
      );
    }

    await connectDB();
    console.log("✅ DB Connected"); // debug

    const user = await User.findOne({ email });
    console.log("👤 User found:", user ? "YES" : "NO"); // debug

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    console.log("🔐 Password valid:", isValid); // debug

    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({
      id: user._id.toString(),
      email: user.email,
      name: user.firstName,
      role: user.role, // 👈 add kiya
    });
  } catch (error) {
    console.error("❌ Verify error:", error.message); // debug
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
