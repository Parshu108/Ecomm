import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../../../lib/mongodb";
import User from "@/model/user";
import { sendEmail } from "../../../../lib/helper";

export async function POST(req) {
  try {
    await connectDB();

    const reqBody = await req.json();
    const { name, email, password,  } = reqBody;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Please provide name, email and password" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    // don't leak the password hash back to the client
    const { password: _pw } = savedUser.toObject();

    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        user: savedUser,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Something went wrong, please try again later" },
      { status: 500 },
    );
  }
}
