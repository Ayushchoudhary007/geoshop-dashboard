import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { toast } from "sonner";

// Type for card
type CardType = {
  id: string;
  label: string;
  expiry: string;
};

// User email should ideally come from context
const userEmail = "john@example.com";
const billingDoc = doc(db, "billing", userEmail);

export default function BillingForm() {
  const [paymentOptions, setPaymentOptions] = useState<CardType[]>([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    state: "",
    zip: "",
  });

  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({ number: "", expiry: "" });

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const snap = await getDoc(billingDoc);
        if (snap.exists()) {
          const data = snap.data();
          setForm({
            fullName: data.fullName || "",
            address: data.address || "",
            state: data.state || "",
            zip: data.zip || "",
          });
          setPaymentOptions(data.cards || []);
          setSelectedPayment(data.paymentMethod || "");
        }
      } catch (err) {
        console.error("Error fetching billing data:", err);
      }
    };
    fetchBillingData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await setDoc(
        billingDoc,
        {
          ...form,
          paymentMethod: selectedPayment,
        },
        { merge: true }
      );
      toast.success("Billing information saved!");
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save billing info.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({ fullName: "", address: "", state: "", zip: "" });
  };

  const validateCard = (): boolean => {
    const { number, expiry } = newCard;

    if (!/^\d{16}$/.test(number)) {
      toast.error("Card number must be 16 digits.");
      return false;
    }

    const match = expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!match) {
      toast.error("Expiry format should be MM/YY.");
      return false;
    }

    const [_, mm, yy] = match;
    const expiryMonth = parseInt(mm) - 1; // zero-indexed months
    const expiryYear = 2000 + parseInt(yy);

    const expiryDate = new Date(expiryYear, expiryMonth + 1, 0); // end of month
    const now = new Date();

    if (expiryDate < now) {
      toast.error("Card has expired.");
      return false;
    }

    return true;
  };

  const handleAddCard = async () => {
    if (!validateCard()) return;

    const last4 = newCard.number.slice(-4);
    const id = `card-${Date.now()}`;
    const label = `Card **** ${last4}`;
    const cardData: CardType = { id, label, expiry: newCard.expiry };

    try {
      await updateDoc(billingDoc, {
        cards: arrayUnion(cardData),
      });

      setPaymentOptions((prev) => [...prev, cardData]);
      setSelectedPayment(id);
      setNewCard({ number: "", expiry: "" });
      setShowAddCard(false);
      toast.success("Card added successfully.");
    } catch (err) {
      console.error("Error adding card:", err);
      toast.error("Failed to add card.");
    }
  };

  const handleRemoveCard = async (id: string) => {
    const cardToRemove = paymentOptions.find((card) => card.id === id);
    if (!cardToRemove) {
      toast.error("Card not found.");
      return;
    }

    try {
      await updateDoc(billingDoc, {
        cards: arrayRemove(cardToRemove),
      });

      const updated = paymentOptions.filter((card) => card.id !== id);
      setPaymentOptions(updated);

      if (selectedPayment === id) {
        setSelectedPayment(updated[0]?.id || "");
      }

      toast.success("Card removed.");
    } catch (err) {
      console.error("Error removing card:", err);
      toast.error("Failed to remove card.");
    }
  };

  return (
    <div className="flex justify-center bg-blue-900 rounded-3xl p-2 m-0.5  max-w-6xl ">
      <Card className="bg-background text-foreground max-w-5xl mx-auto mt-2 rounded-2xl shadow-sm w-full">
        <CardContent className="p-8 space-y-10">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Methods</h3>
            <p className="text-sm text-muted-foreground">
              Select your preferred card.
            </p>

            <RadioGroup
              value={selectedPayment}
              onValueChange={setSelectedPayment}
              className="space-y-4 pt-2"
            >
              {paymentOptions.map((card) => (
                <div
                  key={card.id}
                  className={`flex items-center justify-between p-5 rounded-2xl ${
                    selectedPayment === card.id
                      ? "bg-[#1B2A49] border border-blue-500"
                      : "bg-[#1B2A49]"
                  } transition-all`}
                >
                  <RadioGroupItem
                    value={card.id}
                    id={card.id}
                    className="h-5 w-5"
                  />
                  <label
                    htmlFor={card.id}
                    className="flex flex-col flex-grow pl-4 cursor-pointer"
                  >
                    <span className="text-base font-semibold">
                      {card.label}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Expires {card.expiry}
                    </span>
                  </label>
                  <button
                    onClick={() => handleRemoveCard(card.id)}
                    className="ml-4 text-red-400 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </RadioGroup>

            <Button
              variant="secondary"
              className="w-full mt-2 bg-[#0E1117] text-blue-400 hover:underline hover:bg-[#0E1117]"
              onClick={() => setShowAddCard(!showAddCard)}
            >
              + {showAddCard ? "Cancel" : "Add a new payment method"}
            </Button>

            {showAddCard && (
              <div className="mt-4 space-y-4 bg-[#1B2A49] p-4 rounded-xl">
                <Input
                  placeholder="Card Number (16 digits)"
                  value={newCard.number}
                  onChange={(e) =>
                    setNewCard({ ...newCard, number: e.target.value })
                  }
                  className="bg-[#0e11177e] text-white"
                />
                <Input
                  placeholder="Expiry Date (MM/YY)"
                  value={newCard.expiry}
                  onChange={(e) =>
                    setNewCard({ ...newCard, expiry: e.target.value })
                  }
                  className="bg-[#0e11177e] text-white"
                />
                <Button
                  onClick={handleAddCard}
                  className="bg-blue-600 hover:bg-blue-700 text-black"
                >
                  Add Card
                </Button>
              </div>
            )}
          </div>

          <hr className="border-t border-slate-700" />

          {/* Billing Details */}
          <div className="space-y-6 pt-2">
            <h3 className="text-lg font-semibold">Billing Address</h3>
            <p className="text-sm text-muted-foreground">
              Please fill in your billing details below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Full name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="bg-[#0e1117dc] text-white"
              />
              <Input
                placeholder="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="bg-[#0e1117dc] text-white"
              />
              <Input
                placeholder="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                className="bg-[#0e1117dc] text-white"
              />
              <Input
                placeholder="Zip code"
                name="zip"
                value={form.zip}
                onChange={handleChange}
                className="bg-[#0e1117dc] text-white"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="text-muted-foreground border-slate-700 hover:bg-[#1B2A49]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="text-muted-foreground border-slate-900 hover:bg-[#1B2A49]"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
