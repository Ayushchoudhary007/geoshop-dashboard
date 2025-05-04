import React from "react";
import { FiSearch } from "react-icons/fi";

const Topbar: React.FC = () => {
  return (
    <div className="h-14 bg-[#1C1F23] border-b border-gray-700 px-6 flex items-center justify-between">
      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search dashboard..."
          className="w-full py-2 pl-4 pr-10 text-sm bg-[#2A2D33] text-white placeholder-gray-400 rounded border border-gray-600 focus:outline-none"
        />
        <FiSearch className="absolute top-2.5 right-3 text-gray-400" />
      </div>

      {/* User Info */}
      <div className="flex items-center gap-2">
        <img
          src="https://via.placeholder.com/32"
          alt="Profile of Dr. Asha Wadhwani"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-white text-sm font-medium whitespace-nowrap hidden sm:inline">
          Asha Wadhwani
        </span>
      </div>
    </div>
  );
};

export default Topbar;
