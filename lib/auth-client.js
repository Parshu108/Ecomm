// lib/auth-client.js
import { jwtDecode } from "jwt-decode";

function getCookieToken() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
  return match ? match[2] : null;
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  let token = localStorage.getItem("token");
  if (!token) {
    token = getCookieToken();
    if (token) {
      localStorage.setItem("token", token);
    }
  }

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return decoded; // { id, email, name, role, exp, iat }
  } catch {
    localStorage.removeItem("token");
    return null;
  }
}

export function setAuthToken(token) {
  if (typeof window !== "undefined" && token) {
    localStorage.setItem("token", token);
  }
}

export async function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    try {
      await fetch("/api/users/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout API call error:", err);
    }
  }
}

