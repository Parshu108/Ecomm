"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/component/sidenavbar/page";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

export default function DashboardUserPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const raw = localStorage.getItem("token");

    console.log("RAW TOKEN VALUE:", raw);

    if (!raw) {
      setStatus("unauthenticated");
      return;
    }

    let token = raw;

    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string") {
        token = parsed;
      } else if (parsed && typeof parsed === "object") {
        token = parsed.token || parsed.accessToken || parsed.jwt;
      }
    } catch {
      // raw already plain JWT string
    }

    if (!token || token.split(".").length !== 3) {
      console.error("Token is not a valid JWT after parsing:", token);
      localStorage.removeItem("token");
      setStatus("unauthenticated");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        setStatus("unauthenticated");
        return;
      }

      setUser({
        name: decoded.name,
        email: decoded.email,
        id: decoded.id || decoded._id || decoded.sub,
      });
      setStatus("authenticated");
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
      setStatus("unauthenticated");
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <div className="rounded-3xl bg-[#001B38] border border-[#95D7DE]/10 p-10 text-center">
          <p className="text-[#A0A0A0]">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <div className="rounded-3xl bg-[#001B38] border border-[#95D7DE]/10 p-10 text-center">
          <h1 className="text-2xl font-semibold text-white">Not signed in</h1>
          <p className="mt-4 text-[#A0A0A0]">
            Please sign in to view your profile.
          </p>
          <Link
            href="/router/login"
            className="mt-6 inline-flex rounded-full bg-[#95D7DE] px-6 py-3 text-black font-semibold hover:bg-[#7FC5CD]"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const { name, email, id } = user;

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl bg-[#001B38] border border-[#95D7DE]/10 p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-[#A0A0A0]">Dashboard / Profile</p>
                  <h1 className="mt-3 text-3xl font-bold text-white">
                    Hello, {name}
                  </h1>
                  <p className="mt-2 text-[#A0A0A0]">
                    This is your logged-in user data from the current session.
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"
                >
                  <BiLogOut size={18} /> Sign Out
                </button>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-[#95D7DE]/10 bg-black p-6">
                  <p className="text-sm text-[#A0A0A0]">Full Name</p>
                  <p className="mt-3 text-xl font-semibold text-white">
                    {name}
                  </p>
                </div>
                <div className="rounded-3xl border border-[#95D7DE]/10 bg-black p-6">
                  <p className="text-sm text-[#A0A0A0]">Email Address</p>
                  <p className="mt-3 text-xl font-semibold text-white">
                    {email}
                  </p>
                </div>
                <div className="rounded-3xl border border-[#95D7DE]/10 bg-black p-6 sm:col-span-2">
                  <p className="text-sm text-[#A0A0A0]">User ID</p>
                  <p className="mt-3 text-xl font-semibold text-white">{id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
