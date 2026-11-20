import type {
  AuditTimestamps,
  FirestoreTimestamp,
  GameSlug,
  InrAmount,
} from './common';
import type { MlbbTargetAccount } from './mlbb';
import type { BgmiTargetAccount } from './bgmi';

export type OrderStatus =
  | 'pending_verification'
  | 'queued_for_fulfillment'
  | 'processing_fulfillment'
  | 'completed'
  | 'rejected'
  | 'refunded';

export type RejectionReasonCode =
  | 'duplicate_utr'
  | 'invalid_or_fake_utr'
  | 'amount_mismatch'
  | 'invalid_player_id'
  | 'unsupported_server_region'
  | 'out_of_stock'
  | 'other';

export interface OrderItemSnapshot {
  skuId: string;
  eventId: string;
  title: string;
  quantity: number;
  unitPriceInr: InrAmount;
  totalAmountInr: InrAmount;
}

export interface OrderPaymentProof {
  method: 'upi_manual';
  upiIdPaidTo: string;
  utrNumber: string;              // 12-digit UPI reference ID
  screenshotStoragePath: string;
  screenshotUrl: string;
  submittedAt: FirestoreTimestamp;
}

export interface OrderFulfillment {
  claimedBy: string | null;       // Admin UID or future bot worker ID
  claimedAt: FirestoreTimestamp | null;
  supplierPlatform: string | null;
  supplierOrderId: string | null;
  supplierCostInr: InrAmount | null;
  netProfitInr: InrAmount | null;
  rejectionCode: RejectionReasonCode | null;
  rejectionNote: string | null;
  completedAt: FirestoreTimestamp | null;
}

/** Discriminated union so `order.gameSlug === 'mlbb'` narrows `targetAccount`. */
export type OrderTarget =
  | { gameSlug: 'mlbb'; targetAccount: MlbbTargetAccount }
  | { gameSlug: 'bgmi'; targetAccount: BgmiTargetAccount };

/** Document: `${PREFIX}orders/{orderId}` */
export type Order = {
  id: string;
  orderNumber: string;            // Human-friendly e.g. "ORD-8F3K9"
  userId: string;
  isAnonymousBuyer: boolean;
  userEmail: string | null;
  userWhatsapp: string;
  item: OrderItemSnapshot;
  payment: OrderPaymentProof;
  status: OrderStatus;
  fulfillment: OrderFulfillment;
} & OrderTarget &
  AuditTimestamps;

/** Document: `${PREFIX}used_utrs/{utr12}` — atomic fraud lock */
export interface UsedUtrRecord {
  utrNumber: string;
  orderId: string;
  userId: string;
  createdAt: FirestoreTimestamp;
}
