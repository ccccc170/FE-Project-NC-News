import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const User = () => {
  const { user, setUser } = useContext(UserContext);

  const logOutUser = () => {
    setUser("Logged Out");
  };

  return (
    <div>
      <img src={user.avatar_url} alt="user profile"></img>
      <h3>{user.username}</h3>
      <h4>User information:</h4>
      <h5>Name: {user.name}</h5>
      <Link to="/login">
        <button
          onClick={() => {
            logOutUser();
          }}
        >
          Sign out
        </button>
      </Link>
    </div>
  );
};

export default User;
