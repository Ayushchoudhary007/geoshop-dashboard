import { useEffect } from "react";
//import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";
//import { Card, CardContent } from "@/components/ui/card";
import { useTemplateStore } from "@/store/templateStore";
import { templateMap } from "@/data/templateMap";

const Home = () => {
  const { assignments, fetchTemplatesForUser } = useTemplateStore();
  const templates = assignments["Home"] || [];

  useEffect(() => {
    fetchTemplatesForUser(); // call only once
  }, []);

  /* const [summary, setSummary] = useState({
    totalSales: 0,
    orderCount: 0,
    productCount: 0,
    customerCount: 0,
  });

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
  ];*/

  return (
    <div className="flex flex-wrap gap-6 p-6 bg-[#0f1c3f] min-h-screen text-white">
      <div className="grid gap-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Dashboard Home</h1>
        </div>

        {/* Summary Cards */}
        {/*<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        </div>*/}
      </div>
      {/* Selected Templates */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
        </div>

        <div className="grid lg:grid-cols-2  md:grid-cols-1 gap-12">
          {templates.map((id) => {
            const Comp = templateMap[id as keyof typeof templateMap];
            return Comp ? <Comp key={id} /> : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
