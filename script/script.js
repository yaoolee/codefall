const bugList = [
  "undefined", "null", "NaN", "TypeError", "SyntaxError",
  "console.log()", "=", "let", "const", "var", "()", "{}", "[]", "string", "true", "false", "boolean"
];

const fallArea = document.getElementById("fall-area");
const inputBox = document.getElementById("input-box");
const scoreDisplay = document.getElementById("final-score");
const themeToggle = document.getElementById("theme-toggle");
const restartBtn = document.getElementById("restart-btn");
const gameOverScreen = document.getElementById("game-over-screen");
const finalScore = document.getElementById("final-score");


let score = 0;
let bugInterval;
let timer;
let gameDuration = 60; // seconds
let timeRemaining;

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Typing detection
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const typed = inputBox.value.trim();

    const bugs = document.querySelectorAll(".bug");
    let fixed = false;

    bugs.forEach(bug => {
      if (bug.textContent === typed) {
        fallArea.removeChild(bug);
        score += 10;
        fixed = true;
      }
    });

    if (fixed) {
      scoreDisplay.textContent = `Score: ${score}`;
    }

    inputBox.value = "";
  }
});

// Keep input focused on mobile
inputBox.addEventListener("blur", () => {
  setTimeout(() => inputBox.focus(), 200);
});

// Create a falling bug
function spawnBug() {
  const bug = document.createElement("div");
  bug.classList.add("bug");

  const text = bugList[Math.floor(Math.random() * bugList.length)];
  bug.textContent = text;

  const left = Math.random() * 80 + 10;
  bug.style.left = `${left}%`;

  fallArea.appendChild(bug);

  // Remove bug after 5s if not caught
  setTimeout(() => {
    if (fallArea.contains(bug)) {
      fallArea.removeChild(bug);
    }
  }, 5000);
  console.log("spawning bug");
}

// Game Over function
function endGame() {
  clearInterval(bugInterval);
  clearInterval(timer);
  inputBox.disabled = true;
  gameOverScreen.classList.remove("hidden");
  finalScore.textContent = `Your score: ${score}`;
}

// Timer countdown
function startTimer() {
  timeRemaining = gameDuration;
  timer = setInterval(() => {
    timeRemaining--;
    if (timeRemaining <= 0) {
      endGame();
    }
  }, 1000);
}

// Start or restart the game
function startGame() {
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  fallArea.innerHTML = "";
  inputBox.value = "";
  inputBox.disabled = false;
  inputBox.focus();

  clearInterval(bugInterval);
  clearInterval(timer);

  gameOverScreen.classList.add("hidden");

  bugInterval = setInterval(spawnBug, 2000);
  startTimer();
}

// Restart button handler
restartBtn.addEventListener("click", () => {
  startGame();
});

// Start game on initial load
startGame();
