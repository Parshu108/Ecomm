
import { NextResponse } from "next/server";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const decoded = JSON.parse(jsonPayload);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null; // Expired
    }
    return decoded;
  } catch {
    return null;
  }
}

export default function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const user = token ? parseJwt(token) : null;
  const isLoggedIn = !!user;
  const userRole = user?.role || "user";

  const publicAuthPaths = ["/login", "/register"];
  const isAdminRoute = pathname.startsWith("/admin");
  const isSuperAdminRoute = pathname.startsWith("/admin/superadmin");
  const isPublicAuth = publicAuthPaths.some((path) => pathname.startsWith(path));

  // 1. Logged in users trying to visit /login or /register
  if (isLoggedIn && isPublicAuth) {
    if (userRole === "admin" || userRole === "superadmin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2. Accessing Superadmin-only routes
  if (isSuperAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url));
    }
    if (userRole !== "superadmin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // 3. Accessing Admin routes (/admin, /admin/*)
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url));
    }
    if (userRole !== "admin" && userRole !== "superadmin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/users/signup|images).*)",
  ],
};

