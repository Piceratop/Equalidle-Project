// Draw the grid

const numSquares = 30;
const numInputRowSquares = 5;
const gridContainer = document.getElementById("grid-container");
const inputRowContainer = document.getElementById("input-row");

for (let i = 0; i < numSquares; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  gridContainer.appendChild(square);
}

for (let i = 0; i < numInputRowSquares; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  inputRowContainer.appendChild(square);
}

// Draw the numpad

const numpad = document.getElementById("numpad");
numpadKeyArray = [
  "Del",
  "&divide;",
  "&times;",
  "&minus;",
  "7",
  "8",
  "9",
  "+",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
  "Enter",
  "0",
  "=",
  "Restart",
  "Menu",
];

for (
  let numpadKeyIndex = 0;
  numpadKeyIndex < numpadKeyArray.length;
  numpadKeyIndex++
) {
  const numpadKey = document.createElement("button");
  numpadKey.classList.add("numkey");
  numpadKey.innerHTML = numpadKeyArray[numpadKeyIndex];
  numpad.appendChild(numpadKey);
  switch (numpadKeyIndex) {
    case 0:
      numpadKey.classList.add("numkey-text");
      break;
    case 7:
      numpadKey.style.gridRow = "2 / span 2";
      numpadKey.style.gridColumn = "4";
      break;
    case 14:
      numpadKey.style.gridRow = "4 / span 2";
      numpadKey.style.gridColumn = "4";
      numpadKey.classList.add("numkey-text");
      break;
    case 15:
      numpadKey.style.gridColumn = "1 / span 2";
      break;
    case 17:
      numpadKey.style.gridColumn = "1 / span 2";
      numpadKey.classList.add("numkey-text");
      numpadKey.addEventListener("click", () => {
        window.location.reload();
      });
      break;
    case 18:
      numpadKey.style.gridColumn = "3 / span 2";
      numpadKey.classList.add("numkey-text");
      numpadKey.addEventListener("click", () => {
        window.location.reload();
      });
      break;
  }
}

// Set up problems

let inputEquality = "";

const operators = ["+", "-", "*", "/"];
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const allCharacters = [...operators, ...digits];
const allValidCharacters = [...allCharacters, "=", "−", "×", "÷"];
const keyEquivalent = [
  ["-", "−"],
  ["*", "×"],
  ["/", "÷"],
];
let counters = [0, 0, 0, 0];
const allValidEqualities = [];

while (counters[0] < digits.length) {
  let left_side = digits[counters[0]];
  let right_side =
    digits[counters[1]] + operators[counters[2]] + digits[counters[3]];
  let digitCounterSet = new Set([0, 1, 3]);
  try {
    if (eval(left_side) == eval(right_side)) {
      allValidEqualities.push(left_side + "=" + right_side);
      allValidEqualities.push(right_side + "=" + left_side);
    }
  } catch {}
  for (let i = counters.length - 1; i >= 0; i--) {
    counters[i]++;
    if (
      (digitCounterSet.has(i) && counters[i] < digits.length) ||
      (i == 2 && counters[i] < operators.length)
    ) {
      break;
    }
    if (i) {
      counters[i] = 0;
    }
  }
}

let hiddenEquality =
  allValidEqualities[Math.floor(Math.random() * allValidEqualities.length)];
for (let i = 0; i < keyEquivalent.length; i++) {
  const charToReplace = keyEquivalent[i][0];
  const replacementChar = keyEquivalent[i][1];
  hiddenEquality = hiddenEquality.split(charToReplace).join(replacementChar);
}

// Setup answer validator

function checkValidAnswer(str) {
  for (let i = 0; i < keyEquivalent.length; i++) {
    const charToReplace = keyEquivalent[i][1];
    const replacementChar = keyEquivalent[i][0];
    str = str.split(charToReplace).join(replacementChar);
  }
  if (!str.includes("=")) {
    return false;
  }
  const left_side = str.slice(0, str.indexOf("="));
  const right_side = str.slice(str.indexOf("=") + 1);
  try {
    if (eval(left_side) == eval(right_side)) {
      return true;
    }
  } catch {}
  return false;
}

let finished = false;
const grid = [];
const inputRowSquares = inputRowContainer.querySelectorAll(".square");
const gridSquares = gridContainer.querySelectorAll(".square");

function updateUserAnswer(key) {
  if (allValidCharacters.includes(key) && inputEquality.length < 5) {
    for (let i = 0; i < keyEquivalent.length; i++) {
      if (key == keyEquivalent[i][0]) {
        key = keyEquivalent[i][1];
        break;
      }
    }
    inputEquality += key;
  } else if (
    (key === "Backspace" || key === "Delete" || key === "Del") &&
    inputEquality.length > 0
  ) {
    inputEquality = inputEquality.slice(0, -1);
  } else if (key === "Enter" && finished == false) {
    if (checkValidAnswer(inputEquality) && inputEquality.length == 5) {
      const colorCode = ["darkred", "darkred", "darkred", "darkred", "darkred"];
      let secondPassInput = [];
      let secondPassHidden = [];
      for (let i = 0; i < inputEquality.length; i++) {
        if (inputEquality[i] == hiddenEquality[i]) {
          colorCode[i] = "darkgreen";
        } else {
          secondPassInput.push([i, inputEquality[i]]);
          secondPassHidden.push(hiddenEquality[i]);
        }
      }
      // Check for partially correct answers
      while (secondPassInput.length > 0) {
        if (secondPassHidden.includes(secondPassInput[0][1])) {
          colorCode[secondPassInput[0][0]] = "gold";
          let firstOccurrence = secondPassHidden.indexOf(secondPassInput[0][1]);
          secondPassHidden = secondPassHidden.filter(
            (element, index) => index !== firstOccurrence
          );
        }
        secondPassInput = secondPassInput.filter(
          (element, index) => index !== 0
        );
      }
      // Add the user's answer and color codes to the input grid
      for (let i = 0; i < inputEquality.length; i++) {
        grid.push([inputEquality[i], colorCode[i]]);
      }
      // Check if the user has correctly guessed all digits or if the grid is full
      let cg = 0;
      for (let i = 0; i < colorCode.length; i++) {
        if (colorCode[i] == "darkgreen") {
          cg++;
        }
      }
      if (cg == colorCode.length || grid.length >= numSquares) {
        inputRowContainer.innerHTML = "";
        finished = true;
      }
      inputEquality = "";
    }
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  updateUserAnswer(key);
  for (let i = 0; i < grid.length; i++) {
    gridSquares[i].innerHTML = grid[i][0];
    gridSquares[i].style.backgroundColor = grid[i][1];
  }
  if (!finished) {
    for (let i = 0; i < inputEquality.length; i++) {
      inputRowSquares[i].innerHTML = inputEquality[i];
    }
    for (let i = inputEquality.length; i < 5; i++) {
      inputRowSquares[i].innerHTML = "";
    }
  }
});

document.addEventListener("click", (event) => {
  let key = event.target.innerHTML.trim();
  if (event.target.classList.contains("num-key")) {
    updateUserAnswer(key);
    for (let i = 0; i < grid.length; i++) {
      gridSquares[i].innerHTML = grid[i][0];
      gridSquares[i].style.backgroundColor = grid[i][1];
    }
    if (!finished) {
      for (let i = 0; i < inputEquality.length; i++) {
        inputRowSquares[i].innerHTML = inputEquality[i];
      }
      for (let i = inputEquality.length; i < 5; i++) {
        inputRowSquares[i].innerHTML = "";
      }
    }
  }
});
