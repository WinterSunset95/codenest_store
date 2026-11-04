<script lang="ts">

import Navigation from "#lib/components/Navigation.svelte";
import Hero from "#lib/assets/hero.jpg"
import card1 from "#lib/assets/bgmi.jpeg"
import card2 from "#lib/assets/mlbb.jpeg"
import card3 from "#lib/assets/magic_chess.jpeg"

</script>

<Navigation />

<section class="hero_section">
   <img alt="Hero_section" src={Hero} />
</section>

<section class="games_section">
    <div class="card">
        <img alt="Hero_section" src={card1} />
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

    .card img{
        border-radius:  5.5rem 0.8rem;
    }
</style>


