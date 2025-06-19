// Draw the grid

const root = document.documentElement;
const gridContainer = document.getElementById("grid-container");
const flipDelayTime = 0.75;
root.style.setProperty("--flip-delay", `${flipDelayTime}s`);
const difficulty = localStorage.getItem("difficulty") ?? 5;
let lockedPad = true;
let finished = false;

function setUpInputSquareSize(square) {
  root.style.setProperty(
    "--input-square-size",
    `calc((var(--grid-container-width) - ${
      square - 1
    } * var(--grid-gap)) / ${square})`
  );
  root.style.setProperty("--digit-font", `${2.5 - square * 0.25}rem`);
  gridContainer.style.gridTemplateColumns = `repeat(${square}, var(--input-square-size))`;
  return square;
}
const numSquaresPerRow = setUpInputSquareSize(difficulty);

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

const numpad = document.getElementById("numpad");
const numkeys = numpad.querySelectorAll(".numkey");

function resizeNumkey() {
  if (!finished) {
    numpad.style.gridTemplateRows = `repeat(5, ${numkeys[0].offsetWidth}px)`;
  }
}
resizeNumkey();
window.addEventListener("resize", resizeNumkey);

async function fetchEquation() {
  const getEquationFile = await fetch(
    `scripts/equation/${difficulty}Equations.txt`
  );
  const equationFile = await getEquationFile.text();
  lockedPad = false;
  return equationFile.split("\n");
}

// All valid characters

const operators = ["+", "-", "*", "/"];
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const allValidCharacters = [...operators, ...digits, "=", "−", "×", "÷"];
const keyEquivalents = [
  ["-", "−"],
  ["*", "×"],
  ["/", "÷"],
];

async function main() {
  // Set up problems

  const allValidEqualities = await fetchEquation();
  let hiddenEquality =
    allValidEqualities[Math.floor(Math.random() * allValidEqualities.length)];
  for (let i = 0; i < keyEquivalents.length; i++) {
    hiddenEquality = hiddenEquality
      .split(keyEquivalents[i][0])
      .join(keyEquivalents[i][1]);
  }

  console.log(hiddenEquality);

  // Setup answer validator

  let inputEquality = "";

  function checkValidAnswer(inputEquation) {
    for (let i = 0; i < keyEquivalents.length; i++) {
      inputEquation = inputEquation
        .split(keyEquivalents[i][1])
        .join(keyEquivalents[i][0]);
    }
    if (!inputEquation.includes("=")) {
      return false;
    }
    const expressions = inputEquation.split("=").map((expr) => eval(expr));
    for (let i = 0; i < expressions.length - 1; i++) {
      if (expressions[i] !== expressions[i + 1]) {
        return false;
      }
    }
    return true;
  }

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
        if (
          checkValidAnswer(inputEquality) &&
          inputEquality.length == numSquaresPerRow
        ) {
          lockedPad = true;
          // Handle color Logic
          const colorCode = [];
          for (let i = 0; i < numSquaresPerRow; i++) {
            colorCode.push("darkred");
          }
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
              colorCode[input[0]] = "darkgoldenrod";
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
              numkeys.forEach((numkey) => {
                numkey.classList.remove("flip-in");
                numkey.classList.add("flip-out");
              });
            }, flipDelayTime * 500 * (numSquaresPerRow - 1));
            setTimeout(() => {
              numpad.innerHTML = "";
              numpad.style.gridTemplateRows = "repeat(2, 1fr)";
              for (
                let numpadKeyIndex = 0;
                numpadKeyIndex < 3;
                numpadKeyIndex++
              ) {
                const numpadKey = document.createElement("button");
                numpadKey.classList.add("numkey");
                numpadKey.classList.add("numkey-text");
                numpadKey.classList.add("flip-in");
                numpadKey.style.padding = "0.2rem 0";
                numpad.appendChild(numpadKey);
                switch (numpadKeyIndex) {
                  case 0:
                    numpadKey.innerHTML = `<div>Congratulations!</div><div>You solved in <strong>${
                      gridContainer.childElementCount / numSquaresPerRow
                    }</strong> turns.</div>`;
                    numpadKey.style.gridColumn = "1 / span 4";
                    numpadKey.style.width = "100%";
                    break;
                  case 1:
                    numpadKey.innerHTML = "Restart";
                    numpadKey.style.gridColumn = "1 / span 2";
                    numpadKey.style.width = "100%";
                    numpadKey.addEventListener("click", function () {
                      location.reload();
                    });
                    break;
                  case 2:
                    numpadKey.innerHTML = "Menu";
                    numpadKey.style.gridColumn = "3 / span 2";
                    numpadKey.style.width = "100%";
                    numpadKey.addEventListener("click", function () {
                      window.location.href = "index.html";
                    });
                    break;
                }
              }
            }, flipDelayTime * 500 * numSquaresPerRow);
          } else {
            setTimeout(() => {
              addRowSquares(gridContainer);
              lockedPad = false;
            }, flipDelayTime * 500 * numSquaresPerRow);
          }
          inputEquality = "";
        }
        break;
      default:
        if (
          allValidCharacters.includes(key) &&
          inputEquality.length < numSquaresPerRow
        ) {
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
}

main();
