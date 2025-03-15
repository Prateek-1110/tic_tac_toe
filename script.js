/*
Jai Shri Krishna 
This is tic tac toe by Prateek Agrahari 
Hope you enjoy it 
*/
const board = document.getElementById("board");
const statusText = document.getElementById("status");
let boardState = ["", "", "", "", "", "", "", "", ""];
let isPlayerTurn = true;
let difficulty = "Easy"; // Default AI difficulty
let moveHistory = [];

function createBoard() {
    board.innerHTML = "";
    boardState.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        if (cell !== "") {
            div.classList.add("taken");
            div.textContent = cell;
        }
        div.addEventListener("click", () => makeMove(index));
        board.appendChild(div);
    });
}

function makeMove(index) {
    if (!isPlayerTurn || boardState[index] !== "") return;
    boardState[index] = "X";
    moveHistory.push(index);
    isPlayerTurn = false;
    createBoard();

    if (checkWinner("X")) return endGame("You Win! 🎉");
    if (isDraw()) return handleDraw();

    setTimeout(computerMove, 500); // Small delay for AI move
}

function computerMove() {
    let move;
    if (difficulty === "Easy") {
        move = getRandomMove();
    } else {
        move = getBestMove();
    }
    boardState[move] = "O";
    moveHistory.push(move);
    isPlayerTurn = true;
    createBoard();

    if (checkWinner("O")) return endGame("Computer Wins! 😢");
    if (isDraw()) return handleDraw();
}

function getRandomMove() {
    let availableMoves = boardState.map((v, i) => (v === "" ? i : null)).filter(v => v !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function getBestMove() {
    let bestScore = -Infinity;
    let bestMove;
    boardState.forEach((cell, i) => {
        if (cell === "") {
            boardState[i] = "O";
            let score = minimax(boardState, 0, false);
            boardState[i] = "";
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    });
    return bestMove;
}

const scores = { X: -1, O: 1, tie: 0 };

function minimax(boardState, depth, isMaximizing) {
    let winner = checkWinner("O") ? "O" : checkWinner("X") ? "X" : isDraw() ? "tie" : null;
    if (winner !== null) return scores[winner];

    if (isMaximizing) {
        let bestScore = -Infinity;
        boardState.forEach((cell, i) => {
            if (cell === "") {
                boardState[i] = "O";
                let score = minimax(boardState, depth + 1, false);
                boardState[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        });
        return bestScore;
    } else {
        let bestScore = Infinity;
        boardState.forEach((cell, i) => {
            if (cell === "") {
                boardState[i] = "X";
                let score = minimax(boardState, depth + 1, true);
                boardState[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        });
        return bestScore;
    }
}

function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => pattern.every(i => boardState[i] === player));
}

function isDraw() {
    return boardState.every(cell => cell !== "");
}

function handleDraw() {
    if (moveHistory.length < 2) {
        return endGame("Draw! No more moves to remove.");
    }
    
    let firstMove = moveHistory.shift();
    let secondMove = moveHistory.shift();

    boardState[firstMove] = "";
    boardState[secondMove] = "";

    isPlayerTurn = true;
    createBoard();
}


function endGame(message) {
    alert(message);
    resetGame();
}

function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    moveHistory = [];
    isPlayerTurn = true;
    createBoard();
}

function toggleDifficulty() {
    difficulty = difficulty === "Easy" ? "Hard" : "Easy";
    statusText.textContent = "Current Difficulty: " + difficulty;
}

createBoard();
