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
      <h5 className="text-sm text-gray-500 ml-8 mt-6">
        Home / <span className="text-gray-700 font-medium">Profile</span>
      </h5>

      <div className="flex min-h-screen bg-gray-100">
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1 p-6">
          <div className="mb-8">
            <h5 className="text-gray-600 text-lg">
              Hello,{" "}
              <span className="font-semibold text-gray-800">
                {session.user.name} 👋
              </span>
            </h5>

            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              Dashboard Overview
            </h2>

            <p className="text-gray-500">
              Here's what's happening with your business today.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
              <FaCartPlus className="text-3xl text-yellow-500 mb-3" />
              <h3 className="text-gray-500 text-sm">Total Sales</h3>
              <p className="text-2xl font-bold text-gray-800">$12,345</p>
              <p className="text-green-500 text-sm mt-1">+12% this week</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
              <FaUserCircle className="text-3xl text-blue-500 mb-3" />
              <h3 className="text-gray-500 text-sm">New Customers</h3>
              <p className="text-2xl font-bold text-gray-800">123</p>
              <p className="text-green-500 text-sm mt-1">+8% growth</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
              <MdLocalShipping className="text-3xl text-green-500 mb-3" />
              <h3 className="text-gray-500 text-sm">Pending Orders</h3>
              <p className="text-2xl font-bold text-gray-800">45</p>
              <p className="text-red-500 text-sm mt-1">-3% decrease</p>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Orders
              </h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">Product</th>
                    <th className="px-6 py-3 text-left">Price</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  <tr className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">Product A</td>
                    <td className="px-6 py-4">$29.99</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4">2024-06-01</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">Product B</td>
                    <td className="px-6 py-4">$49.99</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4">2024-06-02</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">Product C</td>
                    <td className="px-6 py-4">$19.99</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
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
