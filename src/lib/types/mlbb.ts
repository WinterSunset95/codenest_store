
// From https://api.isan.eu.org/nickname/ml?id={id}&zone={server}
export interface MlbbUser {
  success: boolean,
  game: string,
  id: number,
  server: number,
  name: string,
  country?: string,
}

export const mlbbUserReqErr: MlbbUser = {
  success: false,
  game: "",
  id: 0,
  server: 0,
  name: "",
  country: ""
}
