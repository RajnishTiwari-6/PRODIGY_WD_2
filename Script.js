// ======== Variables ========
const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const popup = document.getElementById("popup");
const popupMsg = document.getElementById("popup-message");
const modeEl = document.getElementById("mode");
const diffEl = document.getElementById("difficulty");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// ======== Create Board ========
function createBoard() {
  boardEl.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    boardEl.appendChild(cell);
  }
}
createBoard();

// ======== Handle Click ========
function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || board[index]) return;

  makeMove(index, currentPlayer);

  if (checkWinner(board) || checkDraw(board)) {
    endGame();
    return;
  }

  // Switch turn
  if (modeEl.value === "pvp") {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
  } else if (modeEl.value === "pvai" && currentPlayer === "X") {
    // Player vs AI
    currentPlayer = "O";
    updateStatus();
    setTimeout(aiMove, 300); // delay for realism
  }
}

// ======== Make Move ========
function makeMove(index, player) {
  board[index] = player;
  const cell = boardEl.querySelector(`[data-index='${index}']`);
  cell.textContent = player;
}

// ======== AI Move ========
function aiMove() {
  if (!gameActive) return;

  let move;
  if (diffEl.value === "easy") move = randomMove(board);
  else if (diffEl.value === "medium") move = winOrBlockMove(board) ?? randomMove(board);
  else move = minimaxRoot(board, "O").index;

  if (move != null) makeMove(move, "O");

  if (checkWinner(board) || checkDraw(board)) {
    endGame();
    return;
  }

  currentPlayer = "X";
  updateStatus();
}

// ======== Winner Check ========
function checkWinner(b) {
  for (const [a, b1, c] of WIN_LINES) {
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
  }
  return null;
}

function checkDraw(b) {
  return b.every(cell => cell);
}

// ======== End Game ========
function endGame() {
  gameActive = false;
  const winner = checkWinner(board);
  if (winner) {
    popupMsg.textContent = `Player ${winner} Wins!`;
  } else {
    popupMsg.textContent = "It's a Draw!";
  }
  popup.style.display = "block";
}

// ======== Reset Game ========
resetBtn.addEventListener("click", resetGame);
function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameActive = true;
  createBoard();
  updateStatus();
  popup.style.display = "none";
}

// ======== Popup Close ========
function closePopup() {
  popup.style.display = "none";
}

// ======== Update Status ========
function updateStatus() {
  statusEl.textContent = `Player ${currentPlayer}'s Turn`;
}

// ======== AI Logic ========
function emptyIndices(b) {
  return b.map((v, i) => v ? null : i).filter(i => i !== null);
}

function randomMove(b) {
  const empties = emptyIndices(b);
  return empties.length ? empties[Math.floor(Math.random() * empties.length)] : null;
}

function winOrBlockMove(b) {
  // Win
  for (const i of emptyIndices(b)) {
    const copy = b.slice();
    copy[i] = "O";
    if (checkWinner(copy) === "O") return i;
  }
  // Block
  for (const i of emptyIndices(b)) {
    const copy = b.slice();
    copy[i] = "X";
    if (checkWinner(copy) === "X") return i;
  }
  // Center or corner
  if (b[4] == null) return 4;
  const corners = [0, 2, 6, 8].filter(i => b[i] == null);
  if (corners.length) return corners[0];
  return null;
}

// ======== Minimax ========
function minimaxRoot(b, player) {
  let best = { score: -Infinity, index: null };
  for (const i of emptyIndices(b)) {
    b[i] = player;
    const score = minimax(b, false, player, "X", 0, -Infinity, Infinity);
    b[i] = null;
    if (score > best.score) best = { score, index: i };
  }
  return best;
}

function minimax(b, isMax, me, opp, depth, alpha, beta) {
  const winner = checkWinner(b);
  if (winner === me) return 10 - depth;
  if (winner === opp) return depth - 10;
  if (checkDraw(b)) return 0;

  if (isMax) {
    let best = -Infinity;
    for (const i of emptyIndices(b)) {
      b[i] = me;
      best = Math.max(best, minimax(b, false, me, opp, depth + 1, alpha, beta));
      b[i] = null;
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const i of emptyIndices(b)) {
      b[i] = opp;
      best = Math.min(best, minimax(b, true, me, opp, depth + 1, alpha, beta));
      b[i] = null;
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}
