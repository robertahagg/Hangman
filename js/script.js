// Globala variabler

var wordList = ['Java', 'Chas', 'School', 'Programmer', 'Master', 'Battle']; // Lista med spelets alla ord
var selectedWord; // Ett av orden valt av en slumpgenerator
var letterBoxes; //Rutorna där bokstäverna ska stå

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
    for (var i = 0; i < selectedWord.length; i++) {
        letterBoxes[i] = "_";

    }
    var remainingLetters = word.length;
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav



// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på