<!DOCTYPE html>
<!--
    Author: Valentina Costarelli

    This is the game page for the game of Travel Memory.
    It is a container for all the memory cards. Also 
    incorporates menu functionality (if user wants to
    go back to the home page), a counter to keep track
    of the number of pairs found, and an option available
    if user wants to flip all cards and end the game. 
-->
<html lang="en">
<head>
    <meta charset="UTF-8">

    <title>Memory Game</title>
    <link rel="stylesheet" href="game.css">
    <script defer src="memory-game.js"></script>
</head>

<body>
    <main>
        <div id="menu">
              <button id="back-btn">Back</button>
              <p id="congrats-msg" class="hidden">&#127881; That's a Pair! &#127881;</p>
              <p><strong>Pairs Found: </strong><span id="pairs">0</span></p>
              <button id="flip-all">I give up... Flip All</button>
        </div>

      <section id="memory-game">
      </section>
    </main>
</body>

</html>
