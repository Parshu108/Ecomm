"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  MessageSquare,
  BarChart3,
  Upload,
  Download,
  ShieldAlert,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Coupons", href: "/admin/coupons", icon: Tag },
  { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  { name: "Bulk Import", href: "/admin/bulk-upload", icon: Upload },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      {/* Mobile Top Navbar */}
      <div className="md:hidden bg-card text-foreground p-4 flex items-center justify-between border-b border-border shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-primary w-6 h-6" />
          <span className="font-bold text-lg tracking-wide">
            NextEcom Admin
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-card text-muted-foreground flex-shrink-0 min-h-screen p-5 flex flex-col justify-between border-r border-border`}
      >
        <div>
          {/* Logo Brand */}
          <div className="hidden md:flex items-center gap-3 pb-6 border-b border-border">
            <div className="bg-primary p-2 rounded-xl text-primary-foreground shadow-lg shadow-primary/30">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-foreground text-lg tracking-tight">
                NextEcom
              </h1>
              <p className="text-xs text-primary font-medium">
                Control Center v2.0
              </p>
            </div>
          </div>

          {/* Nav List */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Link back to store */}
        <div className="pt-6 border-t border-border mt-6">
          <Link
            href="/shop"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Live Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}
