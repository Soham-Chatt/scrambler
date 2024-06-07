document.addEventListener('DOMContentLoaded', function() {
  const scrambleElement = document.getElementById('scramble');
  const generateButton = document.getElementById('generate');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  let scrambleHistory = [];
  let currentIndex = -1;

  generateButton.addEventListener('click', generateScramble);
  prevButton.addEventListener('click', showPreviousScramble);
  nextButton.addEventListener('click', showNextScramble);

  browser.storage.local.get(['scrambleHistory', 'currentIndex']).then((result) => {
    if (result.scrambleHistory && result.currentIndex !== undefined) {
      scrambleHistory = result.scrambleHistory;
      currentIndex = result.currentIndex;
      updateScrambleDisplay();
      updateButtons();
    }
  });

  function generateScramble() {
    const moves = ["U", "D", "L", "R", "F", "B"];
    const modifiers = ["", "'", "2"];
    let scramble = "";

    for (let i = 0; i < 20; i++) {
      const move = moves[Math.floor(Math.random() * moves.length)];
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      scramble += move + modifier + " ";
    }

    if (currentIndex < scrambleHistory.length - 1) {
      scrambleHistory = scrambleHistory.slice(0, currentIndex + 1);
    }
    scrambleHistory.push(scramble.trim());
    currentIndex++;

    browser.storage.local.set({ scrambleHistory: scrambleHistory, currentIndex: currentIndex });
    updateScrambleDisplay();
    updateButtons();
  }

  function showPreviousScramble() {
    if (currentIndex > 0) {
      currentIndex--;
      browser.storage.local.set({ currentIndex: currentIndex });
      updateScrambleDisplay();
      updateButtons();
    }
  }

  function showNextScramble() {
    if (currentIndex < scrambleHistory.length - 1) {
      currentIndex++;
      browser.storage.local.set({ currentIndex: currentIndex });
      updateScrambleDisplay();
      updateButtons();
    } else {
      generateScramble();
    }
  }

  function updateScrambleDisplay() {
    scrambleElement.innerText = scrambleHistory[currentIndex] || "";
  }

  function updateButtons() {
    prevButton.disabled = currentIndex <= 0;
    nextButton.disabled = currentIndex >= scrambleHistory.length - 1 && scrambleHistory.length > 0;
  }
});
