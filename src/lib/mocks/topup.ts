import type { TopUpItem } from '#lib/types/topup.ts';

export const mockPopularItems: TopUpItem[] = [
  {
    id: "mlbb_weekly_pass",
    gameSlug: "mlbb",
    category: "MLBB",
    title: "Weekly Diamond Pass",
    subtitle: "80 Instant + 20/day for 7 days",
    priceInr: 145,
    mrpInr: 180,
    badge: "Bestseller",
    inStock: true
  },
  {
    id: "bgmi_uc_60",
    gameSlug: "bgmi",
    category: "BGMI",
    title: "60 UC",
    subtitle: "Instant BGMI Top-up",
    priceInr: 75,
    mrpInr: 89,
    inStock: true
  },
  {
    id: "mlbb_diamonds_284",
    gameSlug: "mlbb",
    category: "MLBB",
    title: "284 Diamonds",
    subtitle: "Completes 250 Recharge Task",
    priceInr: 380,
    mrpInr: 450,
    badge: "Event Task",
    inStock: true
  },
  {
    id: "genshin_welkin",
    gameSlug: "bgmi", // Re-using bgmi slug until genshin is added to your union
    category: "Genshin",
    title: "Blessing of the Welkin Moon",
    subtitle: "30 Days of Primogems",
    priceInr: 420,
    mrpInr: 449,
    badge: "Hot",
    inStock: true
  },
  {
    id: "valo_vp_475",
    gameSlug: "bgmi",
    category: "Valorant",
    title: "475 Valorant Points",
    subtitle: "Riot ID Direct Top-up",
    priceInr: 385,
    inStock: true
  },
  {
    id: "bgmi_uc_325",
    gameSlug: "bgmi",
    category: "BGMI",
    title: "300 + 25 UC",
    subtitle: "Bonus UC included",
    priceInr: 380,
    mrpInr: 449,
    inStock: true
  },
  {
    id: "mlbb_twilight_pass",
    gameSlug: "mlbb",
    category: "MLBB",
    title: "Twilight Pass",
    subtitle: "Unlock exclusive rewards",
    priceInr: 850,
    mrpInr: 999,
    inStock: false
  },
  {
    id: "genshin_crystal_300",
    gameSlug: "bgmi",
    category: "Genshin",
    title: "300 Genesis Crystals",
    subtitle: "UID Top-up",
    priceInr: 420,
    inStock: true
  },
  {
    id: "mlbb_diamonds_706",
    gameSlug: "mlbb",
    category: "MLBB",
    title: "706 Diamonds",
    subtitle: "Best value for Epic skins",
    priceInr: 950,
    mrpInr: 1150,
    badge: "-17%",
    inStock: true
  },
  {
    id: "bgmi_royale_pass",
    gameSlug: "bgmi",
    category: "BGMI",
    title: "Elite Royale Pass",
    subtitle: "Upgrade your season pass",
    priceInr: 850,
    inStock: true
  }
];
