import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Nav = () => {
  const { user, setUser } = useContext(UserContext);

  return user === "Logged Out" ? (
    <nav>
      <Link to="/">All Articles</Link>
      <Link className="login-button" to="/login">
        Sign in
      </Link>
    </nav>
  ) : (
    <nav>
      <Link to="/">All Articles</Link>
      <Link className="my-profile-link" to="/user">
        My Profile
      </Link>
    </nav>
  );
};

export default Nav;
