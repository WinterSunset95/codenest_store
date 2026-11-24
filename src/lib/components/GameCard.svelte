<script lang="ts">
  import type { HomePageCard } from '#lib/types/game.ts';
  import { Badge } from '#lib/components/ui/badge/index.ts';

  let { card }: { card: HomePageCard } = $props();
</script>

<a 
  href={card.page}
  class="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  aria-label="Top up {card.label}"
>
  <!-- Image Container -->
  <div class="relative aspect-[4/3] w-full overflow-hidden bg-muted sm:aspect-[3/2]">
    <img 
      src={card.image} 
      alt={card.label} 
      loading="lazy"
      class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    
    <!-- Optional Badge Overlay -->
    {#if card.badge}
      <div class="absolute right-2 top-2">
        <Badge variant="secondary" class="bg-background/80 text-foreground backdrop-blur-sm">
          {card.badge}
        </Badge>
      </div>
    {/if}
  </div>

  <!-- Label Container -->
  <div class="flex flex-1 items-center justify-between p-3 sm:p-4">
    <span class="font-semibold tracking-tight text-foreground line-clamp-1">
      {card.label}
    </span>
    
    <!-- Subtle arrow that slides in slightly on hover -->
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      class="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
    >
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  </div>
</a>
