const numSquares = 30;
const numInputRowSquares = 5;
const gridContainer = document.getElementById("grid-container");
const inputRowContainer = document.getElementById("input-row");

// Generate the squares for the grid
for (let i = 0; i < numSquares; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  gridContainer.appendChild(square);
}

// Generate the squares for the input row
for (let i = 0; i < numInputRowSquares; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  inputRowContainer.appendChild(square);
}

const inputArray = [];

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[\d+\-*/=]/.test(key) && inputArray.length < 5) {
    inputArray.push(key);
    console.log(inputArray);
  } else if (
    (key === "Backspace" || key === "Delete") &&
    inputArray.length > 0
  ) {
    inputArray.pop();
    console.log(inputArray);
  }
});
