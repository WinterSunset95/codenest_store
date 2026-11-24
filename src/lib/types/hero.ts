export interface Hero {
  id: string;
  title: string;
  subtitle: string;
  imageDesktopUrl: string; // Widescreen banner
  imageMobileUrl: string;  // Slightly square / portrait banner
  url: string;
  gameBadge: string;
  discountBadge?: string;
  imageAlt?: string;
}
