let roll_button = document.getElementById("roll-button");

function rollDice(num) {
  console.log('clicked');
  number = (typeof num !== 'undefined') ? num : getRandomNumber(1, 6);
  const dice = [...document.querySelectorAll(".die-list")];
  dice.forEach((die) => {
    toggleClasses(die);
    die.dataset.roll = number;
  });
  if (typeof num == 'undefined' && typeof syncConnector !== 'undefined') {
    // check if the function was called from the button
    syncConnector.dispatchSyncMessage("roll", JSON.stringify({'number': number}), false, false);
  }
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

roll_button.addEventListener('click', () => rollDice());
