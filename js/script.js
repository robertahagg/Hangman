// Globala variabler

var wordList = ['javascript', 'chas', 'school', 'programmer', 'master', 'explorer']; // Lista med spelets alla ord
var selectedWord; // Ett av orden valt av en slumpgenerator
var domLetterBoxes; //Rutorna där bokstäverna ska stå

var hangmanImg; //Bild som kommer vid fel svar
var hangmanImgNr; // Vilken av bilderna som kommer upp beroende på hur många fel du gjort

var msgElem; // Ger meddelande när spelet är över
var startGameBtn; // Knappen du startar spelet med
var letterButtons; // Knapparna för bokstäverna
var startTime; // Mäter tiden
var remainingLetters; //


// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd


// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
    console.log("init");
    msgElem = document.getElementById("message");
} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad


// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

function startGame() {
    console.log("startGame");
    randomizeWord();
    prepareBoxes();
    hangmanImgNr = 0;

    var domLetterButtons = document.getElementById("letterButtons");
    for (var i = 0; i < domLetterButtons.childElementCount; i++) {
        debugger;
        var domChild = domLetterButtons.children[i];
        domChild.firstChild.removeAttribute("disabled");
    }
}

// Funktion som slumpar fram ett ord
function randomizeWord() {
    console.log("randomizeWord");

    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];

    console.log("selectedWord: " + selectedWord);
    remainingLetters = selectedWord.length;
}

// Funktionen som tar fram bokstävernas rutor, antal beror på vilket ord
function prepareBoxes() {
    console.log("prepareBoxes");

    var domLetterBoxesSection = document.getElementById('letterBoxes'); //find the element in HTML and saves it in a variable.

    while (domLetterBoxesSection.hasChildNodes()) {
        domLetterBoxesSection.removeChild(domLetterBoxesSection.lastChild);
    }

    var domUl = document.createElement('ul'); //creates a ul element and saves it in a variable.
    domLetterBoxesSection.appendChild(domUl); // adds the Ul to the element in the DOM tree

    domLetterBoxes = []; // empty array

    for (var i = 0; i < selectedWord.length; i++) {
        var domLi = document.createElement('li'); // creates an element of type li
        domUl.appendChild(domLi); // adds the li to the ul.
        domLetterBoxes.push(domLi); // saves a pointer to the li in the array

        //created element like: <input type="text" disabled="" value="_">
        var domInput = document.createElement('input');
        domLi.appendChild(domInput);
        domInput.setAttribute("type", "text");
        domInput.setAttribute("disabled", "");
        domInput.setAttribute("value", "_");

    }


}
// Funktion som körs när du trycker på bokstäverna och gissar bokstav

function letterPressed(domButton) { // function that allows you to press on the buttons in the game
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
        if (hangmanImgNr == 6) {
            endGame(true);
        }
    }
}

// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det

function endGame(hangedMan) {
    if (hangedMan) {
        window.alert("Game Over. The correct word was " + selectedWord);

    } else {
        window.alert("Congratulations, you have guessed the correct word");
    }
}



// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på