import { useContext } from "react";
import { equalidownContext } from "../contexts/equalidown";

const EquationGrid = () => {
  const [equalidownState, dispatch] = useContext(equalidownContext);
  return (
    <div>
      <div className="target-number">{equalidownState["targetNumber"]}</div>
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
              ref={(el) => {
                if (el) {
                  const fontSize = parseFloat(
                    window.getComputedStyle(el).fontSize
                  );
                  const maxWidth = el.offsetWidth;
                  const maxFontSize = maxWidth / symbol.length;
                  el.style.fontSize = `${Math.min(fontSize, maxFontSize)}px`;
                  el.style.height = `${el.offsetWidth}px`;
                }
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
