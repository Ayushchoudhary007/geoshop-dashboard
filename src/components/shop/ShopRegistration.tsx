import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  Timestamp,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

type Shop = {
  id?: string;
  name: string;
  address: string;
  owner: string;
  createdAt?: Timestamp;
};

const ShopRegistration: React.FC = () => {
  const [form, setForm] = useState({ name: "", address: "", owner: "" });
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
    owner: "",
  });

  const startEditing = (shop: Shop) => {
    setEditingId(shop.id || null);
    setEditForm({ name: shop.name, address: shop.address, owner: shop.owner });
  };

  const handleEditSubmit = async (id: string) => {
    try {
      const shopRef = doc(db, "shops", id);
      await updateDoc(shopRef, editForm);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating shop:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this shop?")) return;
    try {
      await deleteDoc(doc(db, "shops", id));
    } catch (error) {
      console.error("Error deleting shop:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "shops"), {
        ...form,
        createdAt: Timestamp.now(),
      });
      setForm({ name: "", address: "", owner: "" });
    } catch (error) {
      console.error("Error adding shop:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "shops"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Shop),
      }));
      setShops(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-10 max-w-2xl mx-auto">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-blue-700">
          Register a Shop
        </h2>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Shop Name"
          className="w-full p-3 text-sm placeholder-gray-700 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-md transition-all duration-200 ease-in-out"
          required
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-3 text-sm placeholder-gray-700 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-md transition-all duration-200 ease-in-out"
          required
        />
        <input
          type="text"
          name="owner"
          value={form.owner}
          onChange={handleChange}
          placeholder="Owner Name"
          className="w-full p-3 text-sm placeholder-gray-700 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-md transition-all duration-200 ease-in-out"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-black boarder border-gray-700 text-sm px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 shadow-sm focus:ring-blue-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Register Shop"}
        </button>
      </form>

      {/* Shop List */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Registered Shops
        </h3>
        {shops.length === 0 ? (
          <p className="text-gray-500">No shops registered yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {shops.map((shop) => (
              <li key={shop.id} className="py-3">
                {editingId === shop.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                    />
                    <input
                      type="text"
                      name="address"
                      value={editForm.address}
                      onChange={(e) =>
                        setEditForm({ ...editForm, address: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                    />
                    <input
                      type="text"
                      name="owner"
                      value={editForm.owner}
                      onChange={(e) =>
                        setEditForm({ ...editForm, owner: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSubmit(shop.id!)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">{shop.name}</p>
                      <p className="text-sm text-gray-600">{shop.address}</p>
                      <p className="text-sm text-gray-500 italic">
                        Owner: {shop.owner}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-xs text-gray-400">
                        {shop.createdAt?.toDate().toLocaleDateString()}
                      </p>
                      <div className="space-x-2 text-sm">
                        <button
                          onClick={() => startEditing(shop)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(shop.id!)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShopRegistration;
