import connectDB from "../../../lib/mongodb";
import User from "../../../model/user";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { firstName, email, password, role, shopName } = await req.json();

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ sirf 'user' aur 'seller' frontend se allow karo, superadmin kabhi public signup se nahi banta
    const allowedRoles = ["user", "seller"];
    const finalRole = allowedRoles.includes(role) ? role : "user";

    const user = await User.create({
      name: firstName,
      email: email,
      password: hashedPassword,
      role: finalRole,
      ...(finalRole === "seller" && {
        shopName: shopName || "",
        isApproved: false, // seller superadmin approve hone tak pending rahega
      }),
    });

    return Response.json({
      message:
        finalRole === "seller"
          ? "Seller registered. Waiting for admin approval."
          : "User registered",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
