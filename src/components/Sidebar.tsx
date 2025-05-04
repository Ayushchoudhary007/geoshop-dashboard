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
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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

  return (
    <div className="w-20 bg-gray-900 text-white flex flex-col items-center py-4 space-y-6">
      {menu.map(({ icon: Icon, label, path }) => (
        <NavLink
          key={label}
          to={path}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs transition-all duration-200 ${
              isActive
                ? "text-white bg-gray-800 rounded-md px-2 py-1"
                : "text-gray-400 hover:text-white"
            }`
          }
        >
          <Icon className="w-5 h-5 mb-1" />
          {label}
        </NavLink>
      ))}

      <button
        onClick={handleLogout}
        className="flex flex-col items-center text-xs text-gray-400 hover:text-white transition-all duration-200"
      >
        <LogOut className="w-5 h-5 mb-1" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
