// #lib/data/mockHeroes.ts
import type { Hero } from '#lib/types/hero.ts';
import Hero1 from '#lib/assets/hero.jpg'
import Hero2 from '#lib/assets/hero2.jpeg'
import Hero3 from '#lib/assets/hero3.jpeg'
import Hero4 from '#lib/assets/hero4.jpeg'
import Hero1Mobile from '#lib/assets/hero1-mobile.jpeg'
import Hero2Mobile from '#lib/assets/hero2-mobile.jpeg'
import Hero3Mobile from '#lib/assets/hero3-mobile.jpeg'
import Hero4Mobile from '#lib/assets/hero4-mobile.jpeg'

export const mockHeroes: Hero[] = [
  {
    id: "evt-mlbb-01",
    title: "Game top-ups, paid with Razorpay.",
    subtitle: "Instant INR top-ups for MLBB, Magic Chess, BGMI & Genshin.",
    imageDesktopUrl: Hero1,
    imageMobileUrl: Hero1Mobile,
    url: "/mlbb",
    gameBadge: "MLBB Recharge Event",
    discountBadge: "Up to 18% Off"
  },
  {
    id: "evt-bgmi-02",
    title: "Dominate the Battlegrounds.",
    subtitle: "Get bonus UC instantly delivered to your account.",
    imageDesktopUrl: Hero2,
    imageMobileUrl: Hero2Mobile,
    url: "/bgmi",
    gameBadge: "BGMI UC Rush",
    discountBadge: "Bonus 60 UC"
  },
  {
    id: "evt-genshin-03",
    title: "Blessing of the Welkin Moon.",
    subtitle: "Secure your daily Primogems at the best rates in India.",
    imageDesktopUrl: Hero3,
    imageMobileUrl: Hero3Mobile,
    url: "/genshin",
    gameBadge: "Genshin Impact",
  },
  {
    id: "evt-valo-04",
    title: "Unlock the latest Battlepass.",
    subtitle: "Valorant Points delivered directly via Riot ID.",
    imageDesktopUrl: Hero4,
    imageMobileUrl: Hero4Mobile,
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
