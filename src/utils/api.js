const axios = require("axios");

export const getArticles = (params) => {
  return axios
    .get("https://craigs-nc-news.herokuapp.com/api/articles", {
      params: params,
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
