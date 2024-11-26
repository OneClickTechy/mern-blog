// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mrjps-blog.firebaseapp.com",
  projectId: "mrjps-blog",
  storageBucket: "mrjps-blog.firebasestorage.app",
  messagingSenderId: "144761253067",
  appId: "1:144761253067:web:c773f2e900730dfd863f4e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);