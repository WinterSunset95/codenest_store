// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtoZCPD6wqL4DrakoEJU-T7r81x4zPnS0",
  authDomain: "winter-f3cb5.firebaseapp.com",
  projectId: "winter-f3cb5",
  storageBucket: "winter-f3cb5.firebasestorage.app",
  messagingSenderId: "548025054656",
  appId: "1:548025054656:web:7ee2bd92a05d19b358c425",
  measurementId: "G-119JRP69JP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
auth.tenantId = import.meta.env.VITE_FIREBASE_AUTH_TENANT_ID;

if (import.meta.env.DEV) {
  console.log("LOCAL YAY")
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}
console.log("DEFINITELY NOT LOCAL")
