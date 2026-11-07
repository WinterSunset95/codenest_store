<script lang="ts">

import mlbb from "#lib/assets/mlbb.png"
import magic from "#lib/assets/magic_chess.png"
import bgmi from "#lib/assets/bgmi.png"

let images = [mlbb, magic, bgmi, mlbb, magic, bgmi, mlbb, magic, bgmi, mlbb, magic, bgmi];

</script>

<section class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 p-4 md:p-6 lg:p-8">
{#each images as image}
  <div class="w-full h-full flex justify-center items-center overflow-hidden">
    <img src={image} alt="" class="w-full h-full object-fill" />
  </div>
{/each}
</section>
