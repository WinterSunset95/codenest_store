<script lang="ts">

import Navigation from "#lib/components/Navigation.svelte";
import Hero from "#lib/assets/hero.jpg"
import mlbb from "#lib/assets/mlbb.png"
import magic from "#lib/assets/magic_chess.png"
import bgmi from "#lib/assets/bgmi.png"


</script>

<Navigation />

<section class="hero_section">
   <img alt="Hero_section" src={Hero} />
</section>

<section class="games_section">
    <div class="card">
        <img alt="Hero_section" src={bgmi}/>
    </div>
    <div class="card">
        <img alt="Hero_section" src={mlbb} />
    </div>
    <div class="card">
        <img alt="Hero_section" src={magic} />
    </div>
</section>

<style>
    .hero_section {
       width: 100%;
       margin: 0;
       padding: 0;
    }

    .games_section{
        display: flex;
        justify-content: space-evenly;
        margin: 2em;
    }
</style>


