import React from "react";
import ProductSummaryCards from "@/components/analysis/ProductSummaryCards";
import ProfitRevenueChart from "@/components/analysis/ProfitRevenueChart";

const Analysis: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-6 p-6 bg-[#0f1c3f] min-h-screen text-white">
      <h2 className="text-2xl font-bold w-full">Analytics Dashboard</h2>

      <div className="w-full md:w-1/2 xl:w-1/3">
        <ProductSummaryCards />
      </div>

      <div className="w-full md:w-1/2 xl:w-2/3">
        <ProfitRevenueChart />
      </div>
    </div>
  );
};

export default Analysis;
