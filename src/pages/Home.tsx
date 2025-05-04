import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const timeRanges = ["Today", "This Week", "This Month"] as const;
type TimeRange = (typeof timeRanges)[number];

const Home = () => {
  const [range, setRange] = useState<TimeRange>("This Month");
  const [summary, setSummary] = useState({
    totalSales: 0,
    orderCount: 0,
    productCount: 0,
    customerCount: 0,
  });
  const [chartData, setChartData] = useState([]);

  const getStartDate = (range: TimeRange): Date => {
    const now = new Date();
    if (range === "Today") {
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
    if (range === "This Week") {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday
      return new Date(now.setDate(diff));
    }
    // This Month
    return new Date(now.getFullYear(), now.getMonth(), 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const startDate = getStartDate(range);

      // Orders
      const ordersSnap = await getDocs(
        query(
          collection(db, "orders"),
          where("createdAt", ">=", Timestamp.fromDate(startDate))
        )
      );

      let salesByDate: Record<string, number> = {};
      let totalSales = 0;

      ordersSnap.forEach((doc) => {
        const data = doc.data();
        const date = data.createdAt?.toDate().toLocaleDateString("en-US");
        if (!salesByDate[date]) salesByDate[date] = 0;
        salesByDate[date] += data.amount || 0;
        totalSales += data.amount || 0;
      });

      const chart = Object.entries(salesByDate).map(([date, amount]) => ({
        date,
        amount,
      }));

      // Other collections (no filter for now)
      const productsSnap = await getDocs(collection(db, "products"));
      const usersSnap = await getDocs(collection(db, "users"));

      setSummary({
        totalSales,
        orderCount: ordersSnap.size,
        productCount: productsSnap.size,
        customerCount: usersSnap.size,
      });

      setChartData(chart);
    };

    fetchData();
  }, [range]);

  const stats = [
    {
      title: "Total Sales",
      value: `$${summary.totalSales.toFixed(2)}`,
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
    },
    {
      title: "Orders",
      value: summary.orderCount,
      icon: <ShoppingCart className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Products",
      value: summary.productCount,
      icon: <Package className="w-6 h-6 text-yellow-500" />,
    },
    {
      title: "Customers",
      value: summary.customerCount,
      icon: <Users className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div className="flex flex-wrap gap-6 p-6 bg-[#0f1c3f] min-h-screen text-white">
      <div className="grid gap-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as TimeRange)}
            className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600"
          >
            {timeRanges.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ title, value, icon }) => (
            <Card key={title} className="bg-gray-700 text-white">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-gray-300">{title}</p>
                  <h2 className="text-xl font-semibold">{value}</h2>
                </div>
                {icon}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart */}
        <div className="mt-6 bg-gray-700 rounded-xl p-6 text-white">
          <h2 className="text-lg font-semibold mb-4">Sales Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#38bdf8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
