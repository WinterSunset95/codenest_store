<script lang="ts">

import Navigation from "#lib/components/Navigation.svelte";
import Hero from "./Hero.svelte";
import CardsSection from "./CardsSection.svelte";
import bg from "#lib/assets/homepagebg.webp";
import Footer from "#lib/components/Footer.svelte";

</script>

<div class="fixed -z-10 top-0 bottom-0 w-full h-full overflow-hidden">
  <img src={bg} alt="" class="w-full h-full object-fill homepage-bg" />
</div>

<Navigation />

<div class="mt-16"></div>

<Hero />

<CardsSection />

<Footer />

