document.addEventListener('DOMContentLoaded', function() {
  const scrambleElement = document.getElementById('scramble');
  const generateButton = document.getElementById('generate');

  let scrambleHistory = [];
  let currentIndex = -1;

  generateButton.addEventListener('click', generateScramble);

  browser.storage.local.get(['scrambleHistory', 'currentIndex']).then((result) => {
    if (result.scrambleHistory && result.currentIndex !== undefined) {
      scrambleHistory = result.scrambleHistory;
      currentIndex = result.currentIndex;
      updateScrambleDisplay();
    }
  });

  function generateScramble() {
    const moves = ["U", "D", "L", "R", "F", "B"];
    const modifiers = ["", "'", "2"];
    let scramble = "";
    let lastMove = "";
    let secondLastMove = "";

    for (let i = 0; i < 20; i++) {
      let move;
      do {
        move = moves[Math.floor(Math.random() * moves.length)];
      } while (move === lastMove || (lastMove && lastMove === secondLastMove && isOppositeMove(lastMove, move)));

      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      scramble += move + modifier + " ";
      secondLastMove = lastMove;
      lastMove = move;
    }

    if (currentIndex < scrambleHistory.length - 1) {
      scrambleHistory = scrambleHistory.slice(0, currentIndex + 1);
    }
    scrambleHistory.push(scramble.trim());
    currentIndex++;

    browser.storage.local.set({ scrambleHistory: scrambleHistory, currentIndex: currentIndex });
    updateScrambleDisplay();
  }

  function isOppositeMove(move1, move2) {
    const oppositePairs = {
      "U": "D",
      "D": "U",
      "L": "R",
      "R": "L",
      "F": "B",
      "B": "F"
    };
    return oppositePairs[move1] === move2;
  }

  function updateScrambleDisplay() {
    scrambleElement.innerText = scrambleHistory[currentIndex] || "";
  }
});
