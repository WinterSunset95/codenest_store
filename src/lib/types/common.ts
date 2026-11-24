// This file contains data types and interfaces that are common across all games/products
import type { FieldValue, Timestamp } from 'firebase/firestore';

/**
 * Use FirestoreTimestamp for reading docs from Firestore.
 * Use FirestoreWriteTimestamp when writing with serverTimestamp().
 */
export type FirestoreTimestamp = Timestamp;
export type FirestoreWriteTimestamp = Timestamp | FieldValue;

/** All prices are stored in INR (₹) as numbers (e.g., 145 or 127.5). */
export type InrAmount = number;

/** Extend this union as you add more games to the CMS. */
export type GameSlug = 'mlbb' | 'bgmi';

/** Dynamic form field definition stored on each GameConfig doc in Firestore. */
export interface AccountFieldDefinition {
  key: string;             // e.g. "uid", "zoneId", "characterId"
  label: string;           // e.g. "User ID", "Zone ID"
  placeholder: string;     // e.g. "123456789"
  pattern: string;         // Regex string for client validation, e.g. "^[0-9]{6,12}$"
  helpText?: string;       // e.g. "Tap your avatar in-game; Zone ID is in brackets"
  required: boolean;
}

export interface AuditTimestamps {
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export type AuthProviderType = 'anonymous' | 'password' | 'google.com';

export type AdminRole = 'owner' | 'operator';

/** Stored at `${PREFIX}admins/{uid}` to gate admin UI and Firestore rules. */
export interface AdminRecord {
  uid: string;
  email: string;
  displayName: string;
  role: AdminRole;
  isActive: boolean;
  addedAt: FirestoreTimestamp;
}

/** Stored at `${PREFIX}users/{uid}` (created lazily on first checkout or profile save). */
export interface ShopUserProfile {
  uid: string;
  isAnonymous: boolean;
  email: string | null;
  displayName: string | null;
  whatsappNumber?: string;
  /** Saves the player's last-used UIDs so repeat buyers don't retype them. */
  savedAccounts?: Partial<Record<GameSlug, Record<string, string>>>;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

