/**
 * @author Valentina Costarelli
 * 
 * This is the JavaScript file accompanying mgame.html. It
 * runs the game functionality for the Travel Memory Game.
 */

"use strict";
(function() {
    // MODULE-GLOBALS:
    // img categories:
    const CATEGORIES = ["architecture", "city", "nature", "beach"];
    const A_MAX = 50; // architecture max count
    const B_MAX = 50; // beach max count
    const C_MAX = 40; // city scapes max count
    const N_MAX = 50; // nature max count
    let BACK_OF_CARD = "card-background.png";
    // game state:
    let isFlipped = false;
    let isBoardLocked = false;
    let card1, card2; // only 2 cards can be flipped by user at a time
    let numCards, category;

    init();

    /**
     * Function that initialized the game of Travel Memory
     * and adds an event listener to the appropriate buttons
     * on the page.
     */
    function init() {
        let backgrounds = getImageBackgrounds(); // gets the needed game image backrgounds

        id("flip-all").addEventListener("click", flipAll);

        id("back-btn").addEventListener("click", () => {
            window.location.href = "index.html";
        });

        // clear board before starting a new game. textContent would not work here as 
        // the desired effect is to clear the div elements themselves before writing new ones
        id("memory-game").innerHTML = "";
        
        startGame();
    }

    /**
     * gets the image backgorunds needed for the game.
     * returns an array of their relative paths (obtained
     * by a fetch call)
     * @returns {array} of game image and back of card image
     */
    function getImageBackgrounds() {
        let backgrounds;
        fetch("/backgrounds")
        .then(checkStatus)
        .then(resp => resp.json())
        .then(resp => backgrounds = [resp.game, resp.cardBack])
        .catch(handleError);
        return backgrounds;
    }

    /**
     * Generates an array that is randomly generated containing the unique attirbutes
     * for each newly created card.
     * @param {boolean} isEasy - true if selected level of difficulty is "easy", false otherwise
     * @returns {array} - a randomly-generated array of string attributes in the form [STYLE, SHAPE, COLOR, COUNT]
     */
    function createRandomCardName(categoryValue) {
        let cardName = ""; // needs to be initialized to an empty string otherwise gives an undefined value
        let maxNum = 35; // default value
        
        // if category is not "I love them all!" then pick random category
        let cat = categoryValue === 5 ? CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)] : CATEGORIES[categoryValue - 1];

        if (categoryValue === 1) { // archeology
            maxNum = A_MAX;
        }
        else if (categoryValue === 2) { // city landscapes
            maxNum = C_MAX;
        }
        else if (categoryValue === 3) { // mother nature only
            maxNum = N_MAX;
        }
        else if (categoryValue === 4) { // beach please
            maxNum = B_MAX;
        }

        cardName += String(cat);
        return cardName + "-" + String(Math.ceil(Math.random() * maxNum));
    }

    /**
     * Determines the number of rows and cols of cards there should
     * be in order to be properly placed on the page and styled 
     * with flex layout.
     * 
     * @param {Number} numCards - total number of cards during the game
     * @returns number of rows as per ideal flex layout
     */
    function getRowsAndCols(numCards) {

        let rows, cols;
        fetch("/grid")
        .then(checkStatus)
        .then(resp => resp.json())
        .then(resp => { cols = resp.cols, rows = resp.rows})
        .catch(handleError)
        return [rows, cols];
    }


    /**
     * Determines the number of rows of cards there should be
     * in order to be properly placed on the page and styled 
     * with flex layout.
     * 
     * @param {Number} numCards - total number of cards during the game
     * @returns number of rows as per ideal flex layout
     */
     function getRows(numCards) {
        if (numCards === 8) {
            return 2;
        }
        else if (numCards === 12) {
            return 3;
        }
        else {
            return 4;
        }
    }

    /**
     * Determines the number of columns of cards there should be
     * in order to be properly placed on the page and styled 
     * with flex layout.
     * 
     * @param {Number} numCards - total number of cards during the game
     * @returns number of cols as per ideal flex layout
     */
    function getCols(numCards) {
    if (numCards === 24) {
        return 6;
    }
    else if (numCards === 20) {
        return 5;
    }
    else {
        return 4;
    }
}

    /**
     * Creates a unique set of cards based on user input
     * at the start of each game. Determines the size of 
     * each card and the layout of the group of cards based
     * on how many cards were selected to be used for the
     * iteration of this game.
     */
    function startGame() {
        // get specs
        let gameSpecs = getGameSpecs();

        numCards = Number(gameSpecs[0]);
        category = Number(gameSpecs[1]);

        // determine card dimensions
        let rowsAndCols = getRowsAndCols();

        numCards = Number(sessionStorage["numCards"]);
        category = Number(sessionStorage["category"]);

        let rows = getRows(numCards);
        let cols = getCols(numCards);


        let containerHeight = id("memory-game").getBoundingClientRect().height;
        let containerWidth = id("memory-game").getBoundingClientRect().width;

        let cardHeight = Math.floor(containerHeight / rows) + 10;
        let cardWidth = Math.floor(containerWidth / cols) - 15;
 
        // generate a unique set of cards based on user input at the start of each game
        for (let i = 0; i < (numCards / 2); i++) {
            let imgName = createRandomCardName(category);
            // create a unique random card pair
            if (!id(imgName)) {
                for (let j = 0; j < 2; j++) {
                    let card = gen("div");

                    card.classList.add("memory-card");
                    card.id = imgName;
                    card.alt = imgName;

                    let front = gen("img");
                    front.classList.add("front");
                    front.src = "imgs/" + imgName + ".png";
                    front.alt = imgName;

                    let back = gen("img");
                    back.classList.add("back");
                    back.src = BACK_OF_CARD;
                    back.alt = "Memory Card";

                    card.style.height = String(cardHeight) + "px";
                    card.style.width = String(cardWidth) + "px";

                    card.addEventListener("click", flipCard);
                    card.appendChild(front);
                    card.appendChild(back);
                    id("memory-game").appendChild(card);
                }
            }
            else {
                // when card is not unique, try again
                i--;
            }
        }

        // arrange cards so they are in random order
        qsa(".memory-card").forEach(card => {
            card.style.order = Math.ceil(Math.random() * numCards); // random order
        });
    }

    /**
     * fetches the specific game specs (given by a user-selected input)
     * @returns an array containing the game specs: [numCars, category]
     */
    function getGameSpecs() {
        let gameSpecs = [sessionStorage["numCards"], sessionStorage["category"]];
        // let gameSpecs = "";
        // fetch("/specs")
        // .then(checkStatus)
        // .then(resp => resp.json())
        // .then(resp => {gameSpecs = [resp.numCards, resp.category]})
        // .catch(handleError);
        return gameSpecs;
    }
 
    /**
     * Flip if card has not been flipped yet. If it has,
     * simply returns and does nothing. If card is flipped 
     * as a result of the current call to this function,
     * also checks if pair of "unflipped" cards are a match.
     */
    function flipCard() {
        if (isBoardLocked || this === card1) {
            // don't flip
            return;
        }
        // flip card!
        this.classList.add("flip");

        // update various game states
        if (!isFlipped) {
            isFlipped = true;
            card1 = this;
            return;
        }

        card2 = this;
        isBoardLocked = true; // do not want any other cards to be flipped now

        handleMatch();
    }
 
    /**
     * If cards flipped are a match, then disable them and if not
     * place them in their original position (that is, flipped so that
     * the back face of the card is showing)
     */
    function handleMatch() {
        // if is match
        if (card1.id === card2.id) {
            id("pairs").textContent = Number(id("pairs").textContent) + 1;
            id("congrats-msg").classList.remove("hidden");
            lockCardPair();
            setTimeout(() => {
                id("congrats-msg").classList.add("hidden");
            }, 2000);

            // check if game is won:
            if (Number(id("pairs").textContent) === numCards / 2) {
                // flip and then show the alert
                setTimeout(() => {
                    alert("You found all pairs! Congrats!");
                }, 800);
            }
        }
        else {
            unflipSelectedPair();
        }
    }

    /**
     * When a pair has been found, locks this
     * given pair of cards for further flipping.
     */
    function lockCardPair() {
        card1.removeEventListener("click", flipCard);
        card2.removeEventListener("click", flipCard);
        gameStateResetVals();
    }

    /**
     * Flip card pair back to original position 
     * (that is, back of card is visible)
     */
    function unflipSelectedPair() {
        setTimeout(() => {
            card1.classList.remove("flip");
            card2.classList.remove("flip");
            gameStateResetVals();
        }, 1500); // transition effect
    }
 
    /**
     * Resets the board game state by clearing prior
     * values stored in card1 and card2. Also ensures
     * the board is not locked and no cards are flipped.
     */
    function gameStateResetVals() {
        // reset values for 1st and 2nd cards
        card1 = null;
        card2 = null;
        // if "reset" called, so no cards have
        // been flipped yet (in this game state)
        isFlipped = false;
        isBoardLocked = false;
    }

    /**
     * Flips all cards at once. An escape option if the user
     * would like to end game and see all cards "unflipped" at once.
     */
    function flipAll() {
        gameStateResetVals();
        qsa(".memory-card").forEach(card => {
            card.classList.add("flip");
        });
        isBoardLocked = true;
    }
    

    /* ------------------------------ Shorthand Functions ------------------------------ */
    /**
     * Returns the element that has the ID attribute with the specified value.
     * @param {string} idName - element ID
     * @returns {object} DOM object associated with id (null if none).
     */
    function id(idName) {
        return document.getElementById(idName);
    }

    /**
     * Returns the first element that matches the given CSS selector.
     * @param {string} selector - CSS query selector string.
     * @returns {object} first element matching the selector in the DOM tree (null if none)
     */
    function qs(selector) {
        return document.querySelector(selector);
    }

    /**
     * Returns the array of elements that match the given CSS selector.
     * @param {string} selector - CSS query selector
     * @returns {object[]} array of DOM objects matching the query (empty if none).
     */
    function qsa(selector) {
        return document.querySelectorAll(selector);
    }
  
    /**
     * @param {object} elType- element type
     * 
     * @returns {object} new DOM element matching elType (empty if none).
     */
    function gen(elType) {
        return document.createElement(elType);
    }

    /**
     * Checks the status of the response, throwing an Error if it has a non-200
     * status code, otherwise returning back the response.
     * @param {Response} Response object to check
     * @returns {Response} unmodified Response object if successful
     * @throws {Error} if Response has non-200 error code
     */
    function checkStatus(response) {
        if (!response.ok) {
            throw Error("Error in Request: " + response.statusText);
        }
        return response;
    }

    /**
     * Displays an error message on the page using the message given to the Error.
     * @param {Error} - error object with error message.
     */
    function handleError(err) {
        console.log("Something went wrong: " + err.message);
    }
})();