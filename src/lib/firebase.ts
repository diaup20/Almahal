import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, getDoc as firestoreGetDoc, getDocs as firestoreGetDocs, DocumentReference, Query, DocumentData } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';
import firebaseConfig from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Safe Analytics initialization to prevent "Failed to fetch" errors when measurementId is missing or network fails
export const analytics = (typeof window !== 'undefined' && firebaseConfig.measurementId)
  ? isSupported().then(yes => yes ? getAnalytics(app) : null).catch(() => null)
  : Promise.resolve(null);

// Safe wrapper for getDoc with timeout & fallback to handle offline mode seamlessly
export async function safeGetDoc<T = DocumentData>(docRef: DocumentReference<T>, timeoutMs = 4000) {
  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Firestore operation timed out')), timeoutMs)
    );
    return await Promise.race([firestoreGetDoc(docRef), timeoutPromise]);
  } catch {
    return { exists: () => false, data: () => undefined } as any;
  }
}

// Safe wrapper for getDocs with timeout & fallback
export async function safeGetDocs<T = DocumentData>(queryRef: Query<T>, timeoutMs = 4000) {
  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Firestore operation timed out')), timeoutMs)
    );
    return await Promise.race([firestoreGetDocs(queryRef), timeoutPromise]);
  } catch {
    return { empty: true, docs: [] } as any;
  }
}

