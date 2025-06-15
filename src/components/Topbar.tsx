import React, { useEffect, useState, useRef } from "react";
import {
  FiSearch,
  FiBell,
  FiChevronDown,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { signOut } from "firebase/auth";
import { useSidebar } from "../context/SidebarContext";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Topbar: React.FC = () => {
  const { isMobile, closeMobileSidebar } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userInfo, setUserInfo] = useState<{
    email: string;
    photoURL: string | null;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        document.getElementById("dashboard-search")?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    // Get current user info
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserInfo({
        email: currentUser.email || "No Email",
        photoURL: currentUser.photoURL,
      });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="h-14 bg-[#1C1F23] border-b border-gray-700 px-1 flex items-center justify-between">
      {/* Search Input */}
      <div className="relative left-19 lg:w-1/2 md:w-1/3 w-32">
        <input
          id="dashboard-search"
          type="text"
          placeholder="Search dashboard..."
          className="w-full py-2 pl-4 pr-10 text-sm bg-[#2A2D33] text-white placeholder-gray-400 rounded border border-gray-600 focus:outline-none"
          onFocus={() => isMobile && closeMobileSidebar()}
        />
        <FiSearch className="absolute top-2.5 right-3 text-gray-400" />
      </div>

      {/* Notification and Profile */}
      <div className="flex items-center gap-1 sm:gap-2 ml-2 mr-0.5 sm:mr-1">
        {/* Notification Icon */}
        <button className="relative w-5  bg-gray-700 hover:text-white">
          <FiBell className="h-5 w-5" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative w-14  my-1 md:w-20 " ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 text-sm text-black hover:text-gray-300 focus:outline-none"
          >
            <img
              src={
                userInfo?.photoURL ||
                "https://ui-avatars.com/api/?name=User&background=333&color=fff"
              }
              alt="User Avatar"
              className="w-8 h-7 rounded-full"
            />
            <FiChevronDown className="w-4 h-4" />
          </button>

          {/*isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#2A2D33] text-black rounded shadow-lg border border-gray-700 z-50">
              <div className="px-4 py-2 text-sm border-b border-gray-600">
                Signed in as
                <br />
                <span className="font-medium">
                  {userInfo?.email || "Unknown"}
                </span>
              </div>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700">
                <FiUser /> Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          )*/}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
