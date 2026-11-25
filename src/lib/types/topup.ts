import type { GameSlug } from '#lib/types/common.ts';

export interface TopUpItem {
  id: string;
  gameSlug: GameSlug;
  category: string;
  title: string;
  subtitle?: string;
  priceInr: number;
  mrpInr?: number;
  badge?: string;      // e.g., "BESTSELLER", "HOT"
  inStock: boolean;
}
