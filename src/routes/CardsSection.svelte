<script lang="ts">

import { fetchHomePageCards } from "#lib/utils/api.ts";

let cards = $derived.by(async () => {
  // In the future, all the homepage cards will come from the backend
  return await fetchHomePageCards()
});

</script>

<section class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 p-4 md:p-6 lg:p-8">
{#await cards}
  <div>Wait! They don't love you like I love you babe</div>
{:then cards} 
  {#each cards as card}
    <a href={card.page} class="w-full h-full">
      <div class="w-full h-full flex justify-center items-center overflow-hidden">
        <img src={card.image} alt="" class="w-full h-full object-fill" />
      </div>
    </a>
  {/each}
{/await}
</section>
