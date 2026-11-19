import type {
  AccountFieldDefinition,
  AuditTimestamps,
  FirestoreTimestamp,
  GameSlug,
  InrAmount,
} from './common';
import type { MlbbSkuMeta } from './mlbb';
import type { BgmiSkuMeta } from './bgmi';

export type GameSkuMeta =
  | { gameSlug: 'mlbb'; gameMeta?: MlbbSkuMeta }
  | { gameSlug: 'bgmi'; gameMeta?: BgmiSkuMeta };

/** Document: `${PREFIX}games/{gameSlug}` */
export interface GameConfig extends AuditTimestamps {
  slug: GameSlug;
  name: string;
  shortName: string;              // e.g. "MLBB", "BGMI"
  publisher: string;
  iconUrl: string;
  isActive: boolean;
  sortOrder: number;
  restrictedRegionsNote?: string;
  accountFields: AccountFieldDefinition[];
}

/** Document: `${PREFIX}events/{eventId}` */
export interface StoreEvent extends AuditTimestamps {
  id: string;
  gameSlug: GameSlug;
  title: string;                  // e.g. "MLBB Aspirants Unite - Phase 1"
  subtitle: string;
  bannerDesktopUrl: string;
  bannerMobileUrl: string;
  badgeText?: string;             // e.g. "LIVE EVENT", "HOT"
  isEvent: boolean;               // true = promo event, false = evergreen catalog
  showOnHomepage: boolean;
  homepagePriority: number;       // Lower number appears first
  startsAt: FirestoreTimestamp | null;
  endsAt: FirestoreTimestamp | null;
  isActive: boolean;
}

/** Public Document: `${PREFIX}skus/{skuId}` */
export type Sku = {
  skuId: string;
  eventId: string;                // Links to StoreEvent.id (or "{gameSlug}-standard")
  title: string;
  subtitle?: string;
  imageUrl?: string;
  sellingPriceInr: InrAmount;
  mrpInr?: InrAmount;             // Strikethrough price for discount display
  badge?: string;                 // e.g. "BESTSELLER", "250 TASK"
  inStock: boolean;
  isActive: boolean;
  sortOrder: number;
} & GameSkuMeta &
  AuditTimestamps;

/** Admin/Bot-Only Document: `${PREFIX}sku_secrets/{skuId}` */
export interface SkuSecret extends AuditTimestamps {
  skuId: string;
  supplierPlatform: string;       // e.g. "unipin", "razer_gold", "manual_reseller"
  supplierSkuCode: string;        // Supplier product ID for future bot automation
  supplierCostInr: InrAmount;     // Your actual buy cost in ₹
  adminNotes?: string;
}

/** Combined Admin CMS view-model (never written back to a single doc) */
export interface AdminSkuWithSecret {
  sku: Sku;
  secret: SkuSecret | null;
}

/** Document: `${PREFIX}config/payment_settings` */
export interface PaymentSettings {
  isStoreOpen: boolean;
  closedNotice?: string;          // e.g. "Orders pause 1 AM – 8 AM IST"
  upiId: string;                  // e.g. "yourstore@okaxis"
  upiPayeeName: string;
  qrImageUrl: string;
  supportWhatsapp: string;        // e.g. "+919876543210"
  updatedAt: FirestoreTimestamp;
}

/**
 * Single-Read Public Storefront Snapshot: `${PREFIX}config/storefront`
 * Compiled and overwritten whenever an admin clicks "Publish Storefront".
 */
export interface StorefrontManifest {
  version: number;
  publishedAt: FirestoreTimestamp;
  publishedByUid: string;
  isStoreOpen: boolean;
  closedNotice?: string;
  games: GameConfig[];
  featuredEvents: StoreEvent[];
  skusByEvent: Record<string, Sku[]>;
}
