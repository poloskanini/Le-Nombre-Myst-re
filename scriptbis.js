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

  if (count === 1) { // Si le nombre d'essais est égal à 1, on affiche "Propositions précédentes" (cela initialise le début des essais et l'affichage de "guesses")
    guesses.textContent = "Propositions précédentes : \n";
  }
  guessesContent.textContent += userGuess + ' / ' ; // Stocke les propositions précédentes
  if (userGuess === randomNumber) { // En cas de victoire :
    lastResult.textContent = 'BRAVO ! Vous avez gagné !';
    resultParas.style.backgroundColor = 'lightgreen';
    guesses.textContent = '';
    remainingGuesses.textContent = '';
    guessesContent.textContent = '';
    setGameOver(); // Lance la fonction de réinitialisation de partie
  } else if (count === 10) { // En cas de défaite :
    lastResult.textContent = "PERDU ! Vous avez dépassé les 10 essais";
    guesses.textContent = '';
    remainingGuesses.textContent = '';
    guessesContent.textContent = '';
    resultParas.style.backgroundColor = 'red';
    setGameOver();
  } else { // En cas de résultat trop bas
    lastResult.textContent = "Faux ! ";
    if (userGuess < randomNumber) {
      resultParas.classList.remove("itsless")
      resultParas.classList.add("itsmore")
      lastResult.textContent += "C'est plus ! 👍🏼"
    } else if (userGuess > randomNumber) { // En cas de résultat trop haut
      resultParas.classList.remove("itsmore")
      resultParas.classList.add("itsless")
      lastResult.textContent += "C'est moins ! 👎🏼"
    }
  }
  count++; // Incrémente le compteur
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
  resetButton.style.fontSize="1.2rem";
  resetButton.style.width="70%";
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
  resultParas.style.backgroundColor = 'rgba(242, 247, 247, .9)';

  randomNumber = Math.floor(Math.random() * 100) + 1;
}