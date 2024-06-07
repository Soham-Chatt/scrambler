document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('generate').addEventListener('click', generateScramble);
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

  document.getElementById('scramble').innerText = scramble.trim();
}
