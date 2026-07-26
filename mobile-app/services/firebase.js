import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Changed from getAuth
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'; // New import

const firebaseConfig = {
  apiKey: "AIzaSyCe1Hd_MkJ7RYTz1hvYIa01VtqiMMQMFXo",
  authDomain: "greendeal-50a04.firebaseapp.com",
  projectId: "greendeal-50a04",
  storageBucket: "greendeal-50a04.firebasestorage.app",
  messagingSenderId: "701726333859",
  appId: "1:701726333859:web:4d38db7ebd2dee5a439816"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth with Persistence so users stay logged in
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);