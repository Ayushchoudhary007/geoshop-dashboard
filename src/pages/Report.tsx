import React from "react";
import InventorySummary from "@/components/report/InventorySummary";
import BestSellingTable from "@/components/report/BestSellingTable";
import BestSellingCategory from "@/components/report/BestSellingCategory";
import OverviewMetrics from "@/components/report/OverviewMetrics";

const Report: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-6 p-6 bg-[#0f1c3f] min-h-screen text-white">
      <h2 className="text-2xl font-bold w-full">Reports Overview</h2>

      <div className="w-full lg:w-1/2 xl:w-1/3">
        <OverviewMetrics />
      </div>

      <div className="w-full lg:w-1/2 xl:w-2/3">
        <BestSellingTable />
      </div>

      <div className="w-full lg:w-1/2">
        <BestSellingCategory />
      </div>

      <div className="w-full lg:w-1/2">
        <InventorySummary />
      </div>
    </div>
  );
};

export default Report;
