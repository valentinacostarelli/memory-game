/**
 * @author Valentina Costarelli
 * CS 101 Spring Term 2021
 *
 * Retrieves data to select how many cards and
 * what category the desired game should have
 */
"use strict";
const express = require("express");
const fs = require("fs");
const app = express();
 
// gets the background images
app.get("/backgrounds", (req, res) => {
    res.type("json");
    fs.readFile("backgroundImgs.json", function (err, data) {
        let backgrounds = JSON.parse(data);
        JSON.stringify(backgrounds);
        res.send(backgrounds);
    });
});

// if 8 cards = 2 rows, 4 cols
// if 12 cards = 3 rows, 4 cols
// if 16 cards = 4 rows, 4 cols
// if 20 cards = 4 rows, 5 cols
// if 24 cards = 4 rows, 6 cols
app.get("/grid", (req, res) => {
    res.type("json");
    fs.readFile("gridInfo.json", function (err, data) {
        let gridInfo = JSON.parse(data);
        res.send(JSON.stringify(gridInfo));
    });
});

// returns user specified specs, if null catches the error by returning a default value
// but session storage does not work in server side code
// app.get('/specs', (req, res) => {
//     res.type("json");
//     let numCards = sessionStorage["numCards"] != NULL ? sessionStorage["numCards"] : "12";
//     let category = sessionStorage["category"] != NULL ? sessionStorage["category"] : "5";
//     let specs = { "numCards" : numCards, "category" : category };
//     res.send(JSON.stringify(specs));
// });
 
// starting the app
app.use(express.static("public"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Listening on port " + PORT + "...");
});