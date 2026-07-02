"use client";

import Link from "next/link";
import { LayoutDashboard, User, Settings, ShoppingBasket } from "lucide-react";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, link: "/dashboard" },
    { name: "Profile", icon: User, link: "/dashboard/user" },
    { name: "AddProduct", icon: Settings, link: "/dashboard/newproduct" },
    { name: "Order", icon: ShoppingBasket, link: "/dashboard/order" },
    { name: "Logout", icon: Settings, link: "/router/login" },
  ];

  return (
    <aside className="w-64 h-screen bg-[#001B38] border-r border-[#95D7DE]/10 hidden lg:block">
      <div className="p-6 text-xl font-bold text-[#95D7DE] border-b border-[#95D7DE]/10">
        MyApp
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              key={i}
              href={item.link}
              className="flex items-center gap-3 p-3 rounded-lg text-[#A0A0A0] hover:bg-black hover:text-[#95D7DE] transition"
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
