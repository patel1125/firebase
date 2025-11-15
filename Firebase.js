import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCOS6N8lGXRHyn715ZQEr9KDuJVrue_ECg",
  authDomain: "fire-base-a14e6.firebaseapp.com",
  projectId: "fire-base-a14e6",
  storageBucket: "fire-base-a14e6.firebasestorage.app",
  messagingSenderId: "338964403857",
  appId: "1:338964403857:web:41a9f639524edcf9bf1130",
  measurementId: "G-J8GPR5L9PH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
export default app;
