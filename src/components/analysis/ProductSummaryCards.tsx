// src/components/ProductSummaryCards.tsx
import { Card } from "@/components/ui/card";
import { Heart, Box, Tag, DollarSign } from "lucide-react";

const cards = [
  {
    label: "Saved Products",
    value: "50.8K",
    icon: <Heart className="text-pink-500" size={20} />,
    change: "+28.4%",
    changeColor: "text-green-400",
  },
  {
    label: "Stock Products",
    value: "23.6K",
    icon: <Box className="text-purple-500" size={20} />,
    change: "-12.6%",
    changeColor: "text-red-400",
  },
  {
    label: "Sale Products",
    value: "756",
    icon: <Tag className="text-purple-400" size={20} />,
    change: "+31%",
    changeColor: "text-green-400",
  },
  {
    label: "Average Revenue",
    value: "2.3K",
    icon: <DollarSign className="text-purple-300" size={20} />,
    change: "+11.9%",
    changeColor: "text-green-300",
  },
];

export default function ProductSummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-6">
      {cards.map((card, idx) => (
        <Card
          key={idx}
          className="bg-[#1c2b4a] p-5 rounded-2xl text-white shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-2 text-sm font-medium">
              {card.icon}
              {card.label}
            </span>
            <div className="text-gray-400 text-xl cursor-pointer">⋮</div>
          </div>
          <div className="text-3xl font-bold">{card.value}</div>
          <div className={`text-xs mt-1 ${card.changeColor}`}>
            {card.change} from last week
          </div>
        </Card>
      ))}
    </div>
  );
}
