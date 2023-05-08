import { useContext } from "react";
import { equalidownContext } from "../contexts/equalidown";
import EquationGrid from "../components/EquationGrid";
import Numpad from "../components/Numpad";
const Equalidown = () => {
  const [equalidownState, dispatch] = useContext(equalidownContext);
  return (
    <main>
      <EquationGrid />
      <Numpad />
    </main>
  );
};

export default Equalidown;
