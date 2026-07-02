"use client";

import { useEffect, useState } from "react";

const Midnavbar = () => {
  const [category, setCategory] = useState("All");
  const [input, setInput] = useState("");

  const categories = [
    "All",
    "mobile",
    "Laptop",
    "watch",
    "remote",
    "headphone",
    "projecter",
  ];

  useEffect(() => {});

  const handleSubmit = () => {
    console.log("Input:", input);
    console.log("Selected Category:", category);
  };

  return (
    <div className="w-full bg-[#001B38] py-2 px-3 flex items-center gap-2 border-b border-[#95D7DE]/10">
      {/* Search Bar */}
      <div className="flex flex-1 h-10 w-50 rounded-md overflow-hidden border border-[#95D7DE]/20">
        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-black text-[#A0A0A0] text-xs font-medium px-2 border-r border-[#95D7DE]/20 cursor-pointer hover:bg-[#001B38] hover:text-white focus:outline-none shrink-0 hidden sm:block"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Input */}
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 text-sm text-white placeholder-[#A0A0A0] bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#95D7DE]"
        />

        {/* Search Button */}
        <button
          className="bg-[#95D7DE] hover:bg-[#7FC5CD] active:bg-[#6BB8C0] w-12 flex items-center justify-center transition-colors duration-150"
          aria-label="Search"
          onClick={handleSubmit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.34-4.34" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Midnavbar;
