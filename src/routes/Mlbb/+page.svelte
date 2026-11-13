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
    <div class="right_section">
        <div class="section1">

        </div>
        <div class="section2"></div>
        <div class="section3"></div>
    </div>
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

    .left_section1 h2{
        color: white;
        font-size: 2rem;
    }

    .left_section2{
        grid-column: 1;
        grid-row: 2;
        background-color: white;
        height: 130vh;
    }

    .right_section {
        grid-column: 2;
        grid-row: 1 / 3;
        display: grid;
        gap: 20px;
    }

    .section1{
        height: 30vh;
        background-color: #4f4f4f;
    }
    
    .section2{
        height: 100vh;
        background-color: #4f4f4f;
    }

    .section3{
        height: 40vh;
        background-color: #4f4f4f;
    }

</style>
