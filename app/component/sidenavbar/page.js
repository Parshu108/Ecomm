"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Settings,
  ShoppingBasket,
  LogOut,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth-client";

export default function Sidebar() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setRole(user?.role || null);
  }, []);

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      link: "/dashboard",
      roles: ["admin"],
    },
    {
      name: "Profile",
      icon: User,
      link: "/dashboard/user",
      roles: ["user", "admin"],
    },
    {
      name: "Add Product",
      icon: Settings,
      link: "/dashboard/newproduct",
      roles: ["user", "admin"],
    },
    {
      name: "Order",
      icon: ShoppingBasket,
      link: "/dashboard/order",
      roles: ["user", "admin"], // "user" add kiya, taaki wo apna order status dekh sake
    },
    {
      name: "Logout",
      icon: LogOut,
      link: "/router/login",
      roles: ["user", "admin"],
    },
  ];

  // Sirf current role ke allowed links hi dikhao
  const visibleMenu = menu.filter((item) => role && item.roles.includes(role));

  return (
    <aside className="w-64 h-screen bg-[#001B38] border-r border-[#95D7DE]/10 hidden lg:block">
      <div className="p-6 text-xl font-bold text-[#95D7DE] border-b border-[#95D7DE]/10">
        MyApp
      </div>

      <nav className="p-4 space-y-2">
        {visibleMenu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.link}
              href={item.link}
              className="flex items-center gap-3 p-3 rounded-lg text-[#A0A0A0] hover:bg-black hover:text-[#95D7DE] transition"
            >
              <Icon size={18} />
              {item.name}
            </Link>
            
          );
        })}

        {role === "admin" && (
          <div className="mt-35 pt-4 border-t border-[#95D7DE]/10 w-60">
            <span className="flex items-center gap-3 p-3 w-50 rounded-lg text-[#A0A0A0] hover:bg-black hover:text-[#95D7DE] transition">
              <User size={18}/>
              Admin
            </span>
          </div>
        )}
      </nav>
    </aside>
  );
}
