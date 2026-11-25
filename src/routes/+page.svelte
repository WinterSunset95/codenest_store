<script lang="ts">

  import Navigation from "#lib/components/Navigation.svelte";
  import Hero from "./Hero.svelte";
  import CardsSection from "./CardsSection.svelte";
  import bg from "#lib/assets/homepagebg.webp";
  import Footer from "#lib/components/Footer.svelte";
	import PopularTopups from "./PopularTopups.svelte";
	import HowItWorks from "#lib/components/HowItWorks.svelte";

</script>

<div class="fixed -z-10 top-0 bottom-0 w-full h-full overflow-hidden">
  <img src={bg} alt="" class="w-full h-full object-fill homepage-bg" />
</div>

<Navigation />

<main class="p-4">
  <Hero />

  <CardsSection />

  <PopularTopups />

  <HowItWorks />
</main>

<Footer />

<style>
@keyframes imageAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.homepage-bg {
  animation: imageAnimation 5s ease-in-out infinite;
}
</style>
