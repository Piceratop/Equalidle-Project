import { useContext } from "react";
import { equalidownContext } from "../contexts/equalidown";

const EquationGrid = () => {
  const [equalidownState, dispatch] = useContext(equalidownContext);
  return (
    <div>
      <div className="target-number">123</div>
      <div className="current-equation"></div>
    </div>
  );
};

export default EquationGrid;
