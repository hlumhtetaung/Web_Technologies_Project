// Game State & Word Bank
const WORD_LIST = ["APPLE", "BEACH", "BRAIN", "CLOUD", "DRINK", "FLAME", "GHOST", "LIGHT", "MUSIC", "OCEAN", "PARTY", "PIANO", "PILOT", "PLANE", "QUIET", "RIVER", "SNAKE", "SPACE", "STORM", "TABLE", "TIGER", "VOICE", "WATCH", "WATER", "WORLD", "YOUTH"];
let targetWord = "";
let currentGuess = "";
let guesses = [];
let streak = localStorage.getItem("wordle-streak") || 0;

// Initialize Game
function initGame() {
    targetWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    guesses = [];
    currentGuess = "";
    createBoard();
    createKeyboard();
    document.getElementById("streak-count").innerText = streak;
}

// Draw the Board
function createBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < 5; j++) {
            let tile = document.createElement("div");
            tile.className = "tile";
            tile.id = `tile-${i}-${j}`;
            row.appendChild(tile);
        }
        board.appendChild(row);
    }
}

// Logic for Key Presses
document.addEventListener("keydown", (e) => {
    if (guesses.length >= 6) return;

    if (e.key === "Enter") {
        submitGuess();
    } else if (e.key === "Backspace") {
        currentGuess = currentGuess.slice(0, -1);
        updateView();
    } else if (/^[a-z]$/i.test(e.key) && currentGuess.length < 5) {
        currentGuess += e.key.toUpperCase();
        updateView();
    }
});

// Update UI with letters
function updateView() {
    let rowIdx = guesses.length;
    for (let i = 0; i < 5; i++) {
        let tile = document.getElementById(`tile-${rowIdx}-${i}`);
        tile.innerText = currentGuess[i] || "";
    }
}

// Process Word Submission
function submitGuess() {
    if (currentGuess.length !== 5) return;

    let rowIdx = guesses.length;
    let guessArr = currentGuess.split("");
    let targetArr = targetWord.split("");

    guessArr.forEach((letter, i) => {
        let tile = document.getElementById(`tile-${rowIdx}-${i}`);
        if (letter === targetArr[i]) {
            tile.classList.add("correct");
        } else if (targetArr.includes(letter)) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    });

    if (currentGuess === targetWord) {
        endGame(true);
    } else if (guesses.length === 5) {
        endGame(false);
    }

    guesses.push(currentGuess);
    currentGuess = "";
}

// Handle Win/Loss & Streaks
function endGame(win) {
    const modal = document.getElementById("modal");
    const msg = document.getElementById("modal-message");
    document.getElementById("target-word-display").innerText = targetWord;

    if (win) {
        streak++;
        msg.innerText = "Splendid! 🎉";
    } else {
        streak = 0;
        msg.innerText = "Next time! 😢";
    }

    localStorage.setItem("wordle-streak", streak);
    document.getElementById("streak-count").innerText = streak;
    setTimeout(() => modal.classList.remove("hidden"), 1000);
}

function resetGame() {
    document.getElementById("modal").classList.add("hidden");
    initGame();
}

// Setup Keyboard UI (Simplified for brevity)
function createKeyboard() {
    const keys = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
    const kb = document.getElementById("keyboard");
    kb.innerHTML = "";
    keys.forEach(row => {
        let rowDiv = document.createElement("div");
        rowDiv.className = "key-row";
        row.split("").forEach(key => {
            let keyDiv = document.createElement("div");
            keyDiv.className = "key";
            keyDiv.innerText = key;
            rowDiv.appendChild(keyDiv);
        });
        kb.appendChild(rowDiv);
    });
}

initGame();