import { NextResponse } from "next/server";
import  connectDB  from "../../../../lib/mongodb";
import User from "../../../../model/user";

export async function POST(req) {
  try {
    await connectDB();

    const reqBody = await req.json();
    const { token } = reqBody;

    if (!token) {
      return NextResponse.json({ error: "Token is missing" }, { status: 400 });
    }

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 },
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    console.error("Verify email error:", error);
    return NextResponse.json(
      { error: "Something went wrong, please try again later" },
      { status: 500 },
    );
  }
}
