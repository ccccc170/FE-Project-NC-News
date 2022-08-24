import { useState, useEffect } from "react";
import { getArticles, getTopics } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const { topic } = useParams();

  useEffect(() => {
    getTopics().then((fetchedTopics) => {
      setTopics(fetchedTopics);
    });
  }, []);

  useEffect(() => {
    let params;
    if (topic) {
      params = { topic: topic };
    }
    getArticles(params).then((fetchedArticles) => {
      setArticles(fetchedArticles);
    });
  }, [topic]);

  const navigateTopic = (topicName) => {
    navigate(`/${topicName}`);
  };

  return (
    <section>
      <label htmlFor="topic-selector">Filter by topic:</label>
      <select name="topic-selector" id="topic-list">
        <option
          value="All topics"
          onClick={() => {
            navigateTopic("");
          }}
        >
          All topics
        </option>
        {topics.map((topic) => {
          return (
            <option
              value={topic.slug}
              onClick={() => {
                navigateTopic(topic.slug);
              }}
            >
              {topic.slug}
            </option>
          );
        })}
      </select>

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
      </ul>
    </section>
  );
};

export default Articles;
