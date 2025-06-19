import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu-container">
      <Link to="/game" className="menu-link">
        Play
      </Link>
    </div>
  );
};

export default Menu;
