"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "../component/sidenavbar/page";
import { FaCartPlus } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/router/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return null;

  return (
    <>
      <h5 className="text-sm text-[#A0A0A0] ml-8 mt-6">
        Home / <span className="text-white font-medium">Profile</span>
      </h5>

      <div className="flex min-h-screen bg-black">
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1 p-6">
          <div className="mb-8">
            <h5 className="text-[#A0A0A0] text-lg">
              Hello,{" "}
              <span className="font-semibold text-white">
                {session.user.name} 👋
              </span>
            </h5>

            <h2 className="text-3xl font-bold text-white mt-1">
              Dashboard Overview
            </h2>

            <p className="text-[#A0A0A0]">
              Heres whats happening with your business today.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-[#001B38] border border-[#95D7DE]/10 p-6 rounded-xl hover:border-[#95D7DE]/30 transition">
              <FaCartPlus className="text-3xl text-[#95D7DE] mb-3" />
              <h3 className="text-[#A0A0A0] text-sm">Total Sales</h3>
              <p className="text-2xl font-bold text-white">$12,345</p>
              <p className="text-green-400 text-sm mt-1">+12% this week</p>
            </div>

            <div className="bg-[#001B38] border border-[#95D7DE]/10 p-6 rounded-xl hover:border-[#95D7DE]/30 transition">
              <FaUserCircle className="text-3xl text-[#95D7DE] mb-3" />
              <h3 className="text-[#A0A0A0] text-sm">New Customers</h3>
              <p className="text-2xl font-bold text-white">123</p>
              <p className="text-green-400 text-sm mt-1">+8% growth</p>
            </div>

            <div className="bg-[#001B38] border border-[#95D7DE]/10 p-6 rounded-xl hover:border-[#95D7DE]/30 transition">
              <MdLocalShipping className="text-3xl text-[#95D7DE] mb-3" />
              <h3 className="text-[#A0A0A0] text-sm">Pending Orders</h3>
              <p className="text-2xl font-bold text-white">45</p>
              <p className="text-red-400 text-sm mt-1">-3% decrease</p>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-[#001B38] border border-[#95D7DE]/10 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-[#95D7DE]/10 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">
                Recent Orders
              </h3>
              <button className="bg-[#95D7DE] text-black px-4 py-2 rounded-lg hover:bg-[#7FC5CD] text-sm font-medium transition-colors">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-[#A0A0A0]">
                <thead className="bg-black text-[#A0A0A0] uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">Product</th>
                    <th className="px-6 py-3 text-left">Price</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#95D7DE]/10">
                  <tr className="hover:bg-black/40 transition">
                    <td className="px-6 py-4 text-white">Product A</td>
                    <td className="px-6 py-4">$29.99</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-green-400/10 text-green-400">
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4">2024-06-01</td>
                  </tr>
                  <tr className="hover:bg-black/40 transition">
                    <td className="px-6 py-4 text-white">Product B</td>
                    <td className="px-6 py-4">$49.99</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-yellow-400/10 text-yellow-400">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4">2024-06-02</td>
                  </tr>
                  <tr className="hover:bg-black/40 transition">
                    <td className="px-6 py-4 text-white">Product C</td>
                    <td className="px-6 py-4">$19.99</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-red-400/10 text-red-400">
                        Cancelled
                      </span>
                    </td>
                    <td className="px-6 py-4">2024-06-03</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
