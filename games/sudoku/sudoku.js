var numSelected = null;
var errors = 0;
var tilesFilled = 0;
var board;

var solution = [
    "387491625", "241568379", "569327418",
    "758619234", "123784596", "496253187",
    "934176852", "675832941", "812945763"
];

window.onload = function () {
    startNewGame();
};

function setGame() {

    document.getElementById("board").innerHTML = "";
    document.getElementById("digits").innerHTML = "";
    document.getElementById("errors").innerText = "Errors: 0";
    document.getElementById("win-message").style.display = "none";

    tilesFilled = 0;
    errors = 0;
    numSelected = null;

    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {

            let tile = document.createElement("div");
            tile.id = r + "-" + c;
            tile.classList.add("tile");

            if (board[r][c] !== "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
                tilesFilled++;
            }

            if (r == 2 || r == 5) tile.classList.add("horizontal-line");
            if (c == 2 || c == 5) tile.classList.add("vertical-line");

            tile.addEventListener("click", selectTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {

    if (!numSelected) return;
    if (this.innerText !== "") return;

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (solution[r][c] == numSelected.id) {
        this.innerText = numSelected.id;
        tilesFilled++;
        checkWin();
    } else {
        errors++;
        document.getElementById("errors").innerText = "Errors: " + errors;
    }
}

function checkWin() {
    if (tilesFilled === 81) {
        document.getElementById("win-message").style.display = "block";
    }
}

function generateBoard(numbersToKeep) {

    let newBoard = [];

    for (let r = 0; r < 9; r++) {
        newBoard.push(solution[r].split(""));
    }

    let cellsToRemove = 81 - numbersToKeep;

    while (cellsToRemove > 0) {
        let r = Math.floor(Math.random() * 9);
        let c = Math.floor(Math.random() * 9);

        if (newBoard[r][c] !== "-") {
            newBoard[r][c] = "-";
            cellsToRemove--;
        }
    }

    return newBoard.map(row => row.join(""));
}

function startNewGame() {

    let difficultySelect = document.getElementById("difficulty");

    let numbersToKeep = difficultySelect
        ? parseInt(difficultySelect.value)
        : 35;

    board = generateBoard(numbersToKeep);
    setGame();
}