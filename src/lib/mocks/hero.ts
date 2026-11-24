// #lib/data/mockHeroes.ts
import type { Hero } from '#lib/types/hero.ts';

export const mockHeroes: Hero[] = [
  {
    id: "evt-mlbb-01",
    title: "Game top-ups, paid with Razorpay.",
    subtitle: "Instant INR top-ups for MLBB, Magic Chess, BGMI & Genshin.",
    imageDesktopUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2100&h=900&auto=format&fit=crop",
    imageMobileUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&h=1000&auto=format&fit=crop",
    url: "/mlbb",
    gameBadge: "MLBB Recharge Event",
    discountBadge: "Up to 18% Off"
  },
  {
    id: "evt-bgmi-02",
    title: "Dominate the Battlegrounds.",
    subtitle: "Get bonus UC instantly delivered to your account.",
    imageDesktopUrl: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?q=80&w=2100&h=900&auto=format&fit=crop",
    imageMobileUrl: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?q=80&w=1000&h=1000&auto=format&fit=crop",
    url: "/bgmi",
    gameBadge: "BGMI UC Rush",
    discountBadge: "Bonus 60 UC"
  },
  {
    id: "evt-genshin-03",
    title: "Blessing of the Welkin Moon.",
    subtitle: "Secure your daily Primogems at the best rates in India.",
    imageDesktopUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2100&h=900&auto=format&fit=crop",
    imageMobileUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&h=1000&auto=format&fit=crop",
    url: "/genshin",
    gameBadge: "Genshin Impact",
  },
  {
    id: "evt-valo-04",
    title: "Unlock the latest Battlepass.",
    subtitle: "Valorant Points delivered directly via Riot ID.",
    imageDesktopUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b7738?q=80&w=2100&h=900&auto=format&fit=crop",
    imageMobileUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b7738?q=80&w=1000&h=1000&auto=format&fit=crop",
    url: "/valorant",
    gameBadge: "Valorant",
    discountBadge: "Instant Delivery"
  },
  {
    id: "evt-mlbb-05",
    title: "Magic Chess Go Go Pass",
    subtitle: "Level up your commanders and get exclusive chessboard skins.",
    imageDesktopUrl: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2100&h=900&auto=format&fit=crop",
    imageMobileUrl: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1000&h=1000&auto=format&fit=crop",
    url: "/mlbb-magic-chess",
    gameBadge: "Magic Chess",
    discountBadge: "-14% Off"
  }
];
