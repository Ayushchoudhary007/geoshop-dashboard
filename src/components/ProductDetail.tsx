import React from "react";
import { Button } from "@/components/ui/button";

const ProductDetail: React.FC = () => {
  const product = {
    name: "Maggi",
    id: "456567",
    category: "Instant food",
    expiry: "13/4/23",
    threshold: 12,
    supplier: {
      name: "Ronald Martin",
      contact: "98789 86757",
    },
    stocks: {
      opening: 40,
      remaining: 34,
      onTheWay: 15,
    },
    locations: [
      { store: "Sulur Branch", stock: 15 },
      { store: "Singanallur Branch", stock: 19 },
    ],
    image: "/images/maggi.png", // make sure you host/import properly
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <div className="flex gap-2">
          <Button variant="outline">Edit</Button>
          <Button variant="outline">Download</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left section */}
        <div className="flex-1 space-y-6">
          <section>
            <h3 className="text-gray-300 font-medium mb-2">Primary Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Info label="Product name" value={product.name} />
              <Info label="Product ID" value={product.id} />
              <Info label="Product category" value={product.category} />
              <Info label="Expiry Date" value={product.expiry} />
              <Info
                label="Threshold Value"
                value={product.threshold.toString()}
              />
            </div>
          </section>

          <section>
            <h3 className="text-gray-300 font-medium mb-2">Supplier Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Info label="Supplier name" value={product.supplier.name} />
              <Info label="Contact Number" value={product.supplier.contact} />
            </div>
          </section>

          <section>
            <h3 className="text-gray-300 font-medium mb-2">Stock Locations</h3>
            <div className="border border-gray-600 rounded overflow-hidden">
              <div className="flex justify-between bg-gray-700 px-4 py-2 font-semibold">
                <span>Store Name</span>
                <span>Stock in hand</span>
              </div>
              {product.locations.map((loc, idx) => (
                <div
                  key={idx}
                  className="flex justify-between px-4 py-2 border-t border-gray-700"
                >
                  <span>{loc.store}</span>
                  <span>{loc.stock}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right section (Image & Stock Summary) */}
        <div className="w-full md:w-60 space-y-4">
          <img
            src={product.image}
            alt="Product"
            className="w-full h-auto rounded border border-gray-600"
          />
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Opening Stock</span>
              <span>{product.stocks.opening}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Remaining Stock</span>
              <span>{product.stocks.remaining}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">On the way</span>
              <span>{product.stocks.onTheWay}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Threshold value</span>
              <span>{product.threshold}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default ProductDetail;
