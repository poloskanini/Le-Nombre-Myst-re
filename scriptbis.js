// Générer un nombre aléatoire entre 1 et 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

//Stocker les références aux paragraphes de résultats dans HTML
let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let guessesContent = document.querySelector('.guessesContent');
let resultParas = document.querySelector('div .resultParas');
let resultsWrapper = document.querySelector('.resultsWrapper')


// Stocker les références au champ de saisie du formulaire et au bouton de soumission
let guessField = document.querySelector('.guessField');
let guessSubmit = document.querySelector('.guessSubmit');

// Stocker un nombre de suppositions qui vaut initialement 1
let count = 1;
let resetButton;

// Placer le curseur sur guessField par défaut
guessField.focus();

// Fonction qui vérifie si la supposition du joueur est correcte ou non, et renvoie la réponse appropriée


function checkGuess() {
  let userGuess = Number(guessField.value);

  // Compteur de coups
  let remainingGuesses = document.querySelector('.remainingGuesses');
  let countingLeft = 10;
  countingLeft -= count;
  remainingGuesses.textContent = "Nombre d'essais restants : ";
  remainingGuesses.textContent += countingLeft;

  if (count === 1) { // Si le nombre d'essais est égal à 1, on affiche "Propositions précédentes" (cela initialise le début des essais)
    guesses.textContent = "Propositions précédentes : \n";
  }
  guessesContent.textContent += userGuess + ' / ' ;
  if (userGuess === randomNumber) {
    lastResult.textContent = 'BRAVO ! Vous avez gagné !';
    lastResult.style.backgroundColor = 'green';
    guesses.textContent = '';
    remainingGuesses.textContent = '';
    guessesContent.textContent = '';
    setGameOver();
  } else if (count === 10) {
    lastResult.textContent = "PERDU ! Vous avez dépassé les 10 essais";
    guesses.textContent = '';
    remainingGuesses.textContent = '';
    guessesContent.textContent = '';
    setGameOver();
  } else {
    lastResult.textContent = "Faux ! ";
    if (userGuess < randomNumber) {
      lastResult.style.backgroundColor = "red";
      lastResult.textContent += "C'est plus ! 👍🏼"
    } else if (userGuess > randomNumber) {
      lastResult.style.backgroundColor = "orange";
      lastResult.textContent += "C'est moins ! 👎🏼"
    }
  }
  count++;
  guessField.value = '';
  guessField.focus();
}  

// Déclenchement de la fonction checkGuess() avec le click
guessSubmit.addEventListener('click', checkGuess);

// Déclenchement de la fonction checkGuess() avec la touche ENTER
var elem = document.getElementById("guessField");
elem.onkeyup = function(e){
    if(e.keyCode == 13){
       checkGuess();
    }
}

// Fonction pour reseter la partie
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  
  resetButton = document.createElement('button');
  resetButton.textContent = "Démarrer une nouvelle partie";
  resetButton.style.fontSize="1.5rem";
  resetButton.style.width="50%";
  resetButton.style.cursor="pointer";
  resultsWrapper.appendChild(resetButton);
  resetButton.addEventListener('click', restartGame)
}

// Fonction pour relancer une nouvelle partie
function restartGame() {
  count = 1;
  let resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = '';
  }
  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();
  lastResult.style.backgroundColor = 'transparent';

  randomNumber = Math.floor(Math.random() * 100) + 1;
}