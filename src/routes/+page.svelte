<script lang="ts">

  import Navigation from "#lib/components/Navigation.svelte";
  import Hero from "./Hero.svelte";
  import CardsSection from "./CardsSection.svelte";
  import Footer from "#lib/components/Footer.svelte";
	import PopularTopups from "./PopularTopups.svelte";
	import HowItWorks from "#lib/components/HowItWorks.svelte";

</script>

<Navigation />

<main class="p-4">
  <Hero />

  <CardsSection />

  <PopularTopups />

  <HowItWorks />
</main>

<Footer />
