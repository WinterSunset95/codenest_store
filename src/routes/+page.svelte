<script lang="ts">

import Navigation from "#lib/components/Navigation.svelte";
import Hero from "#lib/assets/hero.jpg"
import card2 from "#lib/assets/mlbb.jpeg"
import card3 from "#lib/assets/magic_chess.jpeg"
import banner from "#lib/assets/bei-banner-bg.jpg"
import character from "#lib/assets/bgmi-removebg-preview.png"

</script>

<Navigation />

<section class="hero_section">
   <img alt="Hero_section" src={Hero} />
</section>

<section class="games_section">
    <div class="card1" style:background-image={`url(${banner})`}>
        <img alt="Hero_section" src={character} class="character"/>
    </div>
    <div class="card">
        <img alt="Hero_section" src={card2} />
    </div>
    <div class="card">
        <img alt="Hero_section" src={card3} />
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

    .card1{
        border-radius:  5.5rem 0.8rem;
        height: 50vh;
        width: 45vh;
        overflow-y: visible;
    }

    .character{
        width: 100%;
        height: 100%;
        object-fit: contain;
        bottom: 50%;
        transform: translateX(-50%);
        z-index: 2;
    }

    .card img{
        border-radius:  5.5rem 0.8rem;
    }
</style>


