import { useTemplateStore } from "../store/templateStore";
import ProfitRevenueChartTemplate from "./templates/ProfitRevenueChartTemplate";
import BestSellingCategoryTemplate from "./templates/BestSellingCategoryTemplate";
import BestSellingTableTemplate from "./templates/BestSellingTableTemplate";
import ProductSummaryTemplate from "./templates/ProductSummaryTemplate";
import InventorySummaryTemplate from "./templates/InventorySummaryTemplate";
import OverviewMetricsTemplate from "./templates/OverviewMetricsTemplate";


const componentMap: Record<string, React.FC> = {
  profitRevenueChart: ProfitRevenueChartTemplate,
  bestSellingCategory: BestSellingCategoryTemplate,
  bestSellingTable: BestSellingTableTemplate,
  productSummary: ProductSummaryTemplate,
  inventorySummary: InventorySummaryTemplate,
  overviewMetrics: OverviewMetricsTemplate,
};

const PageRenderer = ({ page }: { page: string }) => {
  const assignments = useTemplateStore((s) => s.assignments[page] || []);

  return (
    <div className="grid gap-4">
      {assignments.map((id) => {
        const Component = componentMap[id];
        return <Component key={id} />;
      })}
    </div>
  );
};

export default PageRenderer;
