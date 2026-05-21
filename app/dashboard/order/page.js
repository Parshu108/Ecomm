"use client";

import Sidebar from "../../component/sidenavbar/page";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardOrderPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("lastOrder") : null;
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="flex">
          <div className="w-72 bg-white border-r border-gray-200">
            <Sidebar />
          </div>
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto rounded-3xl bg-white p-10 shadow-lg text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                No recent order found
              </h1>
              <p className="mt-4 text-gray-600">
                Your latest completed order information will appear here after a
                successful checkout.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-flex rounded-full bg-yellow-500 px-6 py-3 text-white font-semibold hover:bg-yellow-600"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="flex">
          <div className="w-72 bg-white border-r border-gray-200">
            <Sidebar />
          </div>
          <div className="flex-1 p-8">
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="rounded-3xl bg-white p-8 shadow-lg">
                <p className="text-sm text-gray-500">Dashboard / Order</p>
                <h1 className="mt-3 text-3xl font-bold text-gray-900">
                  Order Received
                </h1>
                <p className="mt-2 text-gray-600">
                  Thank you for your purchase. Here are the details of your most
                  recent order.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Order Info
                  </h2>
                  <div className="mt-5 space-y-3 text-sm text-gray-700">
                    <div>
                      <p className="font-medium text-gray-900">
                        Razorpay Order ID
                      </p>
                      <p>{order.razorpay_order_id}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Payment ID</p>
                      <p>{order.razorpay_payment_id}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Total Paid</p>
                      <p>
                        {order.currency} {order.total}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Status</p>
                      <p className="text-green-600">Paid</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200 lg:col-span-2">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Shipping & Billing
                  </h2>
                  <div className="mt-5 grid gap-4 md:grid-cols-2 text-sm text-gray-700">
                    <div className="rounded-3xl bg-gray-50 p-4">
                      <p className="font-medium text-gray-900">Billing</p>
                      <p className="mt-3">
                        {order.billingInfo.firstName}{" "}
                        {order.billingInfo.lastName}
                      </p>
                      <p>{order.billingInfo.email}</p>
                      <p>{order.billingInfo.address}</p>
                      <p>
                        {order.billingInfo.city}, {order.billingInfo.state}{" "}
                        {order.billingInfo.zipCode}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-gray-50 p-4">
                      <p className="font-medium text-gray-900">Shipping</p>
                      <p className="mt-3">
                        {order.shippingInfo.firstName}{" "}
                        {order.shippingInfo.lastName}
                      </p>
                      <p>{order.shippingInfo.address}</p>
                      <p>
                        {order.shippingInfo.city}, {order.shippingInfo.state}{" "}
                        {order.shippingInfo.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Items Ordered
                </h2>
                <div className="mt-5 space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-3xl bg-gray-50 p-4"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
