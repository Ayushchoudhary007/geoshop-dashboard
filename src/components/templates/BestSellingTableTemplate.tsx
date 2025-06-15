// src/components/BestSellingTable.tsx
import { Card } from "@/components/ui/card";

type Product = {
  name: string;
  id: string;
  category: string;
  quantity: string;
  turnover: string;
  increase: string;
};

const data: Product[] = [
  {
    name: "Tomato",
    id: "23567",
    category: "Vegetable",
    quantity: "225 kg",
    turnover: "₹17,000",
    increase: "2.3%",
  },
  {
    name: "Onion",
    id: "25831",
    category: "Vegetable",
    quantity: "200 kg",
    turnover: "₹12,000",
    increase: "1.3%",
  },
  {
    name: "Maggi",
    id: "56841",
    category: "Instant Food",
    quantity: "200 Packet",
    turnover: "₹10,000",
    increase: "1.3%",
  },
  {
    name: "Surf Excel",
    id: "23567",
    category: "Household",
    quantity: "125 Packet",
    turnover: "₹9,000",
    increase: "1%",
  },
];

export default function BestSellingTable() {
  return (
    <Card className="bg-[#1c2b4a] text-white p-6 rounded-2xl shadow-md mt-6 w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Best Selling Products</h3>
        <button className="text-xs text-blue-400 hover:underline">
          See All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-gray-400 border-b border-slate-600">
            <tr>
              <th className="py-2 px-4 font-medium">Product</th>
              <th className="py-2 px-4 font-medium">Product ID</th>
              <th className="py-2 px-4 font-medium">Category</th>
              <th className="py-2 px-4 font-medium">Quantity</th>
              <th className="py-2 px-4 font-medium">Turnover</th>
              <th className="py-2 px-4 font-medium">Increase</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => (
              <tr
                key={index}
                className="border-b border-slate-700 last:border-0"
              >
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.id}</td>
                <td className="py-2 px-4">{product.category}</td>
                <td className="py-2 px-4">{product.quantity}</td>
                <td className="py-2 px-4">{product.turnover}</td>
                <td className="py-2 px-4 text-green-400 font-medium">
                  {product.increase}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
