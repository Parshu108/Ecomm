"use client";

import { Menu, Bell, UserCircle } from "lucide-react";

export default function Topbar({ setOpen }) {
  return (
    <div className="w-full h-16 bg-[#001B38] border-b border-[#95D7DE]/10 flex items-center justify-between px-4 lg:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="lg:hidden p-2 rounded-md hover:bg-black"
        >
          <Menu size={20} className="text-[#95D7DE]" />
        </button>

        <h1 className="text-lg font-semibold text-white">Dashboard</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer text-[#A0A0A0] hover:text-[#95D7DE] transition-colors" />
        <UserCircle className="cursor-pointer text-[#A0A0A0] hover:text-[#95D7DE] transition-colors" />
      </div>
    </div>
  );
}
