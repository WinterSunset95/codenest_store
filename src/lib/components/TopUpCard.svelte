<script lang="ts">
  import type { TopUpItem } from '#lib/types/topup.ts';
  import { Badge } from '#lib/components/ui/badge/index.ts';
  import { Button } from '#lib/components/ui/button/index.ts';
  import ShoppingCartIcon from '@lucide/svelte/icons/shopping-cart';

  let { item }: { item: TopUpItem } = $props();

  const discountPercent = $derived(
    item.mrpInr && item.mrpInr > item.priceInr
      ? Math.round(((item.mrpInr - item.priceInr) / item.mrpInr) * 100)
      : 0
  );
</script>

<div class="relative flex h-full flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm">
  {#if item.badge || discountPercent > 0}
    <div class="absolute -top-2.5 right-3 flex gap-1">
      {#if discountPercent > 0}
        <Badge variant="destructive" class="px-1.5 text-[10px] uppercase shadow-sm">
          -{discountPercent}%
        </Badge>
      {/if}
      {#if item.badge}
        <Badge variant="secondary" class="bg-amber-500/10 px-1.5 text-[10px] uppercase text-amber-600 shadow-sm">
          {item.badge}
        </Badge>
      {/if}
    </div>
  {/if}

  <div class="flex flex-col gap-1 pb-4 pt-2">
    <span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
      {item.category}
    </span>
    <h3 class="font-semibold leading-tight text-foreground line-clamp-2">
      {item.title}
    </h3>
    {#if item.subtitle}
      <p class="text-xs text-muted-foreground line-clamp-1">
        {item.subtitle}
      </p>
    {/if}
  </div>

  <div class="flex items-end justify-between gap-2 border-t pt-3">
    <div class="flex flex-col">
      {#if item.mrpInr && item.mrpInr > item.priceInr}
        <span class="text-xs text-muted-foreground line-through decoration-muted-foreground/50">
          ₹{item.mrpInr}
        </span>
      {/if}
      <span class="text-lg font-bold tabular-nums leading-none text-foreground">
        ₹{item.priceInr}
      </span>
    </div>
    
    <Button 
      href={`/${item.gameSlug}?pack=${item.id}`} 
      variant={item.inStock ? "default" : "secondary"}
      size="sm" 
      class="h-8 gap-1.5 rounded-lg px-3"
      disabled={!item.inStock}
    >
      <ShoppingCartIcon class="size-3.5" />
      {item.inStock ? 'Buy' : 'Out of Stock'}
    </Button>
  </div>
</div>
