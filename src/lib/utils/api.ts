import { mockHomePageCards } from "#lib/mocks/common.ts";

import type { HomePageCard } from "#lib/types/common.ts";
import { mlbbUserReqErr, type MlbbTargetAccount } from "#lib/types/mlbb.ts";

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
  return mockHomePageCards;
}
