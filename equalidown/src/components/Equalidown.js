import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { equalidownContext } from "../contexts/equalidown";

import Menu from "../pages/Menu";
import Game from "../pages/Game";
import Header from "./Header";

const Equalidown = () => {
  const [equalidownState, dispatch] = useContext(equalidownContext);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact Component={Menu} />
        <Route path="/game" Component={Game} />
      </Routes>
    </Router>
  );
};

export default Equalidown;
