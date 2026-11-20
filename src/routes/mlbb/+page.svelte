<script>
    import Navigation from "#lib/components/Navigation.svelte";
    import bg from "#lib/assets/mlbb_bg.jpg"
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

<div class="container">
    <div class="left_section1">
        <img src={banner} alt="">
        <h2>MOBA LEGENDS:5V5! (GLOBAL)</h2>
        <h4>How to find MOBA LEGENDS: 5V5! (GLOBAL) Player ID?</h4>
        <p>To find your User ID, tap your profile on the top left of the main menu. It’s shown below your character name. Example: 12345678(1234).</p>
    </div>
    <div class="left_section2">
        <h4>Moba Legends:5V5!</h4>
        <p>Top up Moba Legends: 5V5!  Diamonds in seconds! Just enter your USER ID & ZONE ID, select the value of Diamonds you wish to purchase, complete the payment, and the Diamonds will be added immediately to your account.</p>

        <p style="padding: 2rem;">Download & play Moba Legends:5V5!</p>

        <p><b>IMPORTANT</b>: Check your Gmae Version</p>
        <p>Recharge Arena exclusively supports the official Mobile Legends: Bang Bang (Global) and Moba Legends: 5v5!. Please note that regional and third-party variants (such as VNG, FT, or modded APKs) run on separate servers and are not supported. Recharging for an unsupported version will result in failed delivery and lost funds.</p>

        <h1 style="margin: 2rem;">Why Choose Recharge Arena?</h1>
        <p> Ironclad Security (No Passwords Needed)</p>
        <ul>
            <li>We never ask for your login details. Simply enter your Player ID to top up securely. Your game account stays strictly in your hands.</li>
        </ul>
        <p>No Negative Balances</p>
        <ul>
            <li>We deliver legitimate, fully paid in-game currency. What you buy is permanently yours zero risk of your diamonds being revoked.</li>
        </ul>
        <p> Instant Delivery & Guest Checkout</p>
        <ul>
            <li>Don't miss out on time-limited game events. Our automated fulfillment system ensures your top-ups arrive in minutes, not hours. Plus, you can jump straight into the action with our quick Guest Checkout—no account required.</li>
        </ul>
        <p> Secure, Frictionless Payments</p>
        <ul>
            <li>Enjoy a seamless checkout. Your transactions are protected by trusted, encrypted payment gateways, complete with native support for your preferred UPI apps.</li>
        </ul>
        <p>  Zero Conversion Fees</p>
        <ul>
            <li>Maximum value with absolute transparency. You pay exactly what you see—no hidden charges or conversion markups.</li>
        </ul>
        <p> Fair Refunds & Lightning-Fast Support</p>
        <ul>
            <li>Real help when you need it. We resolve tickets and disputes rapidly. If a technical error or payment failure occurs on our end, our transparent 48-hour refund policy ensures you get your money back without jumping through impossible hoops.</li>
        </ul>
        <p> 100% Ban-Free & ToS Compliant</p>
        <ul>
            <li>We operate legally and strictly respect the official guidelines of developers like Moonton. We prohibit unauthorized sourcing, ensuring your game account is always safe.</li>
        </ul>
    </div>
    <div class="right_section">
        <div class="section1">
            <h2 style="color: white;font-size: 1.3rem;">Enter User details</h2>
            <input type="text" bind:value={Id} placeholder="Enter ID" />
            <input type="text" bind:value={server} placeholder="Enter Server" />
        </div>
        <div class="section2">
            <h2 style="color: white;font-size: 1.3rem;margin: 0.85rem">Select Amount</h2>
            <h4 style="font-weight: bold;">Special Bundle - Not Available for iOS Users</h4>
            <p>Purchase Special Bundle to claim great value, precious rewards!</p>
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
            <h4 style="font-weight: bold;">Double Diamond - Not a First Recharge Benefit on Recharge Arena.</h4>
            <p>Double Diamond Bonus is available if you have not purchased the 50/100/250/500 pack on any platform before. Note: This is not a first recharge benefit on Recharge Arena. Please check the in-game Diamond section for availability before purchasing.</p>
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
            <p>Weekly Diamond Pass offers instant Diamonds and Crystal of Aurora at the best value.</p>
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
</div>

<style>
    .container{
        margin: 8rem;
        display: grid;
        grid-template-columns: 35% 65%;
        gap: 20px;
        padding-left: 5rem;
        font-family: "Bricolage Grotesque",sans-serif;
    }

    .left_section1{
        grid-column: 1;
        grid-row: 1;
        color: white;
    }

    .left_section1 h2{
        font-size: 1.5rem;
        font-weight: bold;
    }

    .left_section2{
        grid-column: 1;
        grid-row: 2;
        color: white;
        height: 135vh;
    }

    .left_section2 h1{
        font-size: 2.2rem;
        font-family: Bricolage Grotesque;
    }

    .left_section2 ul{
        list-style-type: disc;
    }

    .right_section {
        grid-column: 2;
        grid-row: 1 / 3;
        display: grid;
        gap: 20px;
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
        gap: 0.5rem;
        font-size: 0.85rem;
    }

    .card{
        width: 15vh;
        height: 21vh;
        font-size: 0.85rem;
        background-color: #1e234a;
        color: white;
        text-align: center;
        padding: 1rem;
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
      .container {
          display: grid !important;
          grid-template-columns: 1fr;
          grid-template-areas:
              "top"
              "mid"
              "last";
          padding: 2rem;
          margin: 0;
          margin-top: 5rem;
      }

      .left_section1 {
          grid-area: top;
          width: 100%;
      }

      .right_section {
          grid-area: mid;
          width: 100%;
      }

      .left_section2 {
          grid-area: last;
          width: 100%;
          margin-bottom: 2rem;
      }

      .section1{
          height: 30vh;
          background-color: #151a3b;
          padding: 2rem;
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
