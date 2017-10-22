// Globala variabler

var wordList = ['javascript', 'chas', 'school', 'programmer', 'master', 'explorer']; // List with game words
var selectedWord; // randomly selected word
var domLetterBoxes;
var isGameStarted = false;

var hangmanImg; // Image that shows up depending on how many incorrect guesses
var numberOfFailedAttempts;

var domMessages; // Message when game is over
var letterButtons;
var domTimer;
var gameTimerId;
var timeSpentInSeconds;
var numberOfRemainingLetters;


// Function that runs when the entire webpage is loaded, ie when all HTML code is performed
function init() {
    console.log("init");
    domMessages = document.getElementById("message");
    domTimer = document.getElementById("timer");
}

window.onload = init; // Ensure that init is activated when the page is loaded

function startGame() {
    console.log("startGame");

    randomizeWord();
    prepareBoxes();
    domMessages.innerHTML = "";
    isGameStarted = true;

    numberOfFailedAttempts = 0;
    updateHangmanImage();

    startTimer();
    enableLetterButtons();
}

function startTimer() {
    timeSpentInSeconds = 0;

    if (typeof gameTimerId !== 'undefined') { // checks if the Id is defined. Previous timer is running
        clearInterval(gameTimerId);
    }

    gameTimerId = setInterval(function() { updateTimer() }, 1000);
}

function enableLetterButtons() {
    var domLetterButtons = document.getElementById("letterButtons");

    for (var i = 0; i < domLetterButtons.childElementCount; i++) {
        var domChild = domLetterButtons.children[i];
        domChild.firstChild.removeAttribute("disabled");
    }
}

function updateTimer() {
    timeSpentInSeconds++; // timeSpentInSeconds = timeSpentInSeconds + 1;
    domTimer.innerHTML = "Time spent: " + timeSpentInSeconds + " seconds.";
}

function randomizeWord() {
    console.log("randomizeWord");

    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    numberOfRemainingLetters = selectedWord.length;

    console.log("selectedWord: " + selectedWord);
}

// The function that displays the box for letters depending on the word
function prepareBoxes() {
    console.log("prepareBoxes");

    var domLetterBoxesSection = document.getElementById('letterBoxes'); //Find the element in HTML and saves it in a variable.

    // Remove old boxes
    while (domLetterBoxesSection.hasChildNodes()) {
        domLetterBoxesSection.removeChild(domLetterBoxesSection.lastChild);
    }

    var domUl = document.createElement('ul'); //Creates a ul element and saves it in a variable.
    domLetterBoxesSection.appendChild(domUl); // Adds the Ul to the element in the DOM tree

    domLetterBoxes = []; // Empty array

    for (var i = 0; i < selectedWord.length; i++) {
        var domLi = document.createElement('li'); // Creates an element of type li
        domUl.appendChild(domLi); // Adds the li to the ul.
        domLetterBoxes.push(domLi); // Saves a pointer to the li in the array

        // Function that disables / enables letter buttons depending on which part of the game you are on

        //Created element like: <input type="text" disabled="" value="_">
        var domInput = document.createElement('input');
        domLi.appendChild(domInput);
        domInput.setAttribute("type", "text");
        domInput.setAttribute("disabled", "");
        domInput.setAttribute("value", "_");
    }
}

function updateHangmanImage() {
    var domHangmanImg = document.getElementById('hangman');
    domHangmanImg.setAttribute("src", "images/h" + numberOfFailedAttempts + "." + "png");
}

// Function that allows you to press on the buttons in the game
function letterPressed(domButton) {
    if (!isGameStarted) {
        return;
    }

    domButton.setAttribute("disabled", "");
    var guessedLetter = domButton.getAttribute("value");
    console.log("guessedLetter: " + guessedLetter);

    var guessedLetterCorrect = false;

    for (var j = 0; j < selectedWord.length; j++) {
        if (selectedWord.charAt(j).toUpperCase() == guessedLetter.toUpperCase()) {
            // Guessed letter is correct, the letter will appear in the corresponding letterBox.
            domLetterBoxes[j].firstChild.setAttribute("value", guessedLetter.toUpperCase());
            guessedLetterCorrect = true;
            numberOfRemainingLetters--; // Decrease by 1
        }
    }

    if (guessedLetterCorrect) {
        if (numberOfRemainingLetters == 0) {
            endGame(false);
        }
    } else {
        numberOfFailedAttempts++;
        updateHangmanImage();
        if (numberOfFailedAttempts == 6) {
            endGame(true);
        }
    }
}

// Function called if you have won or lost the game 
function endGame(hangedMan) {
    clearInterval(gameTimerId);
    isGameStarted = false;

    if (hangedMan) {
        domMessages.innerHTML = "Game Over. The correct word was " + selectedWord;
    } else {
        domMessages.innerHTML = "Congratulations, you have guessed the correct word";
    }
}