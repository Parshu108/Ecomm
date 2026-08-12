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
    const timer = setTimeout(() => {
      const user = getCurrentUser();
      setRole(user?.role || null);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      link: "/admin",
      roles: ["admin", "superadmin"],
    },
    {
      name: "Products",
      icon: Settings,
      link: "/admin/products",
      roles: ["admin", "superadmin"],
    },
    {
      name: "Orders",
      icon: ShoppingBasket,
      link: "/admin/orders",
      roles: ["user", "admin", "superadmin"],
    },
    {
      name: "Logout",
      icon: LogOut,
      link: "/login",
      roles: ["user", "admin", "superadmin"],
    },
  ];

  const visibleMenu = menu.filter((item) => role && item.roles.includes(role));

  return (
    <aside className="w-64 h-screen bg-[#001B38] border-r border-[#95D7DE]/10 hidden lg:block">
      <div className="p-6 text-xl font-bold text-[#95D7DE] border-b border-[#95D7DE]/10">
        NextEcom Admin
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
              <User size={18} />
              Admin
            </span>
          </div>
        )}
      </nav>
    </aside>
  );
}
