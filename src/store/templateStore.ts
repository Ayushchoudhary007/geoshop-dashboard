// store/templateStore.ts
import { create } from "zustand";
import { db } from "@/firebase/firebase";
import { auth } from "@/firebase/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

type TemplateStore = {
  assignments: Record<string, string[]>; // page -> template IDs
  setTemplatesForPage: (page: string, templates: string[]) => void;
  fetchTemplatesForUser: () => void;
};

export const useTemplateStore = create<TemplateStore>((set) => ({
  assignments: {},

  setTemplatesForPage: async (page, templates) => {
    const user = auth.currentUser;
    if (!user) return;

    // Save in Firestore
    const docRef = doc(db, "users", user.uid, "assignments", page);
    await setDoc(docRef, { templates });

    // Update local Zustand store
    set((state) => ({
      assignments: {
        ...state.assignments,
        [page]: templates,
      },
    }));
  },

  fetchTemplatesForUser: () => {
    const user = auth.currentUser;
    if (!user) return;

    // Replace with dynamic page names if needed
    const pages = ["Home", "Analysis", "Report"];
    pages.forEach((page) => {
      const docRef = doc(db, "users", user.uid, "assignments", page);
      onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
          const { templates } = snap.data();
          set((state) => ({
            assignments: {
              ...state.assignments,
              [page]: templates,
            },
          }));
        }
      });
    });
  },
}));
