import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  threshold: number;
  expiryDate: string;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getAvailability = (quantity: number, threshold: number) => {
    if (quantity <= 0)
      return <span className="text-red-500">Out of stock</span>;
    if (quantity <= threshold)
      return <span className="text-yellow-400">Low stock</span>;
    return <span className="text-green-500">In-stock</span>;
  };

  return (
    <Card className="bg-[#0f1c3f] text-white w-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Products</h2>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="bg-blue-600 text-white"
              onClick={() => navigate("/products/new")}
            >
              Add Product
            </Button>
            <Button variant="outline" className="border-gray-500 text-white">
              Filters
            </Button>
            <Button variant="outline" className="border-gray-500 text-white">
              Download all
            </Button>
          </div>
        </div>

        {/* Table or Loader */}
        {loading ? (
          <p className="text-gray-400">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-400">No products found in the database.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  {[
                    "Products",
                    "Buying Price",
                    "Quantity",
                    "Threshold Value",
                    "Expiry Date",
                    "Availability",
                  ].map((header) => (
                    <th key={header} className="py-2 px-3 font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id} className="border-b border-gray-700">
                    <td className="py-2 px-3">{prod.name || "N/A"}</td>
                    <td className="py-2 px-3">₹{prod.price ?? 0}</td>
                    <td className="py-2 px-3">{prod.quantity ?? 0} Packets</td>
                    <td className="py-2 px-3">{prod.threshold ?? 0} Packets</td>
                    <td className="py-2 px-3">
                      {prod.expiryDate || "Not Set"}
                    </td>
                    <td className="py-2 px-3">
                      {getAvailability(prod.quantity ?? 0, prod.threshold ?? 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && products.length > 0 && (
          <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
            <Button variant="outline" className="text-white border-gray-600">
              Previous
            </Button>
            <p>Page 1 of 10</p>
            <Button variant="outline" className="text-white border-gray-600">
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductList;
