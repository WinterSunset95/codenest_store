export type BgmiPackCategory = 'uc' | 'prime_plus' | 'royale_pass' | 'event_bundle';

export interface BgmiTargetAccount {
  characterId: string;    // 8–12 digits
  verifiedIgn?: string;
}

export interface BgmiSkuMeta {
  category: BgmiPackCategory;
  baseUc?: number;
  bonusUc?: number;
}
