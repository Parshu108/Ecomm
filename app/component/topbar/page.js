"use client";

import { Menu, Bell, UserCircle } from "lucide-react";

export default function Topbar({ setOpen }) {
  return (
    <div className="w-full h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 lg:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold text-gray-700">Dashboard</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer text-gray-600" />
        <UserCircle className="cursor-pointer text-gray-600" />
      </div>
    </div>
  );
}
