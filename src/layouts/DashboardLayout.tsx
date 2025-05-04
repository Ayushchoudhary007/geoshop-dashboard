// src/layouts/DashboardLayout.tsx

import { FC } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

const DashboardLayout: FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-gray-800 text-white p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
