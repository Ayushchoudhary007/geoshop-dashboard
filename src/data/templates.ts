// src/data/templates.ts

import BestSellingCategoryTemplate from "@/components/templates/BestSellingCategoryTemplate";
import BestSellingTableTemplate from "@/components/templates/BestSellingTableTemplate";
import InventorySummaryTemplate from "@/components/templates/InventorySummaryTemplate";
import OverviewMetricsTemplate from "@/components/templates/OverviewMetricsTemplate";
import ProductSummaryTemplate from "@/components/templates/ProductSummaryTemplate";
import ProfitRevenueChartTemplate from "@/components/templates/ProfitRevenueChartTemplate";
import CountryMap from "@/components/templates/CountryMap";
import EcommerceMetrics from "@/components/templates/EcommerceMetrics";
import MonthlySalesChart from "@/components/templates/MonthlySalesChart";
import MonthlyTarget from "@/components/templates/MonthlyTarget";

// 1️⃣ This is used for rendering template components dynamically
export const templateMap = {
  bestCategory: BestSellingCategoryTemplate,
  bestTable: BestSellingTableTemplate,
  inventorySummary: InventorySummaryTemplate,
  overviewMetrics: OverviewMetricsTemplate,
  productSummary: ProductSummaryTemplate,
  revenueChart: ProfitRevenueChartTemplate,
  countryMap: CountryMap,
  ecommerceMetrics: EcommerceMetrics,
  monthlySalesChart: MonthlySalesChart,
  monthlyTarget: MonthlyTarget,
};

// 2️⃣ This is used for UI display (like a list of selectable templates)
export const templateLibrary = [
  { id: "bestCategory", name: "Best Selling Category" },
  { id: "bestTable", name: "Top Products Table" },
  { id: "inventorySummary", name: "Inventory Summary" },
  { id: "overviewMetrics", name: "Overview Metrics" },
  { id: "productSummary", name: "Product Summary" },
  { id: "revenueChart", name: "Profit & Revenue Chart" },
  { id: "countryMap", name: "Country Map" },
  { id: "ecommerceMetrics", name: "E-commerce Metrics" },
  { id: "monthlySalesChart", name: "Monthly Sales Chart" },
  { id: "monthlyTarget", name: "Monthly Target" },
];
