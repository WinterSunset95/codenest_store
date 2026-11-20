
// From https://api.isan.eu.org/nickname/ml?id={id}&zone={server}
export interface MlbbTargetAccount {
  success: boolean,
  game: string,
  id: number,
  server: number,
  name: string,
  country?: string,
}

export const mlbbUserReqErr: MlbbTargetAccount = {
  success: false,
  game: "",
  id: 0,
  server: 0,
  name: "",
  country: ""
}

export type MlbbPackCategory =
  | 'diamonds'
  | 'weekly_pass'
  | 'twilight_pass'
  | 'event_bundle';

export type MlbbSupportedRegion = 'global_in' | 'sea_id_my_sg' | 'br' | 'ru';

// /** Exact player target fields required to fulfill an MLBB top-up. */
// export interface MlbbTargetAccount {
//   uid: string;            // 6–12 digits
//   zoneId: string;         // 4–5 digits (server/zone ID)
//   verifiedIgn?: string;   // Populated if you add an IGN lookup check later
// }

/** Optional MLBB-specific metadata attached to a Sku document. */
export interface MlbbSkuMeta {
  category: MlbbPackCategory;
  baseDiamonds?: number;
  bonusDiamonds?: number;
  /**
   * Crucial for MLBB recharge events (KOF, Aspirants, Star Wars):
   * e.g., Weekly Diamond Pass grants 220 total diamonds over 7 days,
   * but only counts as 100 diamonds toward recharge tasks.
   */
  eventTaskDiamondValue?: number;
  /** e.g., Weekly Diamond Pass max stack limit */
  maxQuantityPerOrder?: number;
  excludedRegions?: MlbbSupportedRegion[];
}
