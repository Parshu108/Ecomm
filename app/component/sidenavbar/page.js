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
    <aside className="w-64 h-screen bg-white border-r shadow-sm hidden lg:block">
      <div className="p-6 text-xl font-bold text-yellow-500 border-b">
        MyApp
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              key={i}
              href={item.link}
              className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-yellow-50 hover:text-yellow-500 transition"
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
