import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NewProduct from "@/components/inventory/NewProductForm";
import ProductDetail from "@/components/inventory/ProductDetail"; // updated to accept product prop

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  threshold: number;
  expiryDate: string;
  imageUrl?: string; // optional if not always present
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
    <div className="space-y-4 relative min-h-screen">
      {/* Overlayed New Product Form */}
      {showNewProductForm && (
        <div className="absolute inset-0 z-50 bg-black/50 flex justify-center items-center pt-25 w-full">
          <NewProduct onClose={() => setShowNewProductForm(false)} />
        </div>
      )}

      {selectedProduct && (
        <div className="absolute inset-0 z-50 bg-black/50 flex justify-center items-center pt-25 w-full">
          <div className="bg-[#0f1c3f] rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-4xl relative">
            <ProductDetail
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          </div>
        </div>
      )}

      <Card className="bg-[#0f1c3f] text-white w-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Products</h2>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="bg-blue-600 text-black"
                onClick={() => {
                  setShowNewProductForm((prev) => !prev);
                  setSelectedProduct(null); // hide details if open
                }}
              >
                {showNewProductForm ? "Close Form" : "Add Product"}
              </Button>
              <Button variant="outline" className="border-gray-500 text-black">
                Filters
              </Button>
              <Button variant="outline" className="border-gray-500 text-black">
                Download all
              </Button>
            </div>
          </div>

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
                      "Threshold",
                      "Expiry",
                      "Availability",
                    ].map((h) => (
                      <th key={h} className="py-2 px-3 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => (
                    <tr
                      key={prod.id}
                      className="border-b border-gray-700 cursor-pointer hover:bg-[#1a2b5c]"
                      onClick={() => {
                        setSelectedProduct(prod);
                        setShowNewProductForm(false); // hide form if open
                      }}
                    >
                      <td className="py-2 px-3">{prod.name}</td>
                      <td className="py-2 px-3">₹{prod.price}</td>
                      <td className="py-2 px-3">{prod.quantity} Packets</td>
                      <td className="py-2 px-3">{prod.threshold} Packets</td>
                      <td className="py-2 px-3">{prod.expiryDate}</td>
                      <td className="py-2 px-3">
                        {getAvailability(prod.quantity, prod.threshold)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductList;
