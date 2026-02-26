const boardElement = document.getElementById('game-board');
const difficultySelect = document.getElementById('difficulty');
const resetBtn = document.getElementById('reset-btn');
const statusText = document.getElementById('status');
const pScoreElement = document.getElementById('player-score');
const aiScoreElement = document.getElementById('ai-score');

let board = Array(9).fill(null);
let pScore = 0;
let aiScore = 0;
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]           // Diagonals
];

function initGame() {
    board = Array(9).fill(null);
    gameActive = true;
    statusText.innerText = "Your Turn!";
    renderBoard();
}

function renderBoard() {
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(3, 1fr)`;

    board.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        if (cell) {
            cellDiv.classList.add('taken', cell === 'X' ? 'x-move' : 'o-move');
            cellDiv.innerText = cell;
        }
        cellDiv.addEventListener('click', () => handlePlayerMove(index));
        boardElement.appendChild(cellDiv);
    });
}

function handlePlayerMove(index) {
    if (!gameActive || board[index]) return;

    board[index] = 'X';
    renderBoard();

    if (checkWin(board, 'X')) {
        endGame("You Win!", true);
    } else if (board.every(cell => cell !== null)) {
        endGame("It's a Tie!", null);
    } else {
        gameActive = false;
        statusText.innerText = "AI is thinking...";
        setTimeout(aiMove, 400);
    }
}

function aiMove() {
    const difficulty = difficultySelect.value;
    let move;

    if (difficulty === 'easy') {
        move = getRandomMove();
    } else if (difficulty === 'medium') {
        // Try to win, then try to block, else random
        move = findWinningMove('O') || findWinningMove('X') || getRandomMove();
    } else {
        // Hard mode: Minimax
        move = getBestMove();
    }

    board[move] = 'O';
    renderBoard();

    if (checkWin(board, 'O')) {
        endGame("AI Wins!", false);
    } else if (board.every(cell => cell !== null)) {
        endGame("It's a Tie!", null);
    } else {
        gameActive = true;
        statusText.innerText = "Your Turn!";
    }
}

// --- AI LOGIC BRAINS ---

function getRandomMove() {
    const available = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
    return available[Math.floor(Math.random() * available.length)];
}

function findWinningMove(symbol) {
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            board[i] = symbol;
            if (checkWin(board, symbol)) {
                board[i] = null;
                return i;
            }
            board[i] = null;
        }
    }
    return null;
}

// Minimax Algorithm for "Unbeatable"
function getBestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing) {
    if (checkWin(board, 'O')) return 10 - depth;
    if (checkWin(board, 'X')) return depth - 10;
    if (board.every(cell => cell !== null)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                board[i] = 'O';
                bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
                board[i] = null;
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                board[i] = 'X';
                bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
                board[i] = null;
            }
        }
        return bestScore;
    }
}

function checkWin(currentBoard, symbol) {
    return winPatterns.some(pattern =>
        pattern.every(index => currentBoard[index] === symbol)
    );
}

function endGame(msg, playerWon) {
    statusText.innerText = msg;
    gameActive = false;
    if (playerWon === true) pScore++;
    if (playerWon === false) aiScore++;
    pScoreElement.innerText = pScore;
    aiScoreElement.innerText = aiScore;
}

difficultySelect.addEventListener('change', initGame);
resetBtn.addEventListener('click', initGame);
initGame();