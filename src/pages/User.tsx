import React, { useState } from "react";
import UserInfo from "../components/user/UserInfo";
import ShopRegistration from "../components/shop/ShopRegistration";

const User: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"user" | "shop">("user");

  return (
    <div className="max-w-6xl mx-auto">
      {/* Toggle Switch */}
      <div className="flex justify-center ">
        <div className="flex justify-center bg-blue-900 rounded-3xl mx-1 p-2 mb-4 md:w-1/2 sm:text-xl max-w-2xl gap-2 h-15 ">
          <button
            onClick={() => setActiveTab("user")}
            className={`px-6 py-1 rounded-full transition-all duration-200 ${
              activeTab === "user" ? "bg-blue-600 text-black" : "text-gray-700"
            }`}
          >
            User Info
          </button>
          <button
            onClick={() => setActiveTab("shop")}
            className={`px-6 py-1 rounded-full transition-all duration-200 ${
              activeTab === "shop" ? "bg-blue-600 text-black" : "text-gray-700"
            }`}
          >
            Shop Registration
          </button>
        </div>
      </div>
      {/* Render based on toggle */}
      <div className=" rounded-xl shadow-md p-4 bg-blue-900">
        {activeTab === "user" ? <UserInfo /> : <ShopRegistration />}
      </div>
    </div>
  );
};

export default User;
