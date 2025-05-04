import { useState } from "react";
import { db, storage } from "@/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

const NewProduct = () => {
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
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
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
    if (!file) errs.file = "Product image is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpload = async () => {
    if (!file) return "";
    const imageRef = ref(storage, `products/${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);
    try {
      const imageUrl = await handleUpload();
      await addDoc(collection(db, "products"), {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        threshold: parseInt(formData.threshold),
        imageUrl,
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
      setFile(null);
      setImageUrl("");
      setErrors({});
    } catch (err) {
      console.error("Error adding product:", err);
    }
    setSubmitting(false);
  };

  return (
    <Card className="bg-[#0f1c3f] text-white max-w-md mx-auto">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">New Product</h2>

        {/* Image Upload */}
        <div className="flex flex-col items-center border border-dashed border-gray-500 p-4 rounded-md">
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-20 h-20 object-cover rounded"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-300 rounded mb-2" />
          )}
          <p className="text-sm text-gray-400">
            Drag image here <span className="text-blue-400">or</span>
          </p>
          <label className="text-blue-400 cursor-pointer text-sm mt-1">
            Browse image
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
          {errors.file && <p className="text-red-400 text-sm">{errors.file}</p>}
        </div>

        {/* Input Fields */}
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

        {/* Category Dropdown */}
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

        {/* Unit Dropdown */}
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

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            className="text-white border-gray-500"
            onClick={() => window.location.reload()}
            disabled={submitting}
          >
            Discard
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
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
