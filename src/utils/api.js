const axios = require("axios");

export const getArticles = () => {
  return axios
    .get("https://craigs-nc-news.herokuapp.com/api/articles")
    .then((response) => {
      return response.data.articles;
    });
};
