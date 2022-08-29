import { useState, useEffect } from "react";
import { getArticles, getTopics } from "../utils/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [params, setParams] = useState({
    sort_by: "created_at",
    order: "desc",
  });
  const [mainError, setMainError] = useState(null);
  const { topic } = useParams();

  useEffect(() => {
    getTopics().then((fetchedTopics) => {
      setTopics(fetchedTopics);
    });
  }, []);

  useEffect(() => {
    if (topic) {
      params.topic = topic;
    }
    getArticles(params)
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setLoading(false);
      })
      .catch((err) => {
        setMainError(err);
      });
  }, [topic, params]);

  const navigateTopic = (topicName) => {
    navigate(`/${topicName}`);
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrder = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortClick = () => {
    setParams({ sort_by: sortBy, order: sortOrder });
  };

  if (!mainError) {
    return loading ? (
      <h3>loading...</h3>
    ) : (
      <section>
        <div className="topic-filter">
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
                  key={topic.slug}
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
        </div>
        <div className="sort-by-and-order">
          <label htmlFor="sort-by-selector">Sort articles by:</label>
          <select name="sort-by-selector" onChange={handleSortBy}>
            <option value="created_at">date</option>
            <option value="comment_count">comment count</option>
            <option value="votes">votes</option>
          </select>
          <label htmlFor="order-selector">Order articles:</label>
          <select onChange={handleSortOrder}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
          <button onClick={handleSortClick} className="sort-button">
            Sort
          </button>
        </div>

        <ul className="main_articles_list">
          {articles.map((article) => {
            return (
              <li key={article.article_id}>
                <Link to={"/articles/" + article.article_id}>
                  <h3>{article.title}</h3>
                </Link>
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
  } else {
    return <ErrorPage err={mainError} />;
  }
};

export default Articles;
