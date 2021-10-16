/**
 * Author: Valentina Costarelli
 * 
 * This is the JavaScript file accompanying index.html, 
 * Handles switching between pages.
 */

"use strict";
(function() {
    init();

    /**
     * Initializes all UI interactiity for the home page
     * of the online webpage "Travel Memory" game.
     * An event listener is added for the click of the
     * button to play game.
     */
    function init() {
        qs("button").addEventListener("click", transitionPages);
    }

    /**
     * Handles transition between webpages.
     * Switches to the game page of the game.
     * 
     * @param none
     * @returns {object}- a CSS style change (implemented implicitly)
     */
     function transitionPages() {
        //get user choices
        let numCards = id("num-cards").value;
        let category = id("category").value;

        // store in session storage:
        sessionStorage.setItem("numCards", numCards);
        sessionStorage.setItem("category", category);

        // now, ready to move to game page
        window.location.href = "mgame.html";
    }

    /* ------------------------------ Shorthand Functions ------------------------------ */
    /**
     * Returns the first element that matches the given CSS selector.
     * @param {string} selector - CSS query selector string.
     * @returns {object} first element matching the selector in the DOM tree (null if none)
     */
    function qs(selector) {
        return document.querySelector(selector);
    }

    /**
     * Returns the element that has the ID attribute with the specified value.
     * @param {string} idName - element ID
     * @returns {object} DOM object associated with id (null if none).
     */
        function id(idName) {
        return document.getElementById(idName);
    }
})();
