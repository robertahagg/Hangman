// Globala variabler

var wordList = ['javascript', 'chas', 'school', 'programmer', 'master', 'explorer']; // List with game words
var selectedWord; // Word selected by default
var domLetterBoxes; //Letter boxes

var hangmanImg; //Picture that appears if wrong answer guessed
var hangmanImgNr; // Image that shows up depending on how many incorrect guesses

var domMessages; // Message when game is over
var startGameBtn; // Start button
var letterButtons; // Knapparna för bokstäverna
var startTime; // Timer
var remainingLetters; //


// Function that runs when the entire webpage is loaded, ie when all HTML code is performed


// Initiation of global variables and the linking of functions to the buttons.

function init() {
    console.log("init");
    domMessages = document.getElementById("message");
} // End init

window.onload = init; // Ensure that init is activated when the page is loaded


//Function that starts the game by pressing the button, and then calls for other functions

function startGame() {
    console.log("startGame");
    randomizeWord();
    prepareBoxes();
    hangmanImgNr = 0;
    updateHangmanImage();


    var domLetterButtons = document.getElementById("letterButtons");
    for (var i = 0; i < domLetterButtons.childElementCount; i++) {

        var domChild = domLetterButtons.children[i];
        domChild.firstChild.removeAttribute("disabled");
    }
}

// Function that slums a word

function randomizeWord() {
    console.log("randomizeWord");

    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];

    console.log("selectedWord: " + selectedWord);
    remainingLetters = selectedWord.length;
}

// The function that displays the box for letters depending on the word

function prepareBoxes() {
    console.log("prepareBoxes");

    var domLetterBoxesSection = document.getElementById('letterBoxes'); //Find the element in HTML and saves it in a variable.

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
    domHangmanImg.setAttribute("src", "images/h" + hangmanImgNr + "." + "png");

}

// Function that allows you to press on the buttons in the game

function letterPressed(domButton) {
    domButton.setAttribute("disabled", "");
    var guessedLetter = domButton.getAttribute("value");
    console.log("guessedLetter: " + guessedLetter);

    var guessedLetterCorrect = false;

    for (var j = 0; j < selectedWord.length; j++) {
        if (selectedWord.charAt(j).toUpperCase() == guessedLetter.toUpperCase()) {
            // Guessed letter is correct, the letter will appear in the corresponding letterBox.
            domLetterBoxes[j].firstChild.setAttribute("value", guessedLetter.toUpperCase());
            guessedLetterCorrect = true;
            remainingLetters--; // Decrease by 1
        }
    }

    if (guessedLetterCorrect) {
        if (remainingLetters == 0) {
            endGame(false);
        }
    } else {
        hangmanImgNr++;
        updateHangmanImage();
        if (hangmanImgNr == 6) {
            endGame(true);
        }
    }
}

// Function called if you have won or lost the game 

function endGame(hangedMan) {

    if (hangedMan) {
        domMessages.innerHTML = "Game Over. The correct word was " + selectedWord;
    } else {
        domMessages.innerHTML = "Congratulations, you have guessed the correct word";
    }
}