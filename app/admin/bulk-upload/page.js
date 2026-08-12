"use client";
import React, { useState } from "react";
import { Upload, Download, CheckCircle2, AlertCircle, FileText } from "lucide-react";

export default function AdminBulkUploadPage() {
  const [parsedProducts, setParsedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Download Sample CSV
  const downloadSampleCSV = () => {
    const csvContent =
      "name,price,category,stock,description,image\n" +
      "Wireless Gaming Mouse,1499,remote,25,Ergonomic RGB wireless gaming mouse,https://images.unsplash.com/photo-1527864550417-7fd91fc51a46\n" +
      "Mechanical Keyboard,3499,remote,15,Tactile blue switch mechanical keyboard,https://images.unsplash.com/photo-1587829741301-dc798b83add3\n";

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_products.csv";
    a.click();
  };

  // Parse uploaded CSV file
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
      if (lines.length <= 1) return;

      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const items = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim());
        const item = {};
        headers.forEach((h, idx) => {
          item[h] = values[idx] || "";
        });
        if (item.name && item.price) {
          items.push(item);
        }
      }

      setParsedProducts(items);
    };
    reader.readAsText(file);
  };

  const handleBatchImport = async () => {
    if (parsedProducts.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bulk-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: parsedProducts }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(data.message);
        setParsedProducts([]);
      } else {
        alert(data.message || "Failed to import products");
      }
    } catch (err) {
      alert("Error uploading products: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bulk Product CSV Importer</h1>
          <p className="text-slate-500 text-sm mt-1">
            Import hundreds of catalog products at once using a CSV spreadsheet
          </p>
        </div>
        <button
          onClick={downloadSampleCSV}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition"
        >
          <Download className="w-4 h-4" />
          Download CSV Template
        </button>
      </div>

      {/* Upload Zone */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-dashed border-slate-300 text-center space-y-4">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
          <Upload className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Select CSV File to Import</h3>
          <p className="text-xs text-slate-400 mt-1">
            File should include headers: name, price, category, stock, description, image
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl cursor-pointer shadow-md shadow-indigo-600/20 transition">
          <FileText className="w-4 h-4" />
          Choose CSV File
          <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="font-bold text-sm">{successMessage}</span>
        </div>
      )}

      {/* CSV Preview Table */}
      {parsedProducts.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg">
              Preview Parsed Products ({parsedProducts.length})
            </h3>
            <button
              onClick={handleBatchImport}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/20 transition disabled:opacity-50"
            >
              {loading ? "Importing..." : "Confirm & Import Catalog"}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-100">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {parsedProducts.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                    <td className="py-3 px-4 font-bold text-emerald-700">₹{p.price}</td>
                    <td className="py-3 px-4 uppercase">{p.category || "general"}</td>
                    <td className="py-3 px-4 font-mono">{p.stock || 15}</td>
                    <td className="py-3 px-4 text-slate-400 truncate max-w-xs">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
