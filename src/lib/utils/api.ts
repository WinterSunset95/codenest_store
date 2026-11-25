import { mockGames } from "#lib/mocks/game.ts";
import { mockHeroes } from "#lib/mocks/hero.ts";
import { mockPopularItems } from "#lib/mocks/topup.ts";

import type { HomePageCard } from "#lib/types/game.ts";
import type { Hero } from "#lib/types/hero.ts";
import { mlbbUserReqErr, type MlbbTargetAccount } from "#lib/types/mlbb.ts";
import type { TopUpItem } from "#lib/types/topup.ts";

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchMlbbAccount = async (id: string, server: string): Promise<MlbbTargetAccount> => {
  //https://api.isan.eu.org/nickname/ml?id={id}&zone={server}
  try {
    const res = await fetch(`https://api.isan.eu.org/nickname/ml?id=${id}&zone=${server}`);
    const data = await res.json() as MlbbTargetAccount
    return data
  } catch (e) {
    console.log(e)
    return mlbbUserReqErr
  }
}

export const fetchHomePageCards = async (): Promise<HomePageCard[]> => {
  await delay(5000);
  return mockGames;
}

export const fetchHeroCards = async (): Promise<Hero[]> => {
  await delay(5000);
  return mockHeroes
}

export const fetchPopularTopups = async (): Promise<TopUpItem[]> => {
  await delay(5000);
  return mockPopularItems;
}
