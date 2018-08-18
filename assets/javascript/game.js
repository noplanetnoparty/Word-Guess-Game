var selectableWords = // Word list
    [
        "lion",
        "dog",
        "elephant",
        "bear",
        "flamingo",
        "parrot",
        "bobcat",
        "penguin",
        "seal",
        "dolphin",
        "tiger",
        "panda",
        "giraffe",
        "leopard",
        "spider",
        "turtle",
        "frog",
        "puffin",
        "ostrich",
        "hedgehog",
        "cheetah",
        "chinchilla",
        "woodchuck",
        "lemur",
        "gazelle",
        "chimpanzee",
        "orangutan",
        "mongoose",
    ];

const maxTries = 10;

var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var gameStarted = false;
var hasFinished = false;
var wins = 0;


function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    guessedLetters = [];
    guessingWord = [];


    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }

    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";


    updateDisplay();
};


function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if (remainingGuesses <= 0) {
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
    }
};

document.onkeydown = function (event) {

    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else {

        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }


        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

    updateDisplay();
    checkWin();
};


function evaluateGuess(letter) {

    var positions = [];


    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if (selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        wins++;
        hasFinished = true;
    }
};