// Globala variabler

var wordList = ['Java', 'Chas', 'School', 'Programmer', 'Master', 'Battle']; // Lista med spelets alla ord
var selectedWord; // Ett av orden valt av en slumpgenerator
var domLetterBoxes; //Rutorna där bokstäverna ska stå

var hangmanImg; //Bild som kommer vid fel svar
var hangmanImgNr; // Vilken av bilderna som kommer upp beroende på hur många fel du gjort

var msgElem; // Ger meddelande när spelet är över
var startGameBtn; // Knappen du startar spelet med
var letterButtons; // Knapparna för bokstäverna
var startTime; // Mäter tiden

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

function startGame() {
    console.log("startGame");
    randomizeWord();
    prepareBoxes();
}

// Funktion som slumpar fram ett ord
function randomizeWord() {
    console.log("randomizeWord");

    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];

    console.log("selectedWord: " + selectedWord);
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



// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på