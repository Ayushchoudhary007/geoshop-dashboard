import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type ProductType = {
  name?: string;
  id?: string;
  category?: string;
  expiry?: string;
  threshold?: number;
  supplier?: {
    name?: string;
    contact?: string;
  };
  stocks?: {
    opening?: number;
    remaining?: number;
    onTheWay?: number;
  };
  locations?: {
    store: string;
    stock: number;
  }[];
  image?: string;
};

const fallbackImage = "/images/placeholder-logo.png";

const ProductDetail: React.FC<{
  product: ProductType;
  onClose?: () => void;
}> = ({ product, onClose }) => {
  const {
    name = "Unnamed Product",
    id = "N/A",
    category = "Unknown",
    expiry = "Not Provided",
    threshold = 0,
    supplier = {},
    stocks = {},
    locations = [],
    image,
  } = product;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative p-6 text-white"
    >
      {/* Close Button */}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <div className="flex gap-4">
          <Button variant="outline" className="text-black text-xl">
            Edit
          </Button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-black text-xl hover:text-red-400"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left section */}
        <div className="flex-1 space-y-6">
          <section>
            <h3 className="text-gray-300 font-medium mb-2">Primary Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Info label="Product name" value={name} />
              <Info label="Product ID" value={id} />
              <Info label="Product category" value={category} />
              <Info label="Expiry Date" value={expiry} />
              <Info label="Threshold Value" value={threshold.toString()} />
            </div>
          </section>

          <section>
            <h3 className="text-gray-300 font-medium mb-2">Supplier Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Info label="Supplier name" value={supplier.name || "N/A"} />
              <Info label="Contact Number" value={supplier.contact || "N/A"} />
            </div>
          </section>

          <section>
            <h3 className="text-gray-300 font-medium mb-2">Stock Locations</h3>
            <div className="border border-gray-600 rounded overflow-hidden">
              <div className="flex justify-between bg-gray-700 px-4 py-2 font-semibold">
                <span>Store Name</span>
                <span>Stock in hand</span>
              </div>
              {locations.length > 0 ? (
                locations.map((loc, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between px-4 py-2 border-t border-gray-700"
                  >
                    <span>{loc.store}</span>
                    <span>{loc.stock}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-400">
                  No locations available
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right section (Image & Stock Summary) */}
        <div className="w-full md:w-60 space-y-4">
          <img
            src={image || fallbackImage}
            alt="Product"
            className=" h-64 w-64 rounded border border-gray-600"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
          <div className="text-sm space-y-1">
            <StockLine label="Opening Stock" value={stocks.opening ?? 0} />
            <StockLine label="Remaining Stock" value={stocks.remaining ?? 0} />
            <StockLine label="On the way" value={stocks.onTheWay ?? 0} />
            <StockLine label="Threshold value" value={threshold} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const StockLine = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between">
    <span className="text-gray-400">{label}</span>
    <span>{value}</span>
  </div>
);

export default ProductDetail;
