// Calculator

// const calculate = (n1, operator, n2) => {
//   const firstNum = parseFloat(n1);
//   const secondNum = parseFloat(n2);
//   if (operator === 'add') return firstNum + secondNum;
//   if (operator === 'subtract') return firstNum - secondNum;
//   if (operator === 'multiply') return firstNum * secondNum;
//   if (operator === 'divide') return firstNum / secondNum;
// };

// const calculator = document.querySelector('.calculator');
// const keys = calculator.querySelector('.calculator__keys');
// const display = document.querySelector('.calculator__display');

// keys.addEventListener('click', e => {
//   if (e.target.matches('button')) {
//     const key = e.target;
//     const action = key.dataset.action;
//     const keyContent = key.textContent;
//     const displayedNum = display.textContent;

//     Array.from(key.parentNode.children).forEach(k =>
//       k.classList.remove('is-depressed')
//     );

//     const previousKeyType = calculator.dataset.previousKeyType;

//     if (!action) {
//       if (displayedNum === '0' || previousKeyType === 'operator') {
//         display.textContent = keyContent;
//       } else {
//         display.textContent = displayedNum + keyContent;
//       }
//       calculator.dataset.previousKeyType = 'number';
//     }
//     if (
//       action === 'add' ||
//       action === 'subtract' ||
//       action === 'multiply' ||
//       action === 'divide'
//     ) {
//       const firstValue = calculator.dataset.firstValue;
//       const operator = calculator.dataset.operator;
//       const secondValue = displayedNum;

//       if (firstValue && operator && previousKeyType !== 'operator') {
//         const calcValue = calculate(firstValue, operator, secondValue);
//         display.textContent = calcValue;
//         calculator.dataset.firstValue = calcValue;
//       } else {
//         calculator.dataset.firstValue = displayedNum;
//       }

//       key.classList.add('is-depressed');
//       calculator.dataset.firstValue = displayedNum;
//       calculator.dataset.operator = action;
//       calculator.dataset.previousKeyType = 'operator';
//     }
//     if (action === 'decimal') {
//       if (!displayedNum.includes('.')) {
//         display.textContent = displayedNum + '.';
//       } else if (
//         previousKeyType === 'operator' ||
//         previousKeyType === 'calculate'
//       ) {
//         display.textContent = '0.';
//       }
//       calculator.dataset.previousKeyType = 'decimal';
//     }
//     if (action !== 'clear') {
//       const clearButton = calculator.querySelector('[data-action=clear]');
//       clearButton.textContent = 'CE';
//     }
//     if (action === 'clear') {
//       if (key.textContent === 'AC') {
//         calculator.dataset.firstValue = '';
//         calculator.dataset.modValue = '';
//         calculator.dataset.operator = '';
//         calculator.dataset.previousKeyType = '';
//       } else {
//         key.textContent = 'AC';
//       }
//       display.textContent = 0;
//       calculator.dataset.previousKeyType = 'clear';
//     }

//     if (action === 'calculate') {
//       let firstValue = calculator.dataset.firstValue;
//       const operator = calculator.dataset.operator;
//       let secondValue = displayedNum;

//       if (firstValue) {
//         if (previousKeyType === 'calculate') {
//           firstValue = displayedNum;
//           secondValue = calculator.dataset.modValue;
//         }
//         display.textContent = calculate(firstValue, operator, secondValue);
//       }
//       calculator.dataset.modValue = secondValue;
//       calculator.dataset.previousKeyType = 'calculate';
//     }
//   }
// });

// Guessing Game
let elem = document.getElementById('loadingPart');
let id = null;
let width = 0;
function move() {
  id = setInterval(function() {
    if (width > 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
      if (width % 20 === 0) {
        clearInterval(id);
      }
    }
  }, 50);
}

function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
}

function shuffle(array) {
  var m = array.length,
    t,
    i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

class guessingGame {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }
  submitGuess(num) {
    let numConverted = +num;
    if (
      isNaN(numConverted) ||
      typeof numConverted > 100 ||
      typeof numConverted < 0
    ) {
      let text = document.createTextNode(
        `${num} is not a number between 0 to 100!`
      );
      let newP = document.createElement('p');
      newP.appendChild(text);
      if (document.querySelector('#info').children.length) {
        document
          .querySelector('#info')
          .replaceChild(newP, document.querySelector('#info').children[0]);
      } else {
        document.querySelector('#info').appendChild(newP);
      }
    } else {
      this.playersGuess = numConverted;
      this.checkGuess();
    }
  }
  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }
  giveHint() {
    const hintShuffle = shuffle([
      generateWinningNumber(),
      generateWinningNumber(),
      this.winningNumber,
    ]);
    let newElem = document.createElement('p');
    let newElemText = document.createTextNode(
      `Your hint: ${hintShuffle[0]}, ${hintShuffle[1]}, ${hintShuffle[2]}`
    );
    newElem.appendChild(newElemText);
    let infoElem = document.querySelector('#info');
    if (infoElem.children.length) {
      infoElem.replaceChild(newElem, infoElem.children[0]);
    } else {
      infoElem.appendChild(newElem);
    }
    let hintButton = document.querySelector('#hint');
    hintButton.disabled = true;
  }
  checkGuess() {
    let phrase = '';
    if (this.playersGuess === this.winningNumber) {
      phrase = `You won! ${this.winningNumber} was the winning number!`;
      let mySubmitButton = document.querySelector('#submitGuess');
      mySubmitButton.disabled = true;
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      phrase = 'You already guessed that number.';
    } else {
      this.pastGuesses.push(this.playersGuess);

      let newGuess = document.createElement('li');
      let newGuessText = document.createTextNode(this.playersGuess);
      newGuess.appendChild(newGuessText);
      document.querySelector('#guessList').appendChild(newGuess);

      if (this.pastGuesses.length === 5) {
        phrase = `You lost. The winning number was ${this.winningNumber}.`;

        let mySubmitButton = document.querySelector('#submitGuess');
        let myHintButton = document.querySelector('#hint');
        mySubmitButton.disabled = true;
        myHintButton.disabled = true;
      } else {
        let diff = this.difference();
        if (diff < 10) {
          phrase = "You're very hot!";
        } else if (diff < 25) {
          phrase = "You're lukewarm!";
        } else if (diff < 50) {
          phrase = "You're a bit chilly!";
        } else {
          phrase = "You're ice cold...";
        }
      }
    }
    let gamePhrase = document.querySelector('#info');
    let newGamePhrase = document.createElement('p');
    let newGamePhraseTextNode = document.createTextNode(phrase);
    newGamePhrase.appendChild(newGamePhraseTextNode);
    if (gamePhrase.children.length) {
      gamePhrase.replaceChild(newGamePhrase, gamePhrase.children[0]);
    } else {
      gamePhrase.appendChild(newGamePhrase);
    }
  }
}

function playGame() {
  let game = new guessingGame();

  const hint = document.querySelector('#hint');
  hint.addEventListener('click', () => {
    game.giveHint();
  });

  const submitGuess = document.querySelector('#submitGuess');
  submitGuess.addEventListener('click', () => {
    move();
    let saveGuessValue = document.querySelector('#input').value;
    document.querySelector('#input').value = '';
    game.submitGuess(saveGuessValue);
  });
  const playAgain = document.querySelector('#playAgain');
  playAgain.addEventListener('click', () => {
    game = new guessingGame();
    width = 0;
    let loadingPartElem = document.getElementById('loadingPart');
    loadingPartElem.style.width = '0%';
    let mySubmitButton = document.querySelector('#submitGuess');
    let myHintButton = document.querySelector('#hint');
    mySubmitButton.disabled = false;
    myHintButton.disabled = false;

    let myGuesses = document.querySelector('#guessList');
    myGuesses.innerHTML = '';
    let myInfo = document.querySelector('#info');
    myInfo.innerHTML = 'You have five attempts. Good luck!';
  });
}

playGame();
