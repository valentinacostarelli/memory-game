<!DOCTYPE html>
<!--
    Author: Valentina Costarelli

    This is the main page for the game of Travel Memory.
    Various UI features that allow the game to be
    customized, including: selecting number of memory cards
    in a game and selecting a preferred category of images.
-->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Travel Memory!</title>
    <link rel="stylesheet" href="styles.css" />
    <script defer src="home.js"></script>
  </head>

  <body>
    <header>
      <h1>Travel Memory Game</h1>
    </header>

    <main>
        <article>
            <h2>Select level of difficulty:</h2>
            <select id="num-cards">
                <option value="8">8 Cards</option>
                <option value="12" selected>12 Cards</option>
                <option value="16">16 Cards</option>
                <option value="20">20 Cards</option>
                <option value="24">24 Cards</option>
            </select>
        </article>

        <article>
            <h2>Select a Category of Images: (optional)</h2>
            <select class="category" name="category" id="category">
                <option value="1">Architecture and Archeology</option>
                <option value="2">City Landscapes</option>
                <option value="3">Mother Nature Only</option>
                <option value="4">Beach Please</option>
                <option value="5" selected>I love them all!</option>
            </select>
        </article>

        <article>
            <h2>Ready for this adventure?</h2>
            <button id="play">Play</button>
        </article>

        <article>
            <h2>About "Travel Memory"</h2>
            <p>
                Play a fun game of memory where each card either is a UN World 
                Heritage Site or a natural protected area around the globe.
            </p>
        </article>
      </main>
  </body>
</html>
