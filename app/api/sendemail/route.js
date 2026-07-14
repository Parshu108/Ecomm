// app/api/send-email/route.js
import { NextResponse } from "next/server";
import { sendEmail } from "../../../lib/helper";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await sendEmail(email);

    return NextResponse.json({
      message: "Email sent successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
