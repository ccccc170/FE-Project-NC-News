import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById } from "../utils/api";

const Article = () => {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then((fetchedArticle) => {
      setArticle(fetchedArticle);
    });
  }, []);

  return (
    <section className="single_article">
      <Link to="/">Back</Link>
      <h3 className="single_article_title">{article.title}</h3>
      <h4>topic: {article.topic}</h4>
      <h5>written by: {article.author}</h5>
      <h5>posted: {article.created_at}</h5>
      <p>{article.body}</p>
      <div className="votes_and_comments">
        <h6 className="votes_and_comments_child1">votes: {article.votes}</h6>{" "}
        <h6 className="votes_and_comments_child2">
          comments: {article.comment_count}
        </h6>
      </div>
    </section>
  );
};

export default Article;
