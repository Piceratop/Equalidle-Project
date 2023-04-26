// Draw the grid

const numSquaresPerRow = 5;
const gridContainer = document.getElementById("grid-container");
const flipDelayTime = 0.5;

function addRowSquares(component) {
  for (let i = 0; i < numSquaresPerRow; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    const blankSide = document.createElement("div");
    blankSide.classList.add("blank-side");
    const digitSide = document.createElement("div");
    digitSide.classList.add("digit-side");
    square.appendChild(blankSide);
    square.appendChild(digitSide);
    component.appendChild(square);
  }
}

addRowSquares(gridContainer);

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
];

for (
  let numpadKeyIndex = 0;
  numpadKeyIndex < numpadKeyArray.length;
  numpadKeyIndex++
) {
  const numpadKey = document.createElement("button");
  numpadKey.classList.add("numkey");
  numpadKey.classList.add("flip-in");
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
  }
}

// Set up problems

const operators = ["+", "-", "*", "/"];
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const allCharacters = [...operators, ...digits];
const allValidCharacters = [...allCharacters, "=", "−", "×", "÷"];
const keyEquivalents = [
  ["-", "−"],
  ["*", "×"],
  ["/", "÷"],
];

async function fetchEquation() {
const getEquationFile = await fetch("equation/fiveCharacterEquations.txt")
const equationFile = await getEquationFile.text()

console.log(equationFile)
}

fetchEquation();


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
for (let i = 0; i < keyEquivalents.length; i++) {
  const charToReplace = keyEquivalents[i][0];
  const replacementChar = keyEquivalents[i][1];
  hiddenEquality = hiddenEquality.split(charToReplace).join(replacementChar);
}

// Setup answer validator

let inputEquality = "";

function checkValidAnswer(str) {
  for (let i = 0; i < keyEquivalents.length; i++) {
    const charToReplace = keyEquivalents[i][1];
    const replacementChar = keyEquivalents[i][0];
    str = str.split(charToReplace).join(replacementChar);
  }
  if (!str.includes("=")) {
    return false;
  }
  const left_side = str.slice(0, str.indexOf("="));
  const right_side = str.slice(str.indexOf("=") + 1);
  try {
    return eval(left_side) == eval(right_side);
  } catch {}
  return false;
}

let finished = false;
let lockedPad = false;

function updateUserAnswer(key) {
  const inputRowSquares = Array.from(
    gridContainer.querySelectorAll(".square")
  ).slice(-numSquaresPerRow);
  function modifyInputSquare() {
    inputRowSquares.forEach((square, i) => {
      const blankSide = square.querySelector(".blank-side");
      const digitSide = square.querySelector(".digit-side");
      if (i < inputEquality.length) {
        blankSide.innerHTML = inputEquality[i];
        digitSide.innerHTML = inputEquality[i];
      } else {
        blankSide.innerHTML = "";
        digitSide.innerHTML = "";
      }
    });
  }
  switch (key) {
    case "Backspace":
    case "Delete":
    case "Del":
      if (inputEquality.length > 0) {
        inputEquality = inputEquality.slice(0, -1);
      }
      modifyInputSquare();
      break;
    case "Enter":
      if (checkValidAnswer(inputEquality) && inputEquality.length == 5) {
        lockedPad = true;
        // Handle color Logic
        const colorCode = [
          "darkred",
          "darkred",
          "darkred",
          "darkred",
          "darkred",
        ];
        const secondPassInput = [];
        const secondPassHidden = [];
        inputEquality.split("").forEach((char, i) => {
          if (char == hiddenEquality[i]) {
            colorCode[i] = "darkgreen";
          } else {
            secondPassInput.push([i, char]);
            secondPassHidden.push(hiddenEquality[i]);
          }
        });
        secondPassInput.forEach((input, i) => {
          if (secondPassHidden.includes(input[1])) {
            colorCode[input[0]] = "goldenrod";
            secondPassHidden.splice(secondPassHidden.indexOf(input[1]), 1);
          }
        });
        for (let i = 0; i < numSquaresPerRow; i++) {
          const square = inputRowSquares[i];
          const digitSide = square.querySelector(".digit-side");
          digitSide.style.backgroundColor = colorCode[i];
          setTimeout(() => {
            square.classList.add("flipped");
          }, flipDelayTime * i * 500);
        }
        if (
          colorCode.filter((color) => color == "darkgreen").length ==
          colorCode.length
        ) {
          finished = true;
          setTimeout(() => {
            numpad.querySelectorAll(".numkey").forEach((numkey) => {
              numkey.classList.remove("flip-in");
              numkey.classList.add("flip-out");
            });
          }, flipDelayTime * 1500);
          setTimeout(() => {
            numpad.innerHTML = "";
            numpad.style.gridTemplateRows = "var(--numpad-size)";
            for (let numpadKeyIndex = 0; numpadKeyIndex < 2; numpadKeyIndex++) {
              const numpadKey = document.createElement("button");
              numpadKey.classList.add("numkey");
              numpadKey.classList.add("flip-in");
              numpad.appendChild(numpadKey);
              switch (numpadKeyIndex) {
                case 0:
                  numpadKey.innerHTML = "Restart";
                  numpadKey.style.gridColumn = "1 / span 2";
                  numpadKey.classList.add("numkey-text");
                  numpadKey.addEventListener("click", function () {
                    location.reload();
                  });
                  break;
                case 1:
                  numpadKey.innerHTML = "Menu";
                  numpadKey.style.gridColumn = "3 / span 2";
                  numpadKey.classList.add("numkey-text");
                  numpadKey.addEventListener("click", function () {
                    window.location.href = "index.html";
                  });
                  break;
              }
            }
          }, flipDelayTime * 2000);
        } else {
          setTimeout(() => {
            addRowSquares(gridContainer);
            lockedPad = false;
          }, flipDelayTime * 2500);
        }
        inputEquality = "";
      }
      break;
    default:
      if (allValidCharacters.includes(key) && inputEquality.length < 5) {
        for (let i = 0; i < keyEquivalents.length; i++) {
          if (key == keyEquivalents[i][0]) {
            key = keyEquivalents[i][1];
          }
        }
        inputEquality += key;
        modifyInputSquare();
      }
      break;
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!finished && !lockedPad) {
    updateUserAnswer(key);
  }
});

document.addEventListener("click", (event) => {
  let key = event.target.innerHTML.trim();
  if (event.target.classList.contains("numkey") && !finished && !lockedPad) {
    updateUserAnswer(key);
  }
});
