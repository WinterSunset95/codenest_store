<script lang="ts">
  import type { Hero } from '#lib/types/hero.ts';
  import { Badge } from '#lib/components/ui/badge/index.ts';

  let { hero, isLcp = false }: { hero: Hero; isLcp?: boolean } = $props();
</script>

<a 
  href={hero.url} 
  class="group relative block w-full overflow-hidden rounded-xl border border-border bg-card transition-all hover:ring-2 hover:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  aria-label="View details for {hero.title}"
>
  <!-- 
    Aspect Ratios:
    Mobile (default): aspect-square (1:1) or aspect-[4/5] (slightly taller)
    Tablet (sm): aspect-video (16:9)
    Desktop (md): aspect-[21/9] (Ultra-wide banner)
  -->
  <div class="relative w-full aspect-square sm:aspect-video md:aspect-21/9 bg-muted">
    
    <!-- The picture element handles art direction natively -->
    <picture>
      <!-- Loads this source if viewport is 640px or wider -->
      <source media="(min-width: 640px)" srcset={hero.imageDesktopUrl} />
      
      <!-- Fallback and mobile source -->
      <img 
        src={hero.imageMobileUrl} 
        alt={hero.imageAlt ?? hero.title} 
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading={isLcp ? "eager" : "lazy"}
        fetchpriority={isLcp ? "high" : "auto"}
      />
    </picture>
    
    <!-- Gradient Overlay: Adjusted to fade out higher up on desktop -->
    <div class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 sm:via-background/40 to-transparent"></div>
    
    <!-- Content Layer -->
    <div class="absolute inset-x-4 bottom-4 flex flex-col gap-2 sm:inset-x-6 sm:bottom-6 sm:max-w-xl md:max-w-2xl">
      <div class="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" class="bg-primary/20 text-primary hover:bg-primary/20 border-transparent">
          {hero.gameBadge}
        </Badge>
        
        {#if hero.discountBadge}
          <Badge variant="outline" class="bg-background/50 text-foreground backdrop-blur-md border-border/50">
            {hero.discountBadge}
          </Badge>
        {/if}
      </div>
      
      <h1 class="text-xl font-bold tracking-tight text-foreground text-balance sm:text-2xl md:text-3xl">
        {hero.title}
      </h1>
      <p class="text-sm font-medium text-muted-foreground sm:text-base text-pretty line-clamp-2">
        {hero.subtitle}
      </p>
    </div>
  </div>
</a>
