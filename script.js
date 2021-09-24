// Générer un nombre aléatoire entre 1 et 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

//Stocker les références aux paragraphes de résultats dans HTML
let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');

// Stocker les références au champ de saisie du formulaire et au bouton de soumission
let guessField = document.querySelector('.guessField');
let guessSubmit = document.querySelector('.guessSubmit');

// Stocker un nombre de suppositions qui vaut initialement 1
let guessCount = 1;

// Créer un bouton reset (non crée à ce stade du code)
let resetButton;

// Fonction qui vérifie si la supposition du joueur est correcte ou non, et renvoie la réponse appropriée
function checkGuess(){
  let userGuess = guessField.value; // Vérifie que le nombre entré dans guessField est bien un nombre
  if (guessCount === 1) {
    guesses.textContent = 'Propositions précédentes : '; // Si le nombre d'essais est égal à 1, on affiche "Propositions précédentes" (cela initialise le début des essais)
  }
  guesses.textContent += userGuess + ' / '; // On ajoute à "Propositions précédentes le nombre indiqué dans userGuess, et séparé d'un " / " pour séparer chaque nouveau userGuess entré "

  if (userGuess === randomNumber) { // Si userGuess est le bon nombre qu'on veut trouver, affiche "Bravo",
    lastResult.textContent = 'Bravo, vous avez trouvé le juste prix !';
    // passe la couleur de fond en vert
    lastResult.style.backgroundColor = 'green';
    // efface les valeurs de lowOrHi
    lowOrHi.textContent = '';
    // et lance setGameOver() dont le rôle est de terminer proprement le jeu.
    setGameOver();
  } else if (guessCount === 10) { // Si le nombre d'essais dépasse 10, affiche "Perdu"
     lastResult.textContent = '!!! PERDU !!!';
    // et lance setGameOver() dont le rôle est de terminer proprement le jeu.
     setGameOver();
  } else {
    // Si userGuess n'est pas le bon nombre qu'on veut trouver, affiche "Faux",
     lastResult.textContent = 'Faux !';
    // passe la couleur de fond en vert
     lastResult.style.backgroundColor = 'red';
    // Lance une nouvelle boucle, pour dire si c'est plus ou moins 
     if (userGuess < randomNumber) {
      lowOrHi.textContent = "C'est plus !";
     } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "C'est moins !";
     }
  }

  guessCount++; // Incrémente le nombre du compteur
  guessField.value = ''; // Efface le champ texte du formulaire
  guessField.focus(); // Place automatiquement le curseur dans le champ texte <input> dès le chargement de la page
}

// Ajoute un écouteur d'évènement au bouton guessSubmit qui prend 2 arguments : il se déclenche au click, et le code qu'on veut lancer est contenu dans la fonction checkGuess()
guessSubmit.addEventListener('click', checkGuess);

// Fonction pour relancer la partie
function setGameOver() {
  guessField.disabled = true; // Désactivent l'entrée de texte et le bouton en définissant leurs propriétés désactivées à true.
  guessSubmit.disabled = true;

  resetButton = document.createElement('button'); // Génère un nouveau bouton
  resetButton.textContent = 'Démarrer une nouvelle partie'; // dont l'intitulé est "Démarrer une nouvelle partie"
  document.body.appendChild(resetButton); // Ajoute ce nouveau bouton APRÈS (append) le body
  resetButton.addEventListener('click', resetGame); // Définit un écouteur d'événement sur ce nouveau bouton : un click sur le bouton déclenchera un appel de la fonction  resetGame()
}

function resetGame() {
  guessCount = 1; // Remet le compteur guessCount à 1

  let resetParas = document.querySelectorAll('.resultParas p'); // Efface tous les paragraphes d'information
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton); // Supprime le bouton de réinitialisation.

  guessField.disabled = false; // Réactive les élements de formulaire
  guessSubmit.disabled = false;
  guessField.value = ''; // Vide le champ de texte
  guessField.focus(); // Place à nouveau le curseur dans le champ texte <input> pour qu'il soit prêt à entrer une nouvelle proposition

  lastResult.style.backgroundColor = 'white'; // Supprime la couleur d'arrière plan du paragraphe lastResult

  randomNumber = Math.floor(Math.random() * 100) + 1; // Génère un nouveau nombre aléatoire
}