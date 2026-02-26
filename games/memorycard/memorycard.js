const IMAGE_PATH = "../../images/";
const ROWS = 4;
const COLUMNS = 5;
let score = 0;

const CARD_TYPES = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lighting",
    "metal",
    "psychic",
    "water"
];

let deck = [];
let board = [];
let firstCard = null;
let secondCard = null;
let errors = 0;

window.addEventListener("load", initializeGame);

/*
 * Initializes game state and renders the board.
 */
function initializeGame() {
    createShuffledDeck();
    generateBoard();
}

/*
 * Creates a duplicated deck and applies Fisher–Yates shuffle.
 */
function createShuffledDeck() {
    deck = [...CARD_TYPES, ...CARD_TYPES];

    for (let i = deck.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]];
    }
}

/*
 * Dynamically generates the board grid and attaches event handlers.
 */
function generateBoard() {
    const gameBoard = document.getElementById("game-board");

    for (let r = 0; r < ROWS; r++) {
        const row = [];

        for (let c = 0; c < COLUMNS; c++) {
            const value = deck.pop();
            row.push(value);

            const card = document.createElement("div");
            card.classList.add("card-container");
            card.dataset.row = r;
            card.dataset.column = c;

            card.appendChild(createImageElement("back"));
            card.addEventListener("click", handleCardSelection);

            gameBoard.appendChild(card);
        }

        board.push(row);
    }
}

/*
 * Controls card selection flow and prevents invalid interactions.
 */
function handleCardSelection() {
    if (this.classList.contains("matched")) return;
    if (secondCard) return;

    if (!firstCard) {
        firstCard = this;
        revealCard(this);
        return;
    }

    if (this !== firstCard) {
        secondCard = this;
        revealCard(this);
        setTimeout(checkForMatch, 1000);
    }
}

/*
 * Reveals the PNG image associated with the selected card.
 */
function revealCard(cardElement) {
    const row = cardElement.dataset.row;
    const column = cardElement.dataset.column;

    cardElement.innerHTML = "";
    cardElement.appendChild(createImageElement(board[row][column]));
}

/*
 * Validates whether the selected cards match and updates state.
 */
function checkForMatch() {
    const r1 = firstCard.dataset.row;
    const c1 = firstCard.dataset.column;
    const r2 = secondCard.dataset.row;
    const c2 = secondCard.dataset.column;

    if (board[r1][c1] === board[r2][c2]) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
    } else {
        resetCard(firstCard);
        resetCard(secondCard);
        updateErrorCount();
    }

    firstCard = null;
    secondCard = null;
}

/*
 * Restores a card to its hidden PNG state.
 */
function resetCard(cardElement) {
    cardElement.innerHTML = "";
    cardElement.appendChild(createImageElement("back"));
}

/*
 * Increments and displays the error counter.
 */
function updateErrorCount() {
    errors++;
    document.getElementById("errors").textContent = errors;
}

/*
 * Creates and returns an <img> element using PNG assets exclusively.
 */
function createImageElement(imageName) {
    const img = document.createElement("img");
    img.src = IMAGE_PATH + imageName + ".png";
    img.alt = imageName;
    return img;
}

function checkForMatch() {
    const r1 = firstCard.dataset.row;
    const c1 = firstCard.dataset.column;
    const r2 = secondCard.dataset.row;
    const c2 = secondCard.dataset.column;

    if (board[r1][c1] === board[r2][c2]) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        updateScore(); // increment score for matched pair
    } else {
        resetCard(firstCard);
        resetCard(secondCard);
        updateErrorCount();
    }

    firstCard = null;
    secondCard = null;
}

function updateScore() {
    score++;
    document.getElementById("score").textContent = score;

    // Optional: check if the game is complete
    if (score == 10) {
        showCongratulations();
    }
}

function showCongratulations() {
    const popup = document.getElementById("message-popup");
    popup.classList.remove("hidden");

    document.getElementById("play-again").addEventListener("click", () => {
        popup.classList.add("hidden");
        resetGame();
    });
}

/*
 * Resets all game variables and regenerates the board
 */
function resetGame() {
    // Reset game state
    board = [];
    deck = [];
    firstCard = null;
    secondCard = null;
    errors = 0;
    score = 0;

    // Reset UI counters
    document.getElementById("errors").textContent = errors;
    document.getElementById("score").textContent = score;

    // Clear the board
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";

    // Reinitialize the game
    initializeGame();
}