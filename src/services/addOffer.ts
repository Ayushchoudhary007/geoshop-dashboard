// addOffer.ts
import { db } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const createOffer = async ({
  shopId,
  productId,
  productName,
  title,
  discountType,
  discountValue,
  startDate,
  endDate
}: {
  shopId: string;
  productId: string;
  productName: string;
  title: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  startDate: Date;
  endDate: Date;
}) => {
  try {
    const offerRef = collection(db, "shops", shopId, "offers");
    await addDoc(offerRef, {
      productId,
      productName,
      title,
      discountType,
      discountValue,
      startDate,
      endDate,
      createdAt: serverTimestamp(),
      isActive: true
    });
    console.log("✅ Offer created successfully!");
  } catch (error) {
    console.error("❌ Error creating offer:", error);
  }
};
