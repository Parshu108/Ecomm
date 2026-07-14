// app/api/admin/example/route.js
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";

// Only "admin" and "superadmin" can access this route.
// Use requireRole("superadmin", ...) if you want to restrict to superadmin only.
export const GET = requireRole("admin", async (req, user) => {
  return NextResponse.json({
    message: `Welcome, ${user.name}`,
    role: user.role,
  });
});
