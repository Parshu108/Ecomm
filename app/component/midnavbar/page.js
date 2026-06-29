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

  useEffect(()=>{
    
  });

  const handleSubmit=()=>{

    
   console.log("Input:", input);
   console.log("Selected Category:", category);

  }


  return (
    <div className="w-full bg-gray-800 py-2 px-3 flex items-center gap-2">
      
      {/* Search Bar */}
      <div className="flex flex-1 h-10 w-50 rounded-md overflow-hidden">
        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#f3f3f3] text-[#131921] text-xs font-medium px-2 border-r border-[#cdcdcd] cursor-pointer hover:bg-[#e8e8e8] focus:outline-none shrink-0 hidden sm:block"
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
          onChange={(e)=>setInput(e.target.value)}
          className="flex-1 px-4 text-sm text-[#131921] placeholder-[#767676] bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#febd69]"
        />

        {/* Search Button */}
        <button
          className="bg-[#febd69] hover:bg-[#f3a847] active:bg-[#e8991c] w-12 flex items-center justify-center transition-colors duration-150"
          aria-label="Search"
          onClick={handleSubmit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#131921"
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
