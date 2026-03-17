// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2MKuCmEWrN4EqQ2M9bWqhfi25hHMrHvg",
  authDomain: "aiimagegenerate-76096.firebaseapp.com",
  projectId: "aiimagegenerate-76096",
  storageBucket: "aiimagegenerate-76096.firebasestorage.app",
  messagingSenderId: "445151421151",
  appId: "1:445151421151:web:5f4b012b35f5464e84ff6a",
  measurementId: "G-FRPKM87YZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);