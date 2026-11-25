<script lang="ts">
  import TopUpCard from '#lib/components/TopUpCard.svelte';
  import { fetchPopularTopups } from '#lib/utils/api.ts';
  import FlameIcon from '@lucide/svelte/icons/flame';
  import { Button } from '#lib/components/ui/button/index.ts';

  const popularItemsPromise = fetchPopularTopups();
  
  let activeFilter = $state('All');
  const filters = ['All', 'MLBB', 'BGMI', 'Genshin', 'Valorant'];
</script>

<section class="flex flex-col gap-4 pb-8 pt-6">
  <!-- Header & Filters -->
  <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div class="flex items-center gap-2">
      <FlameIcon class="size-5 text-amber-500" />
      <h2 class="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        Trending Top-Ups
      </h2>
    </div>

    <!-- Filter Pills -->
    <div class="flex flex-wrap items-center gap-2">
      {#each filters as filter}
        <Button 
          variant={activeFilter === filter ? 'default' : 'outline'} 
          size="sm" 
          class="h-8 rounded-full px-4 text-xs font-semibold"
          onclick={() => activeFilter = filter}
        >
          {filter}
        </Button>
      {/each}
    </div>
  </header>

  <!-- Grid Layout -->
  <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
    {#await popularItemsPromise}
      <!-- 4 skeleton loading cards to maintain grid layout during the 5s delay -->
      {#each Array(4) as _}
        <div class="h-[140px] w-full animate-pulse rounded-xl border border-border bg-muted/50"></div>
      {/each}
    {:then items} 
      <!-- Derive the filtered array locally so tab switching is instant -->
      {@const filteredItems = activeFilter === 'All' 
        ? items 
        : items.filter(item => item.category === activeFilter)}

      {#each filteredItems as item (item.id)}
        <TopUpCard {item} />
      {:else}
        <div class="col-span-full flex h-32 items-center justify-center text-sm text-muted-foreground">
          No popular packs found for {activeFilter}.
        </div>
      {/each}
    {/await}
  </div>
</section>
