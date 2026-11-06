<script lang="ts">

import { Search } from "@lucide/svelte"

</script>

<div class="w-full backdrop-blur-lg fixed bg-blue-600/10 flex items-center justify-center text-white">
  <div class="px-4 py-2 max-w-6xl w-full h-full flex items-center justify-center gap-8">
    <div class="flex flex-col font-marker">
      <span>
        RECHARGE
      </span>
      <span class="self-end text-xs">
        MLBB
      </span>
    </div>
    <div class="flex items-center justify-start gap-4 grow font-bold">
      <a href="/">Home</a>
      <a href="/">Blogs</a>
      <a href="/about">About Us</a>
    </div>
    <div class="flex items-center justify-center gap-2 bg-gray-500/50 backdrop-blur-md px-4 rounded-xl">
      <Search />
      <input type="text" class="border-0 bg-transparent text-white" placeholder="Search MLBB Diamond package"/>
    </div>
    <button class="bg-cyan-500 rounded-lg py-2 px-4">
      Sign In
    </button>
  </div>
</div>
