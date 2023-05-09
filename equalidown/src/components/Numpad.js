import { useContext, useRef, useState, useEffect } from "react";
import { equalidownContext } from "../contexts/equalidown";

const Numpad = () => {
  const [equalidownState, dispatch] = useContext(equalidownContext);
  const modelButtonRef = useRef(null);
  const [buttonWidth, setButtonWidth] = useState(0);

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
  }, [modelButtonRef, window.innerWidth]);

  const buttonLabels = [
    "÷",
    "×",
    "−",
    "+",
    "100",
    "50",
    "25",
    "Enter",
    "2",
    "3",
    "5",
    "Backspace",
    "♼",
  ];

  const buttons = buttonLabels.map((label, index) => (
    <button
      key={index}
      ref={index === 0 ? modelButtonRef : null}
      style={{ height: label === "Enter" ? "auto" : buttonWidth }}
      className="numpad-button"
      onClick={() => dispatch({ type: "NUMPAD_BUTTON_CLICK", key: label })}
    >
      {label}
    </button>
  ));

  return <div className="numpad">{buttons}</div>;
};

export default Numpad;
