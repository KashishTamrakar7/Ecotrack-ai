/**
 * firebaseConfig.js
 * Combined Code: Firebase Console Credentials + Claude's Helper Functions
 */

import { initializeApp, getApps } from "firebase/app";
import { getAuth }      from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage }   from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Environment variables se credentials load ho rahe hain
const firebaseConfig = {
   apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
   authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
   projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
   appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Next.js (SSR) ke liye safe initialization
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Firebase services ko export kar rahe hain taaki baaki files use kar sakein
export const auth    = getAuth(app);
export const db      = getFirestore(app);
export const storage = getStorage(app);

// Analytics sirf browser env mein chalta hai, Next.js server par nahi
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// ── Firestore Helper Functions (Claude's Production Code) ────────────────────

import { doc, getDoc, setDoc, updateDoc, increment, collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Fetch a user's profile document from Firestore.
 */
export const getUserProfile = (uid) => getDoc(doc(db, "users", uid));

/**
 * Create a new user document after registration.
 */
export const createUserProfile = (uid, data) =>
   setDoc(doc(doc(db, "users", uid)), { ...data, createdAt: serverTimestamp() });

/**
 * Add a scan to the user's scanHistory subcollection and increment points.
 */
export const saveScan = async (uid, scanData) => {
   await addDoc(collection(db, "users", uid, "scanHistory"), {
     ...scanData,
     scannedAt: serverTimestamp(),
   });
   await updateDoc(doc(db, "users", uid), {
     points:   increment(scanData.ecoPoints),
     xp:       increment(scanData.ecoPoints),
     recycled: increment(1),
   });
};