import { useContext, useRef, useState, useEffect } from "react";
import { equalidownContext } from "../contexts/equalidown";

const Numpad = () => {
  const [equalidownState, dispatch] = useContext(equalidownContext);
  const modelButtonRef = useRef(null);
  const [buttonWidth, setButtonWidth] = useState("10vw");

  useEffect(() => {
    const updateButtonWidth = () => {
      if (modelButtonRef.current) {
        setButtonWidth(modelButtonRef.current.offsetWidth);
      }
    };

    updateButtonWidth();
    window.addEventListener("resize", updateButtonWidth);

    return () => {
      window.removeEventListener("resize", updateButtonWidth);
    };
  }, [modelButtonRef, equalidownState.numpadNumber]);

  const buttonLabels = [
    "÷",
    "×",
    "−",
    "+",
    ...equalidownState.numpadNumber.slice(0, 3),
    "Enter",
    ...equalidownState.numpadNumber.slice(3, 6),
    "0",
    "(",
    ")",
    "Backspace",
    // "♼",
  ];

  const gameCompletedButtonLabels = ["Congratulations!", "Restart", "Menu"];

  const numpadClassNames = `numpad ${
    equalidownState.gameState === "solved" ? "numpad-game-completed" : ""
  }`;

  const buttons =
    equalidownState.gameState === "solved"
      ? gameCompletedButtonLabels.map((label, index) => (
          <button
            key={index}
            className="numpad-button numpad-game-completed-button"
            onClick={() =>
              dispatch({
                type: "GAME_COMPLETED_BUTTON_CLICK",
                key: [label, index],
              })
            }
          >
            {label}
          </button>
        ))
      : buttonLabels.map((label, index) => {
          const isDisabled =
            equalidownState.buttonState.includes(index) &&
            equalidownState.numpadNumber.includes(label);
          const buttonClassNames = `numpad-button ${
            isDisabled ? "numpad-disabled" : "numpad-active"
          }`;

          return (
            <button
              key={index}
              className={buttonClassNames}
              ref={index === 0 ? modelButtonRef : null}
              style={{ height: label === "Enter" ? "auto" : buttonWidth }}
              onClick={() =>
                dispatch({ type: "NUMPAD_BUTTON_CLICK", key: [label, index] })
              }
              disabled={isDisabled}
            >
              {label}
            </button>
          );
        });

  return <div className={numpadClassNames}>{buttons}</div>;
};

export default Numpad;
