const axios = require("axios");

export const getArticles = (topic) => {
  return axios
    .get("https://craigs-nc-news.herokuapp.com/api/articles", {
      params: { topic: topic },
    })
    .then((response) => {
      return response.data.articles;
    });
};

export const getTopics = () => {
  return axios
    .get("https://craigs-nc-news.herokuapp.com/api/topics")
    .then((response) => {
      return response.data.topics;
    });
};

export const getArticleById = (article_id) => {
  return axios
    .get(`https://craigs-nc-news.herokuapp.com/api/articles/${article_id}`, {})
    .then((response) => {
      return response.data.article;
    });
};
