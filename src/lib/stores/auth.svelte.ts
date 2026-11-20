// src/lib/stores/auth.svelte.ts
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  linkWithCredential,
  linkWithPopup,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '#lib/firebase.ts';
import { DB_PATHS } from '#lib/db-paths.ts';
import type { AdminRecord } from '#lib/types/index.ts';

const googleProvider = new GoogleAuthProvider();

class AuthStore {
  user = $state<User | null>(null);
  adminRecord = $state<AdminRecord | null>(null);
  adminCheckError = $state<string | null>(null);
  loading = $state(true);

  isAuthenticated = $derived(this.user !== null);
  isAnonymous = $derived(this.user?.isAnonymous ?? false);
  isAdmin = $derived(
    this.user !== null &&
      !this.user.isAnonymous &&
      this.adminRecord !== null &&
      this.adminRecord.isActive === true
  );

  constructor() {
    if (typeof window !== 'undefined') {
      onAuthStateChanged(auth, async (firebaseUser) => {
        this.user = firebaseUser;
        this.adminCheckError = null;

        if (firebaseUser && !firebaseUser.isAnonymous) {
          const adminDocRef = doc(db, DB_PATHS.admins, firebaseUser.uid);
          try {
            const snap = await getDoc(adminDocRef);
            if (!snap.exists()) {
              console.warn(`[auth] Admin doc not found at: ${adminDocRef.path}`);
              this.adminRecord = null;
            } else {
              const data = snap.data() as AdminRecord;
              if (data.isActive !== true) {
                console.warn(`[auth] Admin doc found at ${adminDocRef.path}, but isActive !== true:`, data);
              }
              this.adminRecord = data;
            }
          } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(`[auth] Failed to read ${adminDocRef.path}:`, err);
            this.adminCheckError = message;
            this.adminRecord = null;
          }
        } else {
          this.adminRecord = null;
        }

        this.loading = false;
      });
    }
  }

  async loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async signupWithEmail(email: string, password: string) {
    if (auth.currentUser?.isAnonymous) {
      const cred = EmailAuthProvider.credential(email, password);
      return linkWithCredential(auth.currentUser, cred);
    }
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async loginWithGoogle() {
    if (auth.currentUser?.isAnonymous) {
      try {
        return await linkWithPopup(auth.currentUser, googleProvider);
      } catch (err: unknown) {
        if ((err as { code?: string })?.code === 'auth/credential-already-in-use') {
          return signInWithPopup(auth, googleProvider);
        }
        throw err;
      }
    }
    return signInWithPopup(auth, googleProvider);
  }

  async continueAsGuest() {
    if (auth.currentUser) return auth.currentUser;
    const res = await signInAnonymously(auth);
    return res.user;
  }

  async logout() {
    await signOut(auth);
    this.adminRecord = null;
    this.adminCheckError = null;
  }
}

export const authStore = new AuthStore();
