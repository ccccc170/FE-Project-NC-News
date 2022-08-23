import { useEffect } from "react";
import { getArticles } from "../utils/api";

const Home = (props) => {
  useEffect(() => {
    console.log("testing");
    getArticles().then((fetchedArticles) => {
      console.log(fetchedArticles, "back in home");
      props.setArticles(fetchedArticles);
    });
  }, []);
  return (
    <div>
      <h3>Todays top news:</h3>
      {/* <p>{console.log(props.articles.length)}</p> */}
      <ul>
        <li>h</li>
        <li>h</li>
        <li>h</li>
      </ul>
    </div>
  );
};

export default Home;
