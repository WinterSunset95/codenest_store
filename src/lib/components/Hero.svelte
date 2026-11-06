<script lang="ts">

import { type EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel, { type EmblaCarouselSvelteType } from 'embla-carousel-svelte'
import Autoplay from "embla-carousel-autoplay"
import Hero1 from "#lib/assets/hero.jpg"
import Hero2 from "#lib/assets/hero2.jpeg"
import Hero3 from "#lib/assets/hero3.jpeg"
import Hero4 from "#lib/assets/hero4.jpeg"

let emblaApi: EmblaCarouselSvelteType;
let options: EmblaOptionsType = {
  loop: true, 
  align: 'center'
};

const onInit = (event: CustomEvent<EmblaCarouselSvelteType>) => {
  emblaApi = event.detail
}

</script>

<div class="embla z-10">
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
    <div class="embla__container">
      <div class="embla__slide p-0 overflow-hidden">
        <img src={Hero1} alt="" class="w-full h-full object-fill">
      </div>
      <div class="embla__slide p-0 overflow-hidden">
        <img src={Hero2} alt="" class="w-full h-full object-fill">
      </div>
      <div class="embla__slide p-0 overflow-hidden">
        <img src={Hero3} alt="" class="w-full h-full object-fill">
      </div>
      <div class="embla__slide p-0 overflow-hidden">
        <img src={Hero4} alt="" class="w-full h-full object-fill">
      </div>
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
