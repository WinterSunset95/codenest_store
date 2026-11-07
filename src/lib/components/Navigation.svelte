<script lang="ts">

import { Search, HamburgerIcon, MenuIcon } from "@lucide/svelte"

let shown = $state(false);

</script>

<div class="w-full backdrop-blur-lg fixed bg-blue-800/30 flex items-center justify-center text-white top-0 z-50">
  <div class="px-2 py-1 md:px-4 md:py-2 md:max-w-6xl w-full h-full flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
    <div class="w-full flex items-center justify-between gap-2 md:gap-8">
      <div class="flex flex-col font-marker">
        <span>
          RECHARGE
        </span>
        <span class="self-end text-xs">
          MLBB
        </span>
      </div>
      <div class="flex items-center justify-start gap-4 md:grow font-bold text-sm md:text-lg">
        <a href="/">Home</a>
        <a href="/">Blogs</a>
        <a href="/about">About Us</a>
      </div>
      <button class="md:hidden" onclick={() => shown = !shown}>
        <MenuIcon />
      </button>
    </div>
    <div class="w-full flex items-center justify-center gap-2 md:gap-8 {shown ? "" : "h-0 overflow-hidden md:h-auto md:overflow-auto"}">
      <div class="flex items-center justify-center gap-2 bg-gray-500/50 backdrop-blur-md p-2 rounded-xl text-white grow h-full">
        <Search />
        <input type="text" class="border-0 bg-transparent text-white p-0 grow" placeholder="Search MLBB Diamond package"/>
      </div>
      <button class="bg-cyan-500 rounded-lg py-2 px-2 md:py-2 md:px-4 text-sm md:text-lg h-full">
        Sign In
      </button>
    </div>
  </div>
</div>
