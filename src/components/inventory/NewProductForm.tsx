import { useState } from "react";
import { db } from "@/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categoryOptions = [
  "Vegetables",
  "Fruits",
  "Snacks",
  "Beverages",
  "Dairy",
];
const unitOptions = ["kg", "litre", "piece", "dozen"];

type NewProductProps = {
  onClose: () => void;
};

const NewProduct = ({ onClose }: NewProductProps) => {
  const [formData, setFormData] = useState({
    name: "",
    productId: "",
    category: "",
    price: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    threshold: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name) errs.name = "Product name is required";
    if (!formData.productId) errs.productId = "Product ID is required";
    if (!formData.category) errs.category = "Category is required";
    if (!formData.unit) errs.unit = "Unit is required";
    if (!formData.price || isNaN(Number(formData.price)))
      errs.price = "Valid price is required";
    if (!formData.quantity || isNaN(Number(formData.quantity)))
      errs.quantity = "Valid quantity is required";
    if (!formData.expiryDate) errs.expiryDate = "Expiry date is required";
    if (!formData.threshold || isNaN(Number(formData.threshold)))
      errs.threshold = "Valid threshold value required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, "products"), {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        threshold: parseInt(formData.threshold),
      });
      alert("Product added successfully!");
      setFormData({
        name: "",
        productId: "",
        category: "",
        price: "",
        quantity: "",
        unit: "",
        expiryDate: "",
        threshold: "",
      });
      setErrors({});
      onClose(); // ✅ Close form on submit
    } catch (err) {
      console.error("Error adding product:", err);
    }
    setSubmitting(false);
  };

  return (
    <Card className="bg-[#0f1c3f] text-white max-w-md w-full z-50">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">New Product</h2>

        {[
          { label: "Product Name", id: "name", type: "text" },
          { label: "Product ID", id: "productId", type: "text" },
          { label: "Buying Price", id: "price", type: "number" },
          { label: "Quantity", id: "quantity", type: "number" },
          { label: "Expiry Date", id: "expiryDate", type: "date" },
          { label: "Threshold Value", id: "threshold", type: "number" },
        ].map(({ label, id, type }) => (
          <div key={id}>
            <Label htmlFor={id} className="text-sm">
              {label}
            </Label>
            <Input
              id={id}
              type={type}
              placeholder={`Enter ${label.toLowerCase()}`}
              value={(formData as any)[id]}
              onChange={handleChange}
              className="mt-1 bg-[#162447] text-white border border-gray-600"
            />
            {errors[id] && <p className="text-red-400 text-sm">{errors[id]}</p>}
          </div>
        ))}

        <div>
          <Label htmlFor="category" className="text-sm">
            Category
          </Label>
          <select
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-[#162447] border border-gray-600 text-white rounded"
          >
            <option value="">Select Category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-400 text-sm">{errors.category}</p>
          )}
        </div>

        <div>
          <Label htmlFor="unit" className="text-sm">
            Unit
          </Label>
          <select
            id="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-[#162447] border border-gray-600 text-white rounded"
          >
            <option value="">Select Unit</option>
            {unitOptions.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          {errors.unit && <p className="text-red-400 text-sm">{errors.unit}</p>}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            className="text-white border-gray-500"
            onClick={onClose}
            disabled={submitting}
          >
            Discard
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-black"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Add Product"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewProduct;
