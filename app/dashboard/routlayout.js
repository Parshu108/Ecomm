"use client";

import Sidebar from "../component/sidenavbar/page";
import Topbar from "../component/topbar/page";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 hidden md:block bg-white shadow-lg">
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
