import { useContext } from "react";
import { equalidownContext } from "../contexts/equalidown";
import Menu from "../pages/Menu";
import Game from "../pages/Game";

const Equalidown = () => {
  const [equalidownState, dispatch] = useContext(equalidownContext);
  function renderPage() {
    switch (equalidownState.currentPage) {
      case "menu":
        return <Menu />;
      case "game":
        return <Game />;
      default:
        return <Menu />;
    }
  }
  return <>{renderPage()}</>;
};

export default Equalidown;
