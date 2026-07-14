import { NextResponse } from "next/server";
import connectDB  from "../../../../lib/mongodb";
import {getUserFromRequest}  from "../../../../lib/Authhelper";
import User from "../../../../model/user";

export async function GET(req) {
  try {
    await connectDB();

    // Reads + verifies the "token" cookie, throws if missing/invalid
    const decoded = getUserFromRequest(req);

    // Fetch fresh data from DB (not just what's in the token) so info
    // like role/name is always up to date, and password is excluded.
    const user = await User.findById(decoded.id).select(
      "-password -verifyToken -verifyTokenExpiry -forgetPasswordToken -forgetPasswordTokenExpiry",
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Not authenticated" },
      { status: 401 },
    );
  }
}
