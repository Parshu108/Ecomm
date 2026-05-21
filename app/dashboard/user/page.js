"use client";

import { useSession, signOut } from "next-auth/react";
import Sidebar from "@/app/component/sidenavbar/page";
import { BiLogOut } from "react-icons/bi";

export default function DashboardUserPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="rounded-3xl bg-white p-10 shadow-lg text-center">
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="rounded-3xl bg-white p-10 shadow-lg text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Not signed in</h1>
          <p className="mt-4 text-gray-600">Please sign in to view your profile.</p>
          <a
            href="/router/login"
            className="mt-6 inline-flex rounded-full bg-yellow-500 px-6 py-3 text-white font-semibold hover:bg-yellow-600"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const { name, email, id } = session.user;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-gray-500">Dashboard / Profile</p>
                  <h1 className="mt-3 text-3xl font-bold text-gray-900">Hello, {name}</h1>
                  <p className="mt-2 text-gray-600">This is your logged-in user data from the current session.</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"
                >
                  <BiLogOut size={18} /> Sign Out
                </button>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="mt-3 text-xl font-semibold text-gray-900">{name}</p>
                </div>
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="mt-3 text-xl font-semibold text-gray-900">{email}</p>
                </div>
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:col-span-2">
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="mt-3 text-xl font-semibold text-gray-900">{id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
