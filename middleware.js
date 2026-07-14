// proxy.js  ← root mein (app ke bahar, next.config.mjs ke saath)
// import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default function middleware(req) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const publicPaths = ["/router/login", "/router/register"];
  const publicApiPaths = ["/api/auth", "/api/register"];

  const isPublic = publicPaths.some((p) => pathname.startsWith(p));
  const isPublicApi = publicApiPaths.some((p) => pathname.startsWith(p));

  if (isPublicApi) {
    return NextResponse.next();
  }

  // if (!isLoggedIn && !isPublic) {
  //   return NextResponse.redirect(new URL("/router/login", req.url));
  // }

  if (isLoggedIn && isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/users/signup|images).*)",
  ],
};
