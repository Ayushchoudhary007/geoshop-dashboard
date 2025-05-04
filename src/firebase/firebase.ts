// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvujyqnkp9xtP1aj26MxtyFXkWKFGYAi0",
  authDomain: "geo-shop-1d861.firebaseapp.com",
  projectId: "geo-shop-1d861",
  storageBucket: "geo-shop-1d861.firebasestorage.app",
  messagingSenderId: "27013650547",
  appId: "1:27013650547:web:3f1b8884060a99bd2b7206",
  measurementId: "G-46841FWWXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const auth = getAuth(app);
// 👇 Ensures user stays logged in across tabs and browser restarts
setPersistence(auth, browserLocalPersistence).catch((error) =>
  console.error("Failed to set persistence:", error)
);

export { auth };