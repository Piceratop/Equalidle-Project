import { useContext, useEffect } from "react";
import TargetNumber from "../components/TargetNumber";
import EquationGrid from "../components/EquationGrid";
import Numpad from "../components/Numpad";
import { equalidownContext } from "../contexts/equalidown";

const Game = () => {
  const [equalidownState, dispatch] = useContext(equalidownContext);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const bigNumbers = shuffleArray([25, 50, 75, 100]);
    const chosenBigNumbers = bigNumbers.slice(0, 2);
    const smallNumbers = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * 9) + 1
    );
    const numpad = [...chosenBigNumbers, ...smallNumbers].sort((a, b) => b - a);
    dispatch({
      type: "SET_NUMPAD_NUMBER",
      payload: numpad,
    });
  }, []);

  return (
    <main>
      <TargetNumber />
      <EquationGrid />
      <Numpad />
    </main>
  );
};

export default Game;
