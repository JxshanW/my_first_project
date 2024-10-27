const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let isOTurn = true;
let moveCount = 0;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const resetGame = () => {
  isOTurn = true;
  moveCount = 0;
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
  });
  msgContainer.classList.add("hide");
};

const checkWinner = () => {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
      displayWinner(boxes[a].innerText);
      return true;
    }
  }
  return false;
};

const displayWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}!`;
  msgContainer.classList.remove("hide");
  boxes.forEach(box => box.disabled = true);
};

const gameDraw = () => {
  msg.innerText = "It's a draw!";
  msgContainer.classList.remove("hide");
  boxes.forEach(box => box.disabled = true);
};

boxes.forEach(box => {
  box.addEventListener("click", () => {
    box.innerText = isOTurn ? "O" : "X";
    box.disabled = true;
    moveCount++;

    if (checkWinner()) return;
    if (moveCount === 9) gameDraw();

    isOTurn = !isOTurn;
  });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
