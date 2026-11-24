// #lib/data/mockGames.ts
import type { HomePageCard } from '#lib/types/game.ts';

export const mockGames: HomePageCard[] = [
  {
    id: "game-mlbb",
    label: "Mobile Legends",
    page: "/mlbb",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    badge: "Fastest"
  },
  {
    id: "game-bgmi",
    label: "BGMI UC",
    page: "/bgmi",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop", // Replace with actual BGMI asset later
    badge: "Trending"
  },
  {
    id: "game-genshin",
    label: "Genshin Impact",
    page: "/genshin",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "game-valo",
    label: "Valorant",
    page: "/valorant",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b7738?q=80&w=800&auto=format&fit=crop"
  }
];
