// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-market-99f50.firebaseapp.com",
  projectId: "car-market-99f50",
  storageBucket: "car-market-99f50.appspot.com",
  messagingSenderId: "754894102099",
  appId: "1:754894102099:web:dfdcb32cea07ead4c1f0a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)