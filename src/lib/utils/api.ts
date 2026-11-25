import { doc, getDoc } from 'firebase/firestore';
import { db } from '#lib/firebase.ts';
import { DB_PATHS } from '#lib/db-paths.ts';
import type { StorefrontManifest } from '#lib/types/catalog.ts';

import type { HomePageCard, Route } from '#lib/types/game.ts';
import type { Hero } from '#lib/types/hero.ts';
import type { TopUpItem } from '#lib/types/topup.ts';
import { mlbbUserReqErr, type MlbbTargetAccount } from '#lib/types/mlbb.ts';
import { mockHeroes } from '#lib/mocks/hero.ts';
import { mockHomePageCards } from '#lib/mocks/common.ts';
import { mockPopularItems } from '#lib/mocks/topup.ts';

// Cached manifest so we don't refetch on every client-side route navigation
let cachedManifest: StorefrontManifest | null = null;

const getManifest = async (): Promise<StorefrontManifest> => {
  if (cachedManifest) return cachedManifest;
  
  try {
    const snap = await getDoc(doc(db, DB_PATHS.storefrontManifest));
    
    if (snap.exists()) {
      cachedManifest = snap.data() as StorefrontManifest;
      return cachedManifest;
    }
  } catch (error) {
    console.error("Error fetching manifest:", error);
  }
  
  // Return an empty skeleton if the document doesn't exist yet
  // so the mock data can still render without crashing.
  return {
    version: 0,
    publishedAt: null as any,
    publishedByUid: '',
    isStoreOpen: true,
    games: [],
    featuredEvents: [],
    skusByEvent: {}
  };
};

export const fetchMlbbAccount = async (id: string, server: string): Promise<MlbbTargetAccount> => {
  try {
    const res = await fetch(`https://api.isan.eu.org/nickname/ml?id=${id}&zone=${server}`);
    const data = await res.json() as MlbbTargetAccount;
    return data;
  } catch (e) {
    console.log(e);
    return mlbbUserReqErr;
  }
};

export const fetchHeroCards = async (): Promise<Hero[]> => {
  const manifest = await getManifest();
  
  // Map StoreEvent to UI Hero
  return [...manifest.featuredEvents.map(event => ({
    id: event.id,
    title: event.title,
    subtitle: event.subtitle,
    imageDesktopUrl: event.bannerDesktopUrl,
    imageMobileUrl: event.bannerMobileUrl,
    url: `/${event.gameSlug}`,
    gameBadge: event.gameSlug.toUpperCase(),
    discountBadge: event.badgeText,
    imageAlt: event.title
  })), ...mockHeroes];
};

export const fetchHomePageCards = async (): Promise<HomePageCard[]> => {
  const manifest = await getManifest();
  
  // Map GameConfig to UI HomePageCard
  return [...manifest.games.map(game => ({
    id: game.slug,
    image: game.iconUrl,
    label: game.name,
    page: `/${game.slug}` as Route,
    badge: game.restrictedRegionsNote ? "Info" : undefined
  })), ...mockHomePageCards];
};

export const fetchPopularTopups = async (): Promise<TopUpItem[]> => {
  const manifest = await getManifest();
  
  // Flatten the skusByEvent dictionary into a single array for the trending section
  const allSkus = Object.values(manifest.skusByEvent).flat();
  
  // Sort by sortOrder or price to decide what shows up in "Popular", then map to TopUpItem
  return [...allSkus
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(sku => ({
      id: sku.skuId,
      gameSlug: sku.gameSlug,
      category: sku.gameSlug.toUpperCase(),
      title: sku.title,
      subtitle: sku.subtitle,
      priceInr: sku.sellingPriceInr,
      mrpInr: sku.mrpInr,
      badge: sku.badge,
      inStock: sku.inStock
    })), ...mockPopularItems];
};
