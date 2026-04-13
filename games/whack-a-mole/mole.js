let score = 0;
let timeLeft = 30;
let gameOver = true;
let currKnightTile, currShieldTile;
let gameTimer, knightInterval, shieldInterval;

window.onload = function () {
    createBoard();
    setupModal();
    document.getElementById("start-btn").addEventListener("click", startGame);
}

function createBoard() {
    const board = document.getElementById("board");
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", handleWhack);
        board.appendChild(tile);
    }
}

function startGame() {
    // Reset variables
    score = 0;
    timeLeft = 30;
    gameOver = false;

    // Update UI
    document.getElementById("score").innerText = score;
    document.getElementById("timer").innerText = timeLeft;
    document.getElementById("overlay").style.display = "none";

    // Launch game loops
    knightInterval = setInterval(spawnKnight, 800);
    shieldInterval = setInterval(spawnShield, 1200);

    gameTimer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if (timeLeft <= 0) endGame("TIME IS UP!");
    }, 1000);
}

function spawnKnight() {
    if (gameOver) return;
    if (currKnightTile) currKnightTile.innerHTML = "";

    // Create knight element
    let knight = document.createElement("img");
    knight.src = "../../images/knight.png";
    knight.className = "knight";

    let num = Math.floor(Math.random() * 9).toString();
    if (currShieldTile && currShieldTile.id == num) return;

    currKnightTile = document.getElementById(num);
    currKnightTile.appendChild(knight);
}

function spawnShield() {
    if (gameOver) return;
    if (currShieldTile) currShieldTile.innerHTML = "";

    // Create shield element
    let shield = document.createElement("img");
    shield.src = "../../images/shield.png";
    shield.className = "shield";

    let num = Math.floor(Math.random() * 9).toString();
    if (currKnightTile && currKnightTile.id == num) return;

    currShieldTile = document.getElementById(num);
    currShieldTile.appendChild(shield);
}

function handleWhack() {
    if (gameOver) return;

    if (this == currKnightTile) {
        score += 10;
        document.getElementById("score").innerText = score;
        currKnightTile.innerHTML = "";
    } else if (this == currShieldTile) {
        endGame("YOU HIT THE SHIELD!");
    }
}

function endGame(msg) {
    gameOver = true;
    clearInterval(gameTimer);
    clearInterval(knightInterval);
    clearInterval(shieldInterval);

    document.getElementById("status-text").innerText = `${msg} Score: ${score}`;
    document.getElementById("start-btn").innerText = "RETRY QUEST";
    document.getElementById("overlay").style.display = "flex";
}

function setupModal() {
    const modal = document.getElementById("help-modal");
    document.getElementById("help-btn").onclick = () => modal.style.display = "block";
    document.querySelector(".close-btn").onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }
}

// Play hit sound on whack
const hitSound = document.getElementById("hit-sound");
function handleWhack() {
    if (gameOver) return;

    if (this == currKnightTile) {
        hitSound.currentTime = 0; 
        hitSound.play();

        score += 10;
        document.getElementById("score").innerText = score;
        currKnightTile.innerHTML = "";
        currKnightTile = null; // Good practice to clear the reference
    } else if (this == currShieldTile) {
        endGame("YOU HIT THE SHIELD!");
    }
}