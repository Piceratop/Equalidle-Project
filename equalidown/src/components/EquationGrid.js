import { useContext, useEffect } from "react";
import { equalidownContext } from "../contexts/equalidown";

const EquationGrid = () => {
  const [equalidownState, dispatch] = useContext(equalidownContext);

  useEffect(() => {
    const symbols = document.querySelectorAll(".current-equation-symbol");
    symbols.forEach((symbol) => {
      recalculateFontSize(symbol);
    });

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [equalidownState.equationState]);

  const handleResize = () => {
    const symbols = document.querySelectorAll(".current-equation-symbol");
    symbols.forEach((symbol) => {
      recalculateFontSize(symbol);
    });
  };

  const recalculateFontSize = (el) => {
    if (el) {
      const maxWidth = el.offsetWidth;
      const fontSize = maxWidth / el.innerText.length;
      const maxFontSize = "10vw";
      el.style.fontSize = `min(${fontSize}px, ${maxFontSize})`;
      el.style.height = `${el.offsetWidth}px`;
    }
  };

  return (
    <div>
      <div className="current-equation-container">
        {equalidownState.equationState.length > 0 ? (
          equalidownState.equationState.map((symbol, index) => (
            <div
              className="current-equation-symbol"
              key={index}
              style={{
                width: `calc((100% - ${
                  equalidownState.equationState.length - 1
                }vw) / ${equalidownState.equationState.length})`,
                height: `0`,
                marginRight: `${
                  index === equalidownState.equationState.length - 1 ? 0 : 1
                }vw`,
              }}
            >
              {symbol}
            </div>
          ))
        ) : (
          <div
            className="current-equation-symbol"
            style={{ width: "25vw", height: "25vw" }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default EquationGrid;
