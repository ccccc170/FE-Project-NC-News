import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/">All Articles</Link>
      <Link to="/topics">My Profile</Link>
    </nav>
  );
};

export default Nav;
