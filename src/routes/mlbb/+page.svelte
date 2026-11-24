<script>
    import Navigation from "#lib/components/Navigation.svelte";
    import bg from "#lib/assets/mlbb_bg.jpeg"
    import banner from "#lib/assets/games-banner.webp"
    import monthly from "#lib/assets/monthly.webp"
    import weekly from "#lib/assets/weekly.webp"
    import D1 from "#lib/assets/diamond1.webp"
    import D2 from "#lib/assets/diamond2.webp"
    import D3 from "#lib/assets/diamond3.webp"
    import D4 from "#lib/assets/diamond4.webp"
    import D5 from "#lib/assets/diamond5.webp"
    import D6 from "#lib/assets/diamond6.webp"
    import D7 from "#lib/assets/diamond7.webp"
    import Pass from "#lib/assets/pass.webp"
    import PhonePe from "#lib/assets/Phone Pe.png"
    import GooglePay from "#lib/assets/google_pay.png"
    import Upi from "#lib/assets/upi.png"
    import payTm from "#lib/assets/paytm-icon.png"
    let Id = $state('');
    let server = $state('');
    let Email = $state('');
</script>

<div class="fixed -z-10 top-0 bottom-0 w-full h-full overflow-hidden">
  <img src={bg} alt="" class="w-full h-full object-fill mlbb_bg" />
</div>
  
<Navigation />

<div class="banner">
    <img src={banner} alt="">
</div>

<div class="container">
        <div class="section1">
            <h2 style="color: white;font-size: 1.3rem;">Enter User details</h2>
            <input type="text" bind:value={Id} placeholder="Enter ID" />
            <input type="text" bind:value={server} placeholder="Enter Server" />
        </div>
        <div class="section2">
            <h2 style="color: white;font-size: 1.3rem;margin: 0.85rem">Select Amount</h2>
            <h4 style="font-weight: bold;">Special Bundle</h4>

            <div class="card_container">
                <div class="card">
                    <img src={monthly} alt="">
                    <p>MONTHLY EPIC BUNDLE</p>
                    <p>₹ 410</p>
                    <p class="discount">₹ 450</p>
                </div>
                <div class="card">
                    <img src={weekly} alt="">
                    <p>WEEKLY EPIC BUNDLE</p>
                    <p>₹ 85</p>
                    <p class="discount">₹ 99</p>
                </div>
            </div>
            <h4 style="font-weight: bold;">Double Diamond</h4>
            <div class="card_container">
                <div class="card">
                    <img src={D3} alt="">
                    <p>100 DIAMONDS (50+50)</p>
                    <p>₹ 84</p>
                    <p class="discount">₹ 99</p>
                </div>
                <div class="card">
                    <img src={D4} alt="">
                    <p>300 DIAMONDS (150+150)</p>
                    <p>₹ 245</p>
                    <p class="discount">₹ 295</p>
                </div>
                <div class="card">
                    <img src={D5} alt="">
                    <p>500 DIAMONDS (250+250)</p>
                    <p>₹ 385</p>
                    <p class="discount">₹ 495</p>
                </div>
                <div class="card">
                    <img src={D6} alt="">
                    <p>1000 DIAMONDS (500+500)</p>
                    <p>₹ 799</p>
                    <p class="discount">₹ 980</p>
                </div>
            </div>
            <h4 style="font-weight: bold;">Weekly Diamond Pass</h4>
           
            <div class="card_container">
                <div class="card">
                    <img src={Pass} alt="">
                    <p>1X WEEKLY PASS</p>
                    <p>₹ 155</p>
                    <p class="discount">₹ 195</p>
                </div>
                <div class="card">
                    <img src={Pass} alt="">
                    <p>2X WEEKLY PASS</p>
                    <p>₹ 310</p>
                    <p class="discount">₹ 390</p>
                </div>
                <div class="card">
                    <img src={Pass} alt="">
                    <p>3X WEEKLY PASS</p>
                    <p>₹ 465</p>
                    <p class="discount">₹ 585</p>
                </div>
            </div>
            <h4 style="font-weight: bold;">Diamonds</h4>
            <p>Normal Diamonds</p>
            <div class="card_container">
                <div class="card">
                    <img src={D1} alt="">
                    <p>5 Diamonds</p>
                    <p>₹ 12</p>
                    <p class="discount">₹ 16</p>
                </div>
                <div class="card">
                    <img src={D1} alt="">
                    <p>11 Diamonds</p>
                    <p>₹ 22</p>
                    <p class="discount">390</p>
                </div>
                <div class="card">
                    <img src={D1} alt="">
                    <p>14 Diamonds</p>
                    <p>₹ 28</p>
                    <p class="discount">₹ 30</p>
                </div>
                <div class="card">
                    <img src={D1} alt="">
                    <p>22 Diamonds (20+2)</p>
                    <p>₹ 45</p>
                    <p class="discount">₹ 50</p>
                </div>
                <div class="card">
                    <img src={D2} alt="">
                    <p>28 Diamonds (26+2)</p>
                    <p>₹ 56</p>
                    <p class="discount">₹ 60</p>
                </div>
                <div class="card">
                    <img src={D2} alt="">
                    <p>55 Diamonds</p>
                    <p>₹ 84</p>
                    <p class="discount">₹ 99</p>
                </div>
                <div class="card">
                    <img src={D2} alt="">
                    <p>86 Diamonds (78+8)</p>
                    <p>₹ 125</p>
                    <p class="discount">₹ 145</p>
                </div>
                <div class="card">
                    <img src={D2} alt="">
                    <p>110 Diamonds (100+10)</p>
                    <p>₹ 165</p>
                    <p class="discount">₹ 199</p>
                </div>
                <div class="card">
                    <img src={D2} alt="">
                    <p>172 Diamonds (156+16)</p>
                    <p>₹ 250</p>
                    <p class="discount">₹ 290</p>
                </div>
                <div class="card">
                    <img src={D4} alt="">
                    <p>257 Diamonds (234+23)</p>
                    <p>₹ 365</p>
                    <p class="discount">₹ 399</p>
                </div>
                <div class="card">
                    <img src={D4} alt="">
                    <p>275 Diamonds (250+25)</p>
                    <p>₹ 385</p>
                    <p class="discount">₹ 400</p>
                </div>
                <div class="card">
                    <img src={D4} alt="">
                    <p>312 Diamonds (284+28)</p>
                    <p>₹ 450</p>
                    <p class="discount">₹ 520</p>
                </div>
                <div class="card">
                    <img src={D4} alt="">
                    <p>361 Diamonds (328+33)</p>
                    <p>₹ 510</p>
                    <p class="discount">₹ 610</p>
                </div>
                <div class="card">
                    <img src={D5} alt="">
                    <p>429 Diamonds (390+39)</p>
                    <p>₹ 615</p>
                    <p class="discount">₹ 700</p>
                </div>
                <div class="card">
                    <img src={D5} alt="">
                    <p>451 Diamonds (410+41)</p>
                    <p>₹ 670</p>
                    <p class="discount">₹ 730</p>
                </div>
                <div class="card">
                    <img src={D5} alt="">
                    <p>514 Diamonds (468+46)</p>
                    <p>₹ 730</p>
                    <p class="discount">₹ 799</p>
                </div>
                <div class="card">
                    <img src={D5} alt="">
                    <p>565 Diamonds (500+65)</p>
                    <p>₹ 799</p>
                    <p class="discount">₹ 980</p>
                </div>
                <div class="card">
                    <img src={D5} alt="">
                    <p>706 Diamonds (625+81)</p>
                    <p>₹ 999</p>
                    <p class="discount">₹ 1150</p>
                </div>
                <div class="card">
                    <img src={D6} alt="">
                    <p>803 Diamonds (713+90)</p>
                    <p>₹ 1145</p>
                    <p class="discount">₹ 1295</p>
                </div>
                <div class="card">
                    <img src={D6} alt="">
                    <p>900 Diamonds (801+90)</p>
                    <p>₹ 1290</p>
                    <p class="discount">₹ 1495</p>
                </div>
                <div class="card">
                    <img src={D6} alt="">
                    <p>1049 Diamonds (953+96)</p>
                    <p>₹ 1485</p>
                    <p class="discount">₹ 1795</p>
                </div>
                <div class="card">
                    <img src={D6} alt="">
                    <p>1130 Diamonds (1000+130)</p>
                    <p>₹ 1599</p>
                    <p class="discount">₹ 1999</p>
                </div>
                <div class="card">
                    <img src={D7} alt="">
                    <p>1412 Diamonds (1250+162)</p>
                    <p>₹ 1999</p>
                    <p class="discount">₹ 2490</p>
                </div>
                <div class="card">
                    <img src={D7} alt="">
                    <p>1503 Diamonds (1333+170)</p>
                    <p>₹ 2135</p>
                    <p class="discount">₹ 2799</p>
                </div>
            </div>
        </div>
        <div class="section3">
            <div class="email">
                <h2>Email Address</h2>
                <input type="text" bind:value={Email} placeholder="Enter Email">
            </div>
            <div class="payment_container">
                <div class="pay">
                    <img src={payTm} alt="">
                    <p></p>
                </div>
                <div class="pay">
                    <img src={PhonePe} alt="">
                    <p></p>
                </div>
                <div class="pay">
                    <img src={Upi} alt="">
                    <p></p>
                </div>
                <div class="pay">
                    <img src={GooglePay} alt="">
                    <p></p>
                </div>
            </div>
        </div>
</div>

<style>
    
    .banner{
        width: 100%;
    }

    .banner img{
        width: 100%;
        height: 50vh;
        padding: 0.5rem;
    }
    
    .container{
        margin: 8rem;
        display: grid;
        gap: 20px;
        font-family: "Bricolage Grotesque",sans-serif;
    }

    .section1{
        height: 30vh;
        background-color: #151a3b;
        padding: 3rem;
        border-radius: 1rem;
    }

    input{
        width: 100%;
        padding: 1.3rem;
        margin: 1rem 0;
        overflow: hidden;
        border-radius: 1.3rem;
    }
    
    .section2{
        height: 220vh;
        background-color: #151a3b;
        padding: 3rem;
        color: white;
        border-radius: 1rem;
    }

    .card_container{
        display: grid;
        grid-template-columns: 20% 20% 20% 20% 20%;
        gap: 1rem;
        font-size: 0.85rem;
    }

    .card{
        font-size: 0.85rem;
        background-color: #1e234a;
        color: white;
        text-align: center;
        padding: 1rem;
    }

    .card img{
        padding-left: 4.5rem;
    }

    .discount{
        color: red;
        text-decoration: line-through;
        font-size: 0.85rem;
    }

    .section3{
        height: 40vh;
        background-color: #151a3b;
        padding: 2rem;
        color: white;
        border-radius: 1rem;
    }

    .section3 input{
        width: 50%;
        margin: 2.5rem 0;
    }

    .payment_container{
        display: flex;
        gap: 2rem;
    }

    .pay{
        background-color: #1e234a;
        border-radius: 1rem;
        align-items: center;
        justify-content: center;
    }

    .pay img{
        width: 15vh;
        height: 15vh;
        padding: 1rem;
    }

    @media (max-width: 768px) {

        .container{
            margin: 0;
            padding: 1.5rem;
        }

      .banner {
          width: 100%;
      }

      .banner img{
        width: 100%;
        height: 30vh;
        padding: 0.5rem;
    }

      .section1{
          height: 35vh;
          background-color: #151a3b;
          padding: 2rem;
          border-radius: 1rem;
      }

      .section1 input{
          width: 100%;
          padding: 1.3rem;
          margin: 1rem 0;
          overflow: hidden;
          border-radius: 1.3rem;
      }
      
      .section2{
          height: 100%;
          background-color: #151a3b;
          padding: 3rem;
          color: white;
          border-radius: 1rem;
      }

      .card_container{
          display: grid;
          grid-template-columns: 50% 50%;
          gap: 0.5rem;
          font-size: 0.85rem;
          margin: 1rem;
      }

      .card{
          width: 15vh;
          height: 23vh;
          font-size: 0.85rem;
          background-color: #1e234a;
          color: white;
          text-align: center;
          padding: .2rem;
      }

      .card img{
        padding: 0;
    }

    .section3{
        height: 45vh;
    }

    .section3 input{
        width: 100%;
    }

      .payment_container{
          display: flex;
          gap: 1rem;
      }
    }

    @keyframes imageAnimation {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }

    .mlbb_bg {
      animation: imageAnimation 5s ease-in-out infinite;
    }

</style>
