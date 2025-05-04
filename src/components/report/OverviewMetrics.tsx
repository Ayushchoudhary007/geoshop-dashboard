// src/components/OverviewMetrics.tsx
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase"; // Make sure you have firebase initialized
import { doc, getDoc } from "firebase/firestore";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type OverviewData = {
  totalProfit: number;
  revenue: number;
  sales: number;
  netPurchaseValue: number;
  netSalesValue: number;
  momProfit: number;
  yoyProfit: number;
  chartData: { month: string; sales: number; revenue: number }[];
};

export default function OverviewMetrics() {
  const [data, setData] = useState<OverviewData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "overviewMetrics", "summary"); // Adjust your collection/document names
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data() as OverviewData);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <Card className="bg-[#1c2b4a] text-white p-6 rounded-2xl shadow-md w-full max-w-3xl">
        <p>Loading...</p>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1c2b4a] text-white p-6 rounded-2xl shadow-md w-full max-w-3xl">
      <h3 className="text-lg font-semibold text-muted-foreground mb-6">
        Overview
      </h3>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
          <p className="text-2xl font-semibold text-white">
            ₹{data.totalProfit.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total Profit</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-yellow-400">
            ₹{data.revenue.toLocaleString()}
          </p>
          <p className="text-sm text-yellow-400">Revenue</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-purple-400">
            ₹{data.sales.toLocaleString()}
          </p>
          <p className="text-sm text-purple-400">Sales</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data.chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              borderColor: "#475569",
            }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#a78bfa"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#facc15"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="border-t border-slate-600 pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mt-6">
        <div>
          <p className="text-lg font-medium text-white">
            ₹{data.netPurchaseValue.toLocaleString()}
          </p>
          <p className="text-muted-foreground">Net purchase value</p>
        </div>
        <div>
          <p className="text-lg font-medium text-white">
            ₹{data.netSalesValue.toLocaleString()}
          </p>
          <p className="text-muted-foreground">Net sales value</p>
        </div>
        <div>
          <p className="text-lg font-medium text-white">
            ₹{data.momProfit.toLocaleString()}
          </p>
          <p className="text-muted-foreground">MoM Profit</p>
        </div>
        <div>
          <p className="text-lg font-medium text-white">
            ₹{data.yoyProfit.toLocaleString()}
          </p>
          <p className="text-muted-foreground">YoY Profit</p>
        </div>
      </div>
    </Card>
  );
}
