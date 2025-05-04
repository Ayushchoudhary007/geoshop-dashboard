// src/components/InventorySummary.tsx
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/firebase/firebase"; // your firebase config
import { collection, onSnapshot } from "firebase/firestore";

type StatBlockProps = {
  title: string;
  value: string | number;
  label: string;
  subLabel?: string;
  color?: string;
  loading?: boolean;
};

const StatBlock = ({
  title,
  value,
  label,
  subLabel,
  color,
  loading,
}: StatBlockProps) => (
  <div className="flex flex-col items-start justify-center space-y-1 px-4">
    <p className={`text-sm font-medium ${color || "text-muted-foreground"}`}>
      {title}
    </p>
    {loading ? (
      <>
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-4 w-24" />
        {subLabel && <Skeleton className="h-3 w-28" />}
      </>
    ) : (
      <>
        <h3 className="text-2xl font-semibold text-white">{value}</h3>
        <p className="text-xs text-muted-foreground">{label}</p>
        {subLabel && (
          <p className="text-xs text-muted-foreground whitespace-nowrap">
            {subLabel}
          </p>
        )}
      </>
    )}
  </div>
);

export default function InventorySummary() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    categories: 0,
    totalProducts: 0,
    revenue: "₹0",
    topSelling: 0,
    topSellingCost: "₹0",
    lowStocks: 0,
    notInStock: 0,
  });

  useEffect(() => {
    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      let total = 0;
      let lowStock = 0;
      let outOfStock = 0;
      let revenue = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        total += 1;
        if (data.stock <= 5) lowStock++;
        if (data.stock === 0) outOfStock++;
        revenue += data.soldQty * data.price;
      });

      setStats((prev) => ({
        ...prev,
        totalProducts: total,
        lowStocks: lowStock,
        notInStock: outOfStock,
        revenue: `₹${revenue.toLocaleString()}`,
      }));
      setLoading(false);
    });

    const unsubCategories = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        setStats((prev) => ({ ...prev, categories: snapshot.size }));
      }
    );

    return () => {
      unsubProducts();
      unsubCategories();
    };
  }, []);

  return (
    <Card className="bg-[#1c2b4a] text-white p-6 flex justify-between items-center rounded-2xl shadow-md overflow-auto">
      <StatBlock
        title="Categories"
        value={stats.categories}
        label="Last 7 days"
        color="text-blue-400"
        loading={loading}
      />
      <Separator orientation="vertical" className="h-14 bg-slate-600 mx-4" />
      <StatBlock
        title="Total Products"
        value={stats.totalProducts}
        label="Last 7 days"
        subLabel={stats.revenue}
        color="text-yellow-400"
        loading={loading}
      />
      <Separator orientation="vertical" className="h-14 bg-slate-600 mx-4" />
      <StatBlock
        title="Top Selling"
        value={5} // optional: replace with dynamic top-selling logic
        label="Last 7 days"
        subLabel="₹2,500 Cost"
        color="text-purple-400"
        loading={loading}
      />
      <Separator orientation="vertical" className="h-14 bg-slate-600 mx-4" />
      <StatBlock
        title="Low Stocks"
        value={stats.lowStocks}
        label="Ordered"
        subLabel={`${stats.notInStock} Not in stock`}
        color="text-red-400"
        loading={loading}
      />
    </Card>
  );
}
