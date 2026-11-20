// submodules/svelte-shop/src/lib/db-paths.ts

// src/lib/db-paths.ts
const RAW_PREFIX = (
  import.meta.env.VITE_DB_PREFIX ?? 'tenants/codenest-store-vwtom'
).replace(/^\/+|\/+$/g, '');

function joinPath(segment: string): string {
  return RAW_PREFIX ? `${RAW_PREFIX}/${segment}` : segment;
}

export const DB_PATHS = {
  admins: joinPath('admins'),
  storefrontManifest: joinPath('config/storefront'),
  paymentSettings: joinPath('config/payment_settings'),
  games: joinPath('games'),
  events: joinPath('events'),
  skus: joinPath('skus'),
  skuSecrets: joinPath('sku_secrets'),
  orders: joinPath('orders'),
  usedUtrs: joinPath('used_utrs'),
  users: joinPath('users'),
} as const;

export const STORAGE_PATHS = {
  banners: (eventId: string, filename: string) =>
    joinPath(`banners/${eventId}/${filename}`),
  paymentProofs: (uid: string, orderId: string, ext: string) =>
    joinPath(`payment_proofs/${uid}/${orderId}.${ext}`),
} as const;
