"use client";

import Sidebar from "../component/sidenavbar/page";
import Topbar from "../component/topbar/page";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <div className="w-64 hidden md:block bg-[#001B38] border-r border-[#95D7DE]/10">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="flex-1 lg:ml-64">
        <Topbar setOpen={setOpen} />
        {children}
      </div>
    </div>
  );
}
