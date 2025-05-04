// src/components/BestSellingCategory.tsx
import { Card } from "@/components/ui/card";

type CategoryData = {
  category: string;
  turnover: string;
  increase: string;
};

const data: CategoryData[] = [
  { category: "Vegetable", turnover: "₹26,000", increase: "3.2%" },
  { category: "Instant Food", turnover: "₹22,000", increase: "2%" },
  { category: "Households", turnover: "₹22,000", increase: "1.5%" },
];

export default function BestSellingCategory() {
  return (
    <Card className="bg-[#1c2b4a] text-white p-6 rounded-2xl shadow-md mt-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Best Selling Category</h3>
        <button className="text-xs text-blue-400 hover:underline">
          See All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-gray-400 border-b border-slate-600">
            <tr>
              <th className="py-2 px-4 font-medium">Category</th>
              <th className="py-2 px-4 font-medium">Turnover</th>
              <th className="py-2 px-4 font-medium">Increase</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-slate-700 last:border-0"
              >
                <td className="py-2 px-4">{item.category}</td>
                <td className="py-2 px-4">{item.turnover}</td>
                <td className="py-2 px-4 text-green-400 font-medium">
                  {item.increase}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
