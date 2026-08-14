"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Settings,
  ShoppingBasket,
  LogOut,
  Crown,
} from "lucide-react";
import { getCurrentUser, logoutUser } from "@/lib/auth-client";

export default function Sidebar() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = getCurrentUser();
    setRole(user?.role || null);
    setUserName(user?.name || "");
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
    router.refresh();
  };

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
      name: "Role Controls",
      icon: Crown,
      link: "/admin/superadmin",
      roles: ["superadmin"],
    },
  ];

  const visibleMenu = menu.filter((item) => role && item.roles.includes(role));

  return (
    <aside className="w-64 h-screen bg-[#001B38] border-r border-[#95D7DE]/10 hidden lg:flex flex-col justify-between">
      <div>
        <div className="p-6 text-xl font-bold text-[#95D7DE] border-b border-[#95D7DE]/10 flex items-center justify-between">
          <span>NextEcom Admin</span>
          {role === "superadmin" && <Crown size={20} className="text-amber-400" />}
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
        </nav>
      </div>

      <div className="p-4 border-t border-[#95D7DE]/10 space-y-2">
        {userName && (
          <div className="flex items-center gap-2 p-2 text-xs font-semibold text-[#95D7DE] bg-black/40 rounded-lg">
            <User size={16} />
            <span className="truncate">{userName} ({role})</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition text-sm font-semibold"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

