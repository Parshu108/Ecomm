"use client";

import { useSession, signOut } from "next-auth/react";
import Sidebar from "@/app/component/sidenavbar/page";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";

export default function DashboardUserPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <div className="rounded-3xl bg-[#001B38] border border-[#95D7DE]/10 p-10 text-center">
          <p className="text-[#A0A0A0]">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
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

  const { name, email, id } = session.user;

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
                  onClick={() => signOut({ callbackUrl: "/" })}
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
