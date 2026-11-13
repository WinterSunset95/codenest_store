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
    </div>
    <div class="left_section2"></div>
    <div class="right_section"></div>
</div>
