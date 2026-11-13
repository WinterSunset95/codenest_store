// This file contains data types and interfaces that are common across all games/products

const Routes = ['#', 'mlbb'] as const;
type Route = (typeof Routes)[number];

// Common card type for root route
export interface HomePageCard {
  image: string,
  label: string,
  page: Route,
}

