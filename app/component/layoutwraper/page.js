"use client";

import { useState } from "react";
import Sidebar from "../sidenavbar/page";
import Topbar from "../topbar/page";

export default function LayoutWrapper({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-50 h-full transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Topbar */}
        <Topbar setOpen={setOpen} />

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
