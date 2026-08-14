"use client";
import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  UserCheck,
  UserX,
  RefreshCw,
  Search,
  ShieldAlert,
  CheckCircle,
  Crown,
  User,
  Plus,
} from "lucide-react";

export default function SuperAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // State for creating a new admin account
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "", role: "admin" });
  const [createMsg, setCreateMsg] = useState({ text: "", type: "" });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        alert(data.message || "Failed to update role");
      }
    } catch (err) {
      alert("Error updating role");
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setCreateMsg({ text: "", type: "" });
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdmin),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setCreateMsg({ text: data.message || "Admin created successfully!", type: "success" });
        setNewAdmin({ name: "", email: "", password: "", role: "admin" });
        fetchUsers();
        setTimeout(() => setShowCreateModal(false), 1500);
      } else {
        setCreateMsg({ text: data.error || "Failed to create account", type: "error" });
      }
    } catch (err) {
      setCreateMsg({ text: "Server error creating account", type: "error" });
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8 bg-background min-h-screen p-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-6 rounded-2xl shadow-sm border border-border">
        <div>
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl font-bold text-foreground">Superadmin Role Control</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Manage user roles, grant admin access, and control system privileges
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:opacity-90 text-primary-foreground rounded-xl text-sm font-semibold shadow-md shadow-primary/20 transition"
        >
          <Plus className="w-4 h-4" />
          Create Admin Account
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-2xl border border-border">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-muted-foreground">Role Filter:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none"
          >
            <option value="all">All Roles ({users.length})</option>
            <option value="user">Users ({users.filter((u) => u.role === "user").length})</option>
            <option value="admin">Admins ({users.filter((u) => u.role === "admin").length})</option>
            <option value="superadmin">Superadmins ({users.filter((u) => u.role === "superadmin").length})</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground animate-pulse">
            <RefreshCw className="w-6 h-6 animate-spin text-primary mr-3" />
            <span>Loading user database...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/50 text-muted-foreground uppercase text-[11px] font-bold tracking-wider border-b border-border">
                  <th className="py-4 px-6">User Account</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Current Role</th>
                  <th className="py-4 px-6">Change Role</th>
                  <th className="py-4 px-6 text-right">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm font-medium text-foreground/90">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => {
                    const isSuper = u.role === "superadmin";
                    const isAdmin = u.role === "admin";
                    return (
                      <tr key={u._id} className="hover:bg-secondary/40 transition">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                              isSuper
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                : isAdmin
                                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                : "bg-secondary text-muted-foreground"
                            }`}>
                              {isSuper ? <Crown className="w-4 h-4" /> : isAdmin ? <ShieldCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="font-bold text-foreground">{u.name}</p>
                              <p className="text-xs text-muted-foreground font-mono">ID: {u._id.substring(0, 8)}...</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-muted-foreground font-mono text-xs">
                          {u.email}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold capitalize ${
                              isSuper
                                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                : isAdmin
                                ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {isSuper && <Crown className="w-3 h-3" />}
                            {isAdmin && <ShieldCheck className="w-3 h-3" />}
                            {u.role || "user"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={u.role || "user"}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                            className="bg-background border border-border px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground focus:outline-none focus:border-primary"
                          >
                            <option value="user">User (Standard)</option>
                            <option value="admin">Admin (Seller)</option>
                            <option value="superadmin">Superadmin (Master)</option>
                          </select>
                        </td>
                        <td className="py-4 px-6 text-right text-xs text-muted-foreground">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No user accounts found matching your query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Creating New Admin Account */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-card w-full max-w-md p-6 rounded-2xl border border-border shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-primary" />
                Provision Admin Account
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {createMsg.text && (
              <div className={`p-3 rounded-xl text-xs font-semibold ${
                createMsg.type === "success" ? "bg-emerald-500/20 text-emerald-300" : "bg-destructive/20 text-destructive"
              }`}>
                {createMsg.text}
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  placeholder="Admin Name"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  placeholder="admin@ecom.com"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Role Level</label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                  className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none"
                >
                  <option value="admin">Admin (Store Manager)</option>
                  <option value="superadmin">Superadmin (Full Control)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-secondary transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
