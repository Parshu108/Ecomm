// lib/auth-client.js
import { jwtDecode } from "jwt-decode";

export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
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
