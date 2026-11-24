<script lang="ts">

import { type EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel, { type EmblaCarouselSvelteType } from 'embla-carousel-svelte'
import Autoplay from "embla-carousel-autoplay"
import HeroCard from '#lib/components/HeroCard.svelte';
import { fetchHeroCards } from '#lib/utils/api.ts';

let emblaApi: EmblaCarouselSvelteType;
let options: EmblaOptionsType = {
  loop: true, 
  align: 'center'
};

const heroes = fetchHeroCards();

const onInit = (event: CustomEvent<EmblaCarouselSvelteType>) => {
  emblaApi = event.detail
}

</script>

<div class="embla z-10 p-2">
  <div
    class="embla__viewport"
    onemblaInit={onInit}
    use:useEmblaCarousel={{
      options: options,
      plugins: [
        Autoplay({
        	delay: 3000,
        	stopOnInteraction: false,
        	stopOnMouseEnter: true
        })
      ],
    }}
  >
    <div class="embla__container gap-2">
      {#await heroes}
        {#each Array(5) as _}
          <div class="embla__slide p-0 overflow-hidden">
            <div class="relative w-full aspect-square sm:aspect-video md:aspect-21/9 bg-muted animate-pulse rounded-lg"></div>
          </div>
        {/each}
      {:then heroes} 
        {#each heroes as hero}
          <div class="embla__slide p-0 overflow-hidden">
            <HeroCard {hero} />
          </div>
        {/each}
      {/await}
    </div>
  </div>
</div>

<style>
  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
  }

  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
</style>
