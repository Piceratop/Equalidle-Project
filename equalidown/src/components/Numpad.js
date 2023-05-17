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
    equalidownState.numpadNumber[0],
    equalidownState.numpadNumber[1],
    equalidownState.numpadNumber[2],
    "Enter",
    equalidownState.numpadNumber[3],
    equalidownState.numpadNumber[4],
    equalidownState.numpadNumber[5],
    "0",
    "(",
    ")",
    "Backspace",
    "♼",
  ];

  const buttons = buttonLabels.map((label, index) => (
    <button
      key={index}
      className="numpad-button"
      ref={index === 0 ? modelButtonRef : null}
      style={{ height: label === "Enter" ? "auto" : buttonWidth }}
      onClick={() => dispatch({ type: "NUMPAD_BUTTON_CLICK", key: label })}
    >
      {label}
    </button>
  ));

  return <div className="numpad">{buttons}</div>;
};

export default Numpad;
