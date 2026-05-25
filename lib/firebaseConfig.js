/**
 * firebaseConfig.js
 * Initialise Firebase SDK for Auth + Firestore + Storage.
 *
 * Add your Firebase project credentials to .env.local:
 *   NEXT_PUBLIC_FIREBASE_API_KEY=...
 *   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
 *   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
 *   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
 *   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
 *   NEXT_PUBLIC_FIREBASE_APP_ID=...
 *
 * Install:  npm install firebase
 */

// import { initializeApp, getApps } from "firebase/app";
// import { getAuth }      from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage }   from "firebase/storage";

// const firebaseConfig = {
//   apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// export const auth    = getAuth(app);
// export const db      = getFirestore(app);
// export const storage = getStorage(app);

// ── Firestore helpers (production) ──────────────────────────────────────────

// import { doc, getDoc, setDoc, updateDoc, increment, collection,
//          addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";

/**
 * Fetch a user's profile document from Firestore.
 */
// export const getUserProfile = (uid) => getDoc(doc(db, "users", uid));

/**
 * Create a new user document after registration.
 */
// export const createUserProfile = (uid, data) =>
//   setDoc(doc(db, "users", uid), { ...data, createdAt: serverTimestamp() });

/**
 * Add a scan to the user's scanHistory subcollection and increment points.
 */
// export const saveScan = async (uid, scanData) => {
//   await addDoc(collection(db, "users", uid, "scanHistory"), {
//     ...scanData,
//     scannedAt: serverTimestamp(),
//   });
//   await updateDoc(doc(db, "users", uid), {
//     points:   increment(scanData.ecoPoints),
//     xp:       increment(scanData.ecoPoints),
//     recycled: increment(1),
//   });
// };

export {}; // placeholder — uncomment above when Firebase is installed