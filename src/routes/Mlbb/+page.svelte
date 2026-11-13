<script>
    import Navigation from "#lib/components/Navigation.svelte";
    import bg from "#lib/assets/mlbb_bg.jpg"
    import banner from "#lib/assets/games-banner.webp"
</script>

<div class="fixed -z-10 top-0 bottom-0 w-full h-full overflow-hidden">
    <img src={bg} alt="" class="w-full h-full object-fill mlbb_bg" />
  </div>
  
<Navigation />

<div class="container">
    <div class="left_section1">
        <img src={banner} alt="">
        <h2>MOBA LEGENDS: 5V5! (GLOBAL)</h2>
    </div>
    <div class="left_section2"></div>
    <div class="right_section"></div>
</div>

<style>
    .container{
        margin: 5rem 5rem;
        display: grid;
        grid-template-columns: 35% 65%;
        gap: 20px;
    }

    .left_section1{
        grid-column: 1;
        grid-row: 1;
    }

</style>
