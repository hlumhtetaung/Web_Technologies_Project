const boardWidth = 360;
const boardHeight = 640;
let board, context;

const gravity = 0.18;
const jump = -5;
const pipeSpeed = -1.8;
const pipeGap = 210; 

// State
let car = { x: 60, y: 320, w: 55, h: 25, v: 0 };
let pipes = [];
let score = 0;
let highScore = localStorage.getItem("turboBest") || 0;
let gameState = "HOME";

window.onload = () => {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // Game Input and Buttons
    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") handleInput();
    });
    document.getElementById("start-btn").onclick = resetGame;
    document.getElementById("restart-btn").onclick = resetGame;

    requestAnimationFrame(update);
    setInterval(spawnPipe, 1800);
};

function handleInput() {
    if (gameState === "PLAYING") car.v = jump;
    else if (gameState !== "PLAYING") resetGame();
}

function resetGame() {
    gameState = "PLAYING";
    car.y = boardHeight / 2;
    car.v = 0;
    pipes = [];
    score = 0;
    document.getElementById("score-hud").innerText = "0";
    document.getElementById("home-screen").style.display = "none";
    document.getElementById("game-over-screen").style.display = "none";
}

function spawnPipe() {
    if (gameState !== "PLAYING") return;
    let minPipeHeight = 50;
    let range = boardHeight - pipeGap - (minPipeHeight * 2);
    let top = Math.floor(Math.random() * range) + minPipeHeight;
    pipes.push({ x: boardWidth, top: top, w: 70, passed: false });
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardWidth, boardHeight);

    if (gameState === "PLAYING") {
        car.v += gravity;
        car.y += car.v;

        // Collision
        if (car.y > boardHeight || car.y < 0) endGame();

        pipes.forEach(p => {
            p.x += pipeSpeed;
            
            if (car.x + 20 > p.x && car.x - 20 < p.x + p.w) {
                if (car.y - 10 < p.top || car.y + 10 > p.top + pipeGap) {
                    endGame();
                }
            }

            // Score
            if (!p.passed && car.x > p.x + p.w) {
                score++;
                p.passed = true;
                document.getElementById("score-hud").innerText = score;
            }
        });
        pipes = pipes.filter(p => p.x > -100);
    }

    draw();
}

function endGame() {
    gameState = "GAMEOVER";
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("turboBest", highScore);
    }
    document.getElementById("final-score").innerText = score;
    document.getElementById("best-score").innerText = highScore;
    document.getElementById("game-over-screen").style.display = "flex";
}

// Drawing Function for pipes and car
function draw() {
    // Pipes
    pipes.forEach(p => {
        context.fillStyle = "#2ed573";
        context.strokeStyle = "#fff";
        context.lineWidth = 3;
        context.fillRect(p.x, 0, p.w, p.top);
        context.strokeRect(p.x, -5, p.w, p.top + 5);
        context.fillRect(p.x, p.top + pipeGap, p.w, boardHeight);
        context.strokeRect(p.x, p.top + pipeGap, p.w, boardHeight);
    });

    // Car
    context.save();
    context.translate(car.x, car.y);
    context.rotate(car.v * 0.04); // Rotate based on fall speed

    // Body
    context.fillStyle = "#ff4757";
    context.beginPath();
    context.roundRect(-car.w/2, -car.h/2, car.w, car.h, 5);
    context.fill();
    context.stroke();

    // Windows
    context.fillStyle = "#7beded";
    context.fillRect(0, -car.h/2 + 2, 15, 8);

    // Wheels
    context.fillStyle = "#2f3542";
    context.beginPath();
    context.arc(-15, 12, 6, 0, Math.PI*2);
    context.arc(15, 12, 6, 0, Math.PI*2);
    context.fill();

    context.restore();
}