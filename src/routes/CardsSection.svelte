<script lang="ts">

import { mockHomePageCards } from "#lib/mocks/common.ts";

let cards = mockHomePageCards;

</script>

<section class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 p-4 md:p-6 lg:p-8">
{#each cards as card}
  <a href={card.page} class="w-full h-full">
    <div class="w-full h-full flex justify-center items-center overflow-hidden">
      <img src={card.image} alt="" class="w-full h-full object-fill" />
    </div>
  </a>
{/each}
</section>
