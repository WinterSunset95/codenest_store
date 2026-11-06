<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
  import '@fontsource/permanent-marker';
  import '@fontsource-variable/caveat';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main class="relative w-screen h-screen overflow-auto">
  {@render children()}
</main>
