<script lang="ts">

import Navigation from "#lib/components/Navigation.svelte";
import Hero from "#lib/assets/hero.jpg"
import Hero2 from "#lib/assets/hero2.jpeg"
import Hero3 from "#lib/assets/hero3.jpeg"
import Hero4 from "#lib/assets/hero4.jpeg"
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
        <a href="#"><img alt="Hero_section" src={bgmi}/></a>
        <p>BGMI</p>
    </div>
    <div class="card">
        <a href="#"><img alt="Hero_section" src={mlbb} /></a>
    </div>
    <div class="card">
        <a href="#"><img alt="Hero_section" src={magic} /></a>
    </div>
    <div class="card">
        <a href="#"><img alt="Hero_section" src={bgmi}/></a>
    </div>
    <div class="card">
        <a href="#"><img alt="Hero_section" src={mlbb} /></a>
    </div>
    <div class="card">
        <a href="#"><img alt="Hero_section" src={magic} /></a>
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

    .card:hover{
        transform: scale(1.05);
        transition: 0.2s;
    }
    
    .card{
        width: 250px;
    }

</style>


