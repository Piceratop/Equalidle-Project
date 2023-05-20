import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  if (location.pathname === "/game" && window.innerWidth < 768) {
    return null;
  }

  return <header>Equalidown</header>;
};

export default Header;
