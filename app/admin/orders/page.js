"use client";
import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  Mail,
  RefreshCw,
  Eye,
  Filter,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?status=${statusFilter}`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchOrders();
      } else {
        alert(data.message || "Failed to update order status");
      }
    } catch (err) {
      alert("Error updating order status");
    }
  };

  const handleReturnStatus = async (orderId, returnStatus) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, returnStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchOrders();
      }
    } catch (err) {
      alert("Error processing return status");
    }
  };

  const statusOptions = [
    { label: "All Orders", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
  ];

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
        <h1 className="text-2xl font-bold text-foreground">Order Management</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Monitor customer transactions, update order fulfillment status, and handle returns
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-card p-2 rounded-2xl shadow-sm border border-border">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStatusFilter(opt.value)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              statusFilter === opt.value
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:bg-secondary/60"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <RefreshCw className="w-6 h-6 animate-spin text-primary mr-2" />
            <span>Loading Orders...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/50 text-muted-foreground uppercase text-[11px] font-bold tracking-wider border-b border-border">
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-6">Customer & Email</th>
                  <th className="py-3.5 px-6">Payment</th>
                  <th className="py-3.5 px-6">Total Amount</th>
                  <th className="py-3.5 px-6">Order Status</th>
                  <th className="py-3.5 px-6">Return Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm font-medium text-foreground/90">
                {orders.length > 0 ? (
                  orders.map((o) => {
                    const customerEmail =
                      o.shippingInfo?.email || o.billingInfo?.email || "Guest Customer";
                    const customerName =
                      o.shippingInfo?.firstName ||
                      o.billingInfo?.firstName ||
                      "Customer";

                    return (
                      <tr key={o._id} className="hover:bg-secondary/40 transition">
                        <td className="py-4 px-6 font-mono text-xs font-bold text-foreground">
                          #{o._id.substring(0, 8)}
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-bold text-foreground">{customerName}</p>
                          <p className="text-xs text-muted-foreground">{customerEmail}</p>
                        </td>
                        <td className="py-4 px-6 uppercase text-xs font-bold">
                          <span
                            className={`px-2.5 py-1 rounded-md ${
                              o.paymentMethod === "cod"
                                ? "bg-amber-500/10 text-amber-400"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {o.paymentMethod || "razorpay"}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-black text-foreground">₹{o.total}</td>
                        <td className="py-4 px-6">
                          <select
                            value={o.status || "pending"}
                            onChange={(e) => handleStatusChange(o._id, e.target.value)}
                            className="px-3 py-1.5 bg-background border border-input rounded-xl text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-ring capitalize"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-4 px-6">
                          {o.returnStatus === "requested" ? (
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleReturnStatus(o._id, "approved")}
                                className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-bold hover:bg-emerald-500/20 transition"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReturnStatus(o._id, "rejected")}
                                className="px-2 py-1 bg-destructive/10 text-destructive rounded text-xs font-bold hover:bg-destructive/20 transition"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground capitalize font-semibold">
                              {o.returnStatus || "none"}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => setSelectedOrder(o)}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      No orders found for this status.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-foreground">
                Order Detail #{selectedOrder._id}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-muted-foreground hover:text-foreground font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-muted-foreground">
              <div className="bg-secondary/40 p-3 rounded-xl">
                <p className="font-bold text-foreground text-sm mb-1">Shipping Info</p>
                <p>
                  {selectedOrder.shippingInfo?.firstName}{" "}
                  {selectedOrder.shippingInfo?.lastName}
                </p>
                <p>{selectedOrder.shippingInfo?.address}</p>
                <p>
                  {selectedOrder.shippingInfo?.city},{" "}
                  {selectedOrder.shippingInfo?.postalCode}
                </p>
                <p>Email: {selectedOrder.shippingInfo?.email}</p>
              </div>

              <div>
                <p className="font-bold text-foreground text-sm mb-2">Purchased Items</p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {(selectedOrder.items || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-secondary/40 rounded-lg"
                    >
                      <span className="font-semibold text-foreground">{item.name || item.title}</span>
                      <span className="font-mono font-bold text-foreground">
                        {item.qty || 1} x ₹{item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-border text-sm font-bold text-foreground">
                <span>Total Amount</span>
                <span>₹{selectedOrder.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}