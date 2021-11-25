var car_manufacturers = [
	"tesla",
	"mercedes benz",
	"porsche",
	"rivian",
	"lucid",
	"gmc",
	"volvo",
	"audi",
	"lamborghini",
	"bugatti",
	"rolls royce",
	"dodge",
	"aston martin",
	"acura",
    "fiat",
	"cadillac",
	"chevrolet",
	"mini",
	"jaguar",
	"land rover",
	"infiniti",
	"lexus",
	"jeep",
	"maserati",
	"bentley",
	"koenigsegg",
	"ferrari",
	"bmw",
	"mclaren",
	"lincoln",
	"ford",
	"genesis",
	"pontiac",
	"toyota",
	"hummer",
	"honda",
	"nissan",
	"subaru",
	"volkswagen",
	"buick"

]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = car_manufacturers[Math.floor(Math.random() * car_manufacturers.length)];
};

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
};

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
};

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.png';
};

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
};

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
};

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
};

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
};

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.png';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
};

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
