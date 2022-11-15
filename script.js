const startButton = document.querySelector("#start");
const timeList = document.querySelector("#time-list");
const diffList = document.querySelector("#diff-list");
const boardSizeList = document.querySelector("#board_size-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const screens = document.querySelectorAll(".screen");
let difficulty = "";
let boardSize = "";
let time = 10;
let score = 0;
let minSize = 15;
let maxSize = 60;

const getRandomColour = () => {
  let colourArray = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "A",
    "B",
    "C",
    "D",
    "F",
  ];
  let hexColour = "";
  let randomNumber = 0;

  for (let i = 0; i < 6; i++) {
    randomNumber = Math.floor(Math.random() * colourArray.length);
    hexColour += colourArray[randomNumber];
  }

  return hexColour;
};

const setTime = (value) => {
  timeEl.innerHTML = `00:${value}`;
};

const finishGame = () => {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
};

const descreaseTime = () => {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    current < 10 ? (current = `0${current}`) : current;
    setTime(current);
  }
};

const getRandomNum = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const createRandomCircle = () => {
  const circle = document.createElement("div");
  const size = getRandomNum(minSize, maxSize);
  console.log(size);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNum(0, width - size);
  const y = getRandomNum(0, height - size);
  const colour = getRandomColour();

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = `#${colour}`;

  board.append(circle);
};

const startGame = () => {
  setInterval(descreaseTime, 1000);
  setTime(time);
  createRandomCircle();
};

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

timeList.addEventListener("click", (event) => {
  time = parseInt(event.target.getAttribute("value"));
});

diffList.addEventListener("click", (event) => {
  difficulty = event.target.getAttribute("value");
  console.log(difficulty);
  switch (difficulty) {
    case "easy":
      minSize = 25;
      maxSize = 75;
      break;
    case "medium":
      minSize = 15;
      maxSize = 60;
      break;
    case "hard":
      minSize = 10;
      maxSize = 40;
      break;
    case "very_hard":
      minSize = 5;
      maxSize = 20;
      break;
  }
});

boardSizeList.addEventListener("click", (event) => {
  boardSize = event.target.getAttribute("value");
  console.log(boardSize);
  switch (boardSize) {
    case "small":
      board.style.width = "250px";
      board.style.height = "250px";
      break;
    case "big":
      board.style.width = "500px";
      board.style.height = "500px";
      break;
    case "huge":
      board.style.width = "800px";
      board.style.height = "800px";
      break;
  }
});

startButton.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
  startGame();
});

// Func for autoclicking)
function ezGame() {
  const clicker = () => {
    if (time > 0) {
      const circle = document.querySelector(".circle");

      circle.click();
    }
  };
  setInterval(clicker, 100);
}
