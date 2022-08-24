import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, updateVotes } from "../utils/api";

const Article = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then((fetchedArticle) => {
      setArticle(fetchedArticle);
      setLoading(false);
    });
  }, [article_id, article.votes]);

  const incrementClick = (increment) => {
    setVotes((currVotes) => {
      return currVotes + increment;
    });
    updateVotes(increment, article_id)
      .then((article) => {
        setArticle(article);
        setVotes(0);
      })
      .catch((err) => {
        console.log(err);
        window.alert("Something went wrong, please try again!");
        setVotes(0);
      });
  };

  return loading ? (
    <h3>loading...</h3>
  ) : (
    <section className="single_article">
      <Link to="/">Back</Link>
      <h3 className="single_article_title">{article.title}</h3>
      <h4>topic: {article.topic}</h4>
      <h5>written by: {article.author}</h5>
      <h5>posted: {article.created_at}</h5>
      <p>{article.body}</p>
      <div className="votes_and_comments">
        <h6 className="votes_and_comments_child1">
          votes: {votes + article.votes}
        </h6>
        <button
          onClick={() => {
            incrementClick(1);
          }}
          className="votes_and_comments_child2"
        >
          👍
        </button>
        <button
          onClick={() => {
            incrementClick(-1);
          }}
          className="votes_and_comments_child3"
        >
          👎
        </button>
        <h6 className="votes_and_comments_child4">
          comments: {article.comment_count}
        </h6>
      </div>
    </section>
  );
};

export default Article;
