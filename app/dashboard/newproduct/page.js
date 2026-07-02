"use client";

import { useState, useRef } from "react";
import Image from "next/image";

const INITIAL_FORM = {
  name: "",
  brand: "",
  price: "",
  category: "",
  description: "",
};

const AddProductModal = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [imageFile, setImageFile] = useState(null); // actual File object
  const [imagePreview, setImagePreview] = useState(""); // base64 preview URL
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Convert selected file to base64 preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddProduct = async (data) => {
    const { imageFile, brand, category, ...fields } = data;
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) =>
      formData.append(key, value),
    );
    if (imageFile) formData.append("image", imageFile);

    const res = await fetch("/api/electroproduct", {
      method: "POST",
      body: formData,
    });
    // Content-Type header manually mat lagayein, browser khud set karega
    console.log("Response:", res);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add product");
    }
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    handleRemoveImage();
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger button */}
      <div className="flex justify-center m-5">
        <button
          onClick={() => setIsOpen(true)}
          className="text-black bg-[#95D7DE] hover:bg-[#7FC5CD] focus:ring-4 focus:outline-none focus:ring-[#95D7DE]/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Create product
        </button>
      </div>

      {/* Backdrop + Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/70 backdrop-blur-sm overflow-y-auto px-4"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal content */}
            <div className="relative bg-[#001B38] border border-[#95D7DE]/10 rounded-lg shadow-xl p-5">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#95D7DE]/10">
                <h3 className="text-lg font-semibold text-white">
                  Add Product
                </h3>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-[#A0A0A0] bg-transparent hover:bg-black hover:text-white rounded-lg text-sm p-1.5 inline-flex items-center"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <form onSubmit={handleAddProduct}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Type product name"
                      required
                      className="bg-black border border-[#95D7DE]/20 text-white text-sm rounded-lg focus:ring-2 focus:ring-[#95D7DE] focus:border-[#95D7DE] block w-full p-2.5 placeholder-[#A0A0A0]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Brand
                    </label>
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      value={form.brand}
                      onChange={handleChange}
                      placeholder="Product brand"
                      required
                      className="bg-black border border-[#95D7DE]/20 text-white text-sm rounded-lg focus:ring-2 focus:ring-[#95D7DE] focus:border-[#95D7DE] block w-full p-2.5 placeholder-[#A0A0A0]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="$2999"
                      required
                      min={0}
                      className="bg-black border border-[#95D7DE]/20 text-white text-sm rounded-lg focus:ring-2 focus:ring-[#95D7DE] focus:border-[#95D7DE] block w-full p-2.5 placeholder-[#A0A0A0]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                      className="bg-black border border-[#95D7DE]/20 text-white text-sm rounded-lg focus:ring-2 focus:ring-[#95D7DE] focus:border-[#95D7DE] block w-full p-2.5"
                    >
                      <option value="">Select category</option>
                      <option value="TV">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="GA">Gaming/Console</option>
                      <option value="PH">Phones</option>
                    </select>
                  </div>

                  {/* ── Image Upload ── */}
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-white">
                      Product Image
                    </label>

                    {imagePreview ? (
                      /* Preview box */
                      <div className="relative w-full h-48 rounded-lg border border-[#95D7DE]/20 bg-black overflow-hidden">
                        <Image
                          src={imagePreview}
                          alt="Product preview"
                          fill
                          className="object-contain p-3"
                          unoptimized
                        />
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-[#001B38] border border-[#95D7DE]/20 rounded-full p-1 hover:bg-red-500/10 hover:border-red-400 transition-colors"
                          aria-label="Remove image"
                        >
                          <svg
                            className="w-4 h-4 text-[#A0A0A0] hover:text-red-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {/* File name pill */}
                        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full truncate max-w-[80%]">
                          {imageFile?.name}
                        </span>
                      </div>
                    ) : (
                      /* Drop zone */
                      <label
                        htmlFor="image"
                        className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[#95D7DE]/20 rounded-lg cursor-pointer bg-black hover:bg-[#001B38] transition-colors"
                      >
                        <div className="flex flex-col items-center gap-1 text-center px-4">
                          <svg
                            className="w-8 h-8 text-[#95D7DE]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm text-[#A0A0A0]">
                            <span className="font-medium text-[#95D7DE]">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-[#A0A0A0]">
                            PNG, JPG, WEBP — max 5 MB
                          </p>
                        </div>
                        <input
                          id="image"
                          ref={fileInputRef}
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Write product description here"
                      className="block p-2.5 w-full text-sm text-white bg-black rounded-lg border border-[#95D7DE]/20 focus:ring-2 focus:ring-[#95D7DE] focus:border-[#95D7DE] placeholder-[#A0A0A0]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="text-black inline-flex items-center bg-[#95D7DE] hover:bg-[#7FC5CD] focus:ring-4 focus:outline-none focus:ring-[#95D7DE]/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin mr-2 w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <svg
                        className="mr-1 -ml-1 w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Add new product
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductModal;
