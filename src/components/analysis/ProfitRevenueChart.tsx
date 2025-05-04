// src/components/ProfitRevenueChart.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const data = [
  { month: "Sep", revenue: 22000, profit: 40000 },
  { month: "Oct", revenue: 36000, profit: 37000 },
  { month: "Nov", revenue: 44000, profit: 42000 },
  { month: "Dec", revenue: 63000, profit: 46000 },
  { month: "Jan", revenue: 62000, profit: 45000 },
  { month: "Feb", revenue: 57000, profit: 43000 },
  { month: "Mar", revenue: 42000, profit: 35000 },
];

export default function ProfitRevenueChart() {
  return (
    <Card className="bg-[#1c2b4a] p-6 rounded-2xl text-white w-full shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Profit & Revenue</h2>
        <button className="flex items-center gap-2 text-sm border border-gray-500 px-3 py-1.5 rounded-md hover:bg-gray-700">
          <CalendarDays className="w-4 h-4" />
          Weekly
        </button>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "0.5rem",
                color: "white",
              }}
              labelStyle={{ color: "#94a3b8" }}
              formatter={(value: number) => `₹${value.toLocaleString()}`}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#facc15"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
