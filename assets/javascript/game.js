// GLOBAL VARIABLES
//============================================================

var wordOptions = [
  'argentina',
  'belgium',
  'russia',
  'spain',
  'portugal',
  'japan',
  'mexico',
  'brazil',
  'germany',
  'senegal',
  'nigeria'
];
var selectedWord = '';
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// FUNCTIONS
//============================================================

function startGame() {
  //selects a random word from my wordOptions Array
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  //brings the selected word into individual letters
  lettersInWord = selectedWord.split('');
  //determin the number of letters (length) of the random word
  numBlanks = lettersInWord.length;

  // Need to reset all the variables above each time an iteration of the game is played
  //Reset
  guessesLeft = 9;
  wrongLetters = [];
  blanksAndSuccesses = [];

  //Populate blanks and successes with right number of blanks
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push('_');
  }

  //Change HTML to refelect round conditions

  document.getElementById('wordToGuess ').innerHTML = blanksAndSuccesses.join(
    ' '
  );
  document.getElementById('winCounter ').innerHTML = winCount;
  document.getElementById('lossCounter ').innerHTML = lossCount;
  document.getElementById('numGuess ').innerHTML = guessesLeft;
  //Testing / Debugging
  console.log(selectedWord);
  console.log(lettersInWord);
  console.log(numBlanks);
  console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
  //check if letter existis in the word
  // alert(letter);

  var isLetterInWord = false;

  for (var i = 0; i < numBlanks; i++) {
    if (selectedWord[i] == letter) {
      isLetterInWord = true;
      // alert('Letter found');
    }
  }

  ///Check where in the wrd the etter exists, then populate the blanksAndSuccesses array
  if (isLetterInWord) {
    for (var i = 0; i < numBlanks; i++) {
      if (selectedWord[i] == letter) {
        // console.log('test');
        blanksAndSuccesses[i] = letter;
      }
    }
  }

  //Letter wasn't found
  else {
    wrongLetters.push(letter);
    guessesLeft--;
  }

  //Testing and Debugging
  console.log(blanksAndSuccesses);
}

function roundComplete() {
  console.log(
    'Win Count: ' +
      winCount +
      ' | Loss Count: ' +
      lossCount +
      ' | Guesses Left' +
      guessesLeft
  );
  // Update the HTML to reflect the most recent count stats
  document.getElementById('numGuess ').innerHTML = guessesLeft;
  document.getElementById('wordToGuess ').innerHTML = blanksAndSuccesses.join(
    ' '
  );
  document.getElementById('wrongGuesses ').innerHTML = wrongLetters.join(' ');

  //Check if user won
  if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
    winCount++;
    alert('You Won!');

    //Update the win counter in the HTML
    document.getElementById('winCounter ').innerHTML = winCount;
    startGame();
  }

  //Check if user lost
  else if (guessesLeft == 0) {
    lossCount++;
    alert('You lost');
    //Update HTML
    document.getElementById('lossCounter ').innerHTML = lossCount;
    startGame();
  }
}

// MAIN PROCESS
//============================================================

//Initiates the code the first time
startGame();

//Resgister key clicks
document.onkeyup = function(event) {
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(letterGuessed);

  //
  roundComplete();

  //Testing / Debugging
  console.log(letterGuessed);
};
