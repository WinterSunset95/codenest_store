// #lib/types/game.ts

export const Routes = ['/', '/mlbb', '/bgmi', '/genshin', '/valorant'] as const;
export type Route = (typeof Routes)[number];

export interface HomePageCard {
  id: string;
  image: string;
  label: string;
  page: Route;
  badge?: string;
}
