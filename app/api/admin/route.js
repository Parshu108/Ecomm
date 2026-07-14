import connectDB from "@/lib/mongodb";
import admin from "@/model/user";
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const newUser = await admin.create({
      firstName: body.firstName,
      email: body.email,
      password: body.password,
    });

    return Response.json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
