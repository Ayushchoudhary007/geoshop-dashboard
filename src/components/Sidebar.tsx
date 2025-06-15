import {
  Home,
  User,
  Package,
  List,
  Layers,
  BarChart,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
  const navigate = useNavigate();

  const {
    isExpanded,
    isMobile,
    isMobileOpen,
    toggleSidebar,
    toggleMobileSidebar,
    closeMobileSidebar,
  } = useSidebar();

  const menu = [
    { icon: Home, label: "Home", path: "/Home" },
    { icon: User, label: "User", path: "/User" },
    { icon: Package, label: "Products", path: "/ProductPromotion" },
    { icon: List, label: "Transactions", path: "/Transaction" },
    { icon: Layers, label: "Inventory", path: "/Inventory" },
    { icon: BarChart, label: "Analytic", path: "/Analysis" },
    { icon: FileText, label: "Reports", path: "/Report" },
    { icon: Settings, label: "Settings", path: "/Setting" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const SidebarContent = () => (
    <div
      className={`h-full bg-gray-900 text-white flex flex-col transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={toggleSidebar}
          className="text-black hover:text-gray-400"
        >
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 flex flex-col items-start space-y-4 px-2">
        {menu.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            onClick={isMobile ? closeMobileSidebar : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm rounded-md w-full transition ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-700"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {isExpanded && <span>{label}</span>}
          </NavLink>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-auto px-3 pb-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm text-gray-400 hover:text-white w-full"
        >
          <LogOut className="w-5 h-5" />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleMobileSidebar}
          className="fixed top-1.5 left-2 z-50 p-2 rounded bg-gray-800 text-black md:hidden"
        >
          <Menu />
        </button>
      )}

      {/* Sidebar for desktop or mobile drawer */}
      {isMobile ? (
        isMobileOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={closeMobileSidebar}
            />
            <div className="relative z-50">
              <SidebarContent />
              <button
                onClick={closeMobileSidebar}
                className="absolute top-2 right-2 text-white"
              >
                <X />
              </button>
            </div>
          </div>
        )
      ) : (
        <SidebarContent />
      )}
    </>
  );
};

export default Sidebar;
