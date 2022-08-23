import { useState } from "react";
import { useEffect } from "react";
import { getArticles } from "../utils/api";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((fetchedArticles) => {
      setArticles(fetchedArticles);
    });
  }, []);

  return (
    <ul className="main_articles_list">
      {articles.map((article) => {
        return (
          <li key={article.article_id}>
            <h3>{article.title}</h3>
            <h4>topic: {article.topic}</h4>
            <h5>written by: {article.author}</h5>
            <h5>posted: {article.created_at}</h5>
            <p>{article.body}</p>
            <div className="votes_and_comments">
              <h6 className="votes_and_comments_child1">
                votes: {article.votes}
              </h6>{" "}
              <h6 className="votes_and_comments_child2">
                comments: {article.comment_count}
              </h6>
            </div>
          </li>
        );
      })}
      ;
    </ul>
  );
};

export default Articles;
