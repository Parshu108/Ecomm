// lib/auth.js
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

/**
 * Reads the "token" cookie from the request, verifies it, and returns the
 * decoded payload ({ id, email, name, role }) or throws if invalid/missing.
 */
export function getUserFromRequest(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}

/**
 * Role hierarchy — higher number = more access.
 * "admin" access also allows "superadmin" (since superadmin outranks admin).
 */
const ROLE_LEVELS = {
  user: 0,
  admin: 1,
  superadmin: 2,
};

/**
 * Wraps an API route handler and enforces a minimum role.
 *
 * Usage:
 *   export const GET = requireRole("admin", async (req, user) => {
 *     return NextResponse.json({ message: `Hello ${user.name}` });
 *   });
 */
export function requireRole(minRole, handler) {
  return async (req, ctx) => {
    try {
      const user = getUserFromRequest(req);

      const userLevel = ROLE_LEVELS[user.role] ?? -1;
      const requiredLevel = ROLE_LEVELS[minRole] ?? Infinity;

      if (userLevel < requiredLevel) {
        return NextResponse.json(
          { error: "You do not have permission to access this resource" },
          { status: 403 },
        );
      }

      return handler(req, user, ctx);
    } catch (err) {
      return NextResponse.json(
        { error: err.message || "Unauthorized" },
        { status: 401 },
      );
    }
  };
}
