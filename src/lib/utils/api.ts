import { mlbbUserReqErr, type MlbbUser } from "#lib/types/mlbb.ts";

export const fetchMlbbAccount = async (id: string, server: string): Promise<MlbbUser> => {
  //https://api.isan.eu.org/nickname/ml?id={id}&zone={server}
  try {
    const res = await fetch(`https://api.isan.eu.org/nickname/ml?id=${id}&zone=${server}`);
    const data = await res.json() as MlbbUser
    return data
  } catch (e) {
    console.log(e)
    return mlbbUserReqErr
  }
}
