import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import AppLayout from "./layouts/AppLayout";

// Auth pages
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

// Dashboard pages
import Home from "./pages/Home";
import User from "./pages/User";
import ProductPromotion from "./pages/ProductPromotion";
import Transaction from "./pages/Transaction";
import Inventory from "./pages/Inventory";
import Analysis from "./pages/Analysis";
import Report from "./pages/Report";
import Setting from "./pages/Setting";
import Logout from "./pages/Logout";

// Firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

// 👉 Add this import for toast notifications:
import { Toaster } from "sonner";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      {/* 👇 Add Toaster inside Router */}
      <Toaster richColors position="top-center" />

      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/Signin" />} />
          </>
        ) : (
          <>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/User" element={<User />} />
              <Route path="/ProductPromotion" element={<ProductPromotion />} />
              <Route path="/Transaction" element={<Transaction />} />
              <Route path="/Inventory" element={<Inventory />} />
              <Route path="/Analysis" element={<Analysis />} />
              <Route path="/Report" element={<Report />} />
              <Route path="/Setting" element={<Setting />} />
              <Route path="/Logout" element={<Logout />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
