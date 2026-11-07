<script lang="ts">

import Navigation from "#lib/components/Navigation.svelte";
import Hero from "./Hero.svelte";
import CardsSection from "./CardsSection.svelte";
import mlbb from "#lib/assets/mlbb.png"
import magic from "#lib/assets/magic_chess.png"
import bgmi from "#lib/assets/bgmi.png"
import bg from "#lib/assets/homepagebg.webp";
import Footer from "#lib/components/Footer.svelte";




</script>

<div class="fixed -z-10 top-0 bottom-0 w-full h-full overflow-hidden">
  <img src={bg} alt="" class="w-full h-full object-fill homepage-bg" />
</div>

<Navigation />

<div class="mt-16"></div>

<Hero />

<CardsSection />

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

<Footer />

<style>
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

    @keyframes bg-animate {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }

    .homepage-bg {
      animation: bg-animate 10s ease-in-out infinite;
    }

    @media (max-width: 600px){
       .games_section{
           display: grid;
           grid-auto-flow: column;
           grid-auto-columns: 45vw;
           gap: 16px;
           overflow-x: auto;
           padding: 2rem;
        }

        .games_section::-webkit-scrollbar{
            display: none;
        }

        .card img{
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
    }

</style>


