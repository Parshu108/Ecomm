"use client";
import React, { useEffect, useState } from "react";
import { Users, Mail, ShoppingBag, DollarSign, RefreshCw, Calendar } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/customers");
      const data = await res.json();
      if (data.success) {
        setCustomers(data.customers || []);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Customer List & History</h1>
        <p className="text-slate-500 text-sm mt-1">
          Registered customer accounts, purchase history, and spending metrics
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin text-indigo-600 mr-2" />
            <span>Loading Customers...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-100">
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Email</th>
                  <th className="py-3.5 px-6">Total Orders</th>
                  <th className="py-3.5 px-6">Total Spent</th>
                  <th className="py-3.5 px-6 text-right">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {customers.length > 0 ? (
                  customers.map((c) => (
                    <tr key={c._id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-6 font-bold text-slate-900">{c.name}</td>
                      <td className="py-4 px-6 text-slate-600">{c.email}</td>
                      <td className="py-4 px-6 font-bold text-indigo-600">
                        {c.orderCount} orders
                      </td>
                      <td className="py-4 px-6 font-black text-slate-900">
                        ₹{c.totalSpent.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-right text-xs text-slate-400">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No customer accounts registered yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
