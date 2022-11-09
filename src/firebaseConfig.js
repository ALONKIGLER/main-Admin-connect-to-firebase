// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIGk6cZ_nOG5XldyUFfrpYXK0DimYm440",
  authDomain: "one-of-many-c94a4.firebaseapp.com",
  projectId: "one-of-many-c94a4",
  storageBucket: "one-of-many-c94a4.appspot.com",
  messagingSenderId: "517723243433",
  appId: "1:517723243433:web:7b2b73d831d57d31ae3ab8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
