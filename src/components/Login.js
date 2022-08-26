import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const myUser = {
    username: "grumpy19",
    name: "Paul Grump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  };

  const loginUser = () => {
    setUser(myUser);
  };

  return (
    <div>
      <img src={myUser.avatar_url} alt="user profile"></img>
      <h3>{myUser.username}</h3>
      <Link to="/user">
        <button
          onClick={() => {
            loginUser();
          }}
        >
          Sign in
        </button>
      </Link>
    </div>
  );
};

export default Login;
