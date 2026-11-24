<script lang="ts">
import GameCard from "#lib/components/GameCard.svelte";

import { fetchHomePageCards } from "#lib/utils/api.ts";

let cards = $derived.by(async () => {
  // In the future, all the homepage cards will come from the backend
  return await fetchHomePageCards()
});

</script>

<section class="w-full flex flex-col p-4">
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 gap-gutter-md items-stretch">
    {#await cards}
      {#each Array(4) as _}
        <div class="group aspect-square flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary animate-pulse"></div>
      {/each}
    {:then cards} 
      {#each cards as card}
        <GameCard {card} />
      {/each}
    {/await}
  </div>
</section>
