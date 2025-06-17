import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

type Offer = {
  id: string;
  title: string;
  productId: string;
  discount: string;
};

export default function ProductOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [newOffer, setNewOffer] = useState({
    title: "",
    productId: "",
    discount: "",
  });

  const fetchOffers = async () => {
    const snapshot = await getDocs(collection(db, "offers"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Offer[];
    setOffers(data);
  };

  const handleAddOffer = async () => {
    if (!newOffer.title || !newOffer.productId || !newOffer.discount) return;
    await addDoc(collection(db, "offers"), newOffer);
    setNewOffer({ title: "", productId: "", discount: "" });
    fetchOffers();
  };

  const handleRemoveOffer = async (id: string) => {
    if (confirm("Are you sure you want to remove this offer?")) {
      await deleteDoc(doc(db, "offers", id));
      fetchOffers();
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="flex justify-center bg-blue-900 rounded-3xl p-2 m-0.5  max-w-6xl ">
      <div className="space-y-6 max-w-6xl  mt-2 w-full sm:p-8 ">
        <Card className="p-4 bg-muted text-black rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Create New Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              placeholder="Offer Title"
              value={newOffer.title}
              onChange={(e) =>
                setNewOffer({ ...newOffer, title: e.target.value })
              }
            />
            <Input
              placeholder="Product ID"
              value={newOffer.productId}
              onChange={(e) =>
                setNewOffer({ ...newOffer, productId: e.target.value })
              }
            />
            <Input
              placeholder="Discount %"
              value={newOffer.discount}
              onChange={(e) =>
                setNewOffer({ ...newOffer, discount: e.target.value })
              }
            />
          </div>
          <Button onClick={handleAddOffer} className="mt-4 text-black">
            Add Offer
          </Button>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">
            Available Offers
          </h3>
          {offers.map((offer) => (
            <Card
              key={offer.id}
              className="p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{offer.title}</p>
                <p className="text-sm text-muted-foreground">
                  Product ID: {offer.productId}
                </p>
                <p className="text-sm text-yellow-400">
                  Discount: {offer.discount}%
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => handleRemoveOffer(offer.id)}
              >
                <Trash2 className="text-red-500" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
