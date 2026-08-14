import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDUjbhIjL5qlZbcjfoBluGDL-E1BrWXU30",
  authDomain: "almahal-361ce.firebaseapp.com",
  projectId: "almahal-361ce",
  storageBucket: "almahal-361ce.firebasestorage.app",
  messagingSenderId: "291472540901",
  appId: "1:291472540901:web:850fe195e7c259f24b400c",
  measurementId: "G-LKQN8TT5RC"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
