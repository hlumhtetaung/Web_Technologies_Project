let errors = 0;

const cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
];

let cardSet = [];
let board = [];

const rows = 4;
const columns = 5;

let card1Selected = null;
let card2Selected = null;

// Base image directory
const IMAGE_PATH = "../images/";

window.addEventListener("load", initializeGame);

/*
 * Initializes the game by shuffling cards and generating the board.
 */
function initializeGame() {
    shuffleCards();
    createBoard();
}

/*
 * Creates a duplicated and shuffled card set using the Fisher-Yates algorithm.
 */
function shuffleCards() {
    cardSet = [...cardList, ...cardList];

    for (let i = cardSet.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        const temp = cardSet[i];
        cardSet[i] = cardSet[randomIndex];
        cardSet[randomIndex] = temp;
    }
}

/*
 * Generates the game board dynamically.
 */
function createBoard() {

    const gameBoard = document.getElementById("game-board");

    for (let r = 0; r < rows; r++) {

        const row = [];

        for (let c = 0; c < columns; c++) {

            const cardName = cardSet.pop();
            row.push(cardName);

            const cardContainer = document.createElement("div");
            cardContainer.classList.add("card-container");
            cardContainer.dataset.row = r;
            cardContainer.dataset.column = c;

            cardContainer.appendChild(createPictureElement("back"));
            cardContainer.addEventListener("click", handleCardClick);

            gameBoard.appendChild(cardContainer);
        }

        board.push(row);
    }
}

/*
 * Handles card selection logic.
 */
function handleCardClick() {

    if (this.classList.contains("matched")) return;
    if (card2Selected) return;

    if (!card1Selected) {
        card1Selected = this;
        revealCard(this);
    } 
    else if (this !== card1Selected) {
        card2Selected = this;
        revealCard(this);
        setTimeout(checkMatch, 1000);
    }
}

/*
 * Reveals the card face.
 */
function revealCard(cardElement) {
    const r = cardElement.dataset.row;
    const c = cardElement.dataset.column;

    cardElement.innerHTML = "";
    cardElement.appendChild(createPictureElement(board[r][c]));
}

/*
 * Checks whether the two selected cards match.
 */
function checkMatch() {

    const r1 = card1Selected.dataset.row;
    const c1 = card1Selected.dataset.column;

    const r2 = card2Selected.dataset.row;
    const c2 = card2Selected.dataset.column;

    if (board[r1][c1] === board[r2][c2]) {

        card1Selected.classList.add("matched");
        card2Selected.classList.add("matched");

    } else {

        card1Selected.innerHTML = "";
        card2Selected.innerHTML = "";

        card1Selected.appendChild(createPictureElement("back"));
        card2Selected.appendChild(createPictureElement("back"));

        errors++;
        document.getElementById("errors").textContent = errors;
    }

    card1Selected = null;
    card2Selected = null;
}

/*
 * Creates a <picture> element that supports webp, jpg, and png formats.
 * The browser automatically selects the first supported format.
 */
function createPictureElement(imageName) {

    const picture = document.createElement("picture");

    const webpSource = document.createElement("source");
    webpSource.srcset = IMAGE_PATH + imageName + ".webp";
    webpSource.type = "image/webp";

    const jpgSource = document.createElement("source");
    jpgSource.srcset = IMAGE_PATH + imageName + ".jpg";
    jpgSource.type = "image/jpeg";

    const img = document.createElement("img");
    img.src = IMAGE_PATH + imageName + ".png";
    img.alt = imageName;

    picture.appendChild(webpSource);
    picture.appendChild(jpgSource);
    picture.appendChild(img);

    return picture;
}