import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  if (location.pathname === "/game") {
    return <header className="hidden-header">Equalidown</header>;
  }

  return <header>Equalidown</header>;
};

export default Header;
