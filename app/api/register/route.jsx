import connectDB from "@/lib/mongodb";
import User from "@/model/user";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { firstName, email, password } = await req.json();

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: firstName,
      email,
      password: hashedPassword,
    });

    return Response.json({
      message: "User registered",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
