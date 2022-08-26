const axios = require("axios");

export const getArticles = (params) => {
  return axios
    .get("https://craigs-nc-news.herokuapp.com/api/articles", {
      params,
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
    .get(`https://craigs-nc-news.herokuapp.com/api/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    });
};

export const updateVotes = (inc_votes, article_id) => {
  return axios
    .patch(`https://craigs-nc-news.herokuapp.com/api/articles/${article_id}`, {
      inc_votes,
    })
    .then((response) => {
      return response.data.article;
    });
};

export const getCommentsByArticleId = ({ article_id }) => {
  return axios
    .get(
      `https://craigs-nc-news.herokuapp.com/api/articles/${article_id}/comments`
    )
    .then((response) => {
      return response.data.comments;
    });
};

export const postComment = (newComment, { article_id }) => {
  return axios
    .post(
      `https://craigs-nc-news.herokuapp.com/api/articles/${article_id}/comments`,
      newComment
    )
    .then((response) => {
      return response.data.comment;
    });
};

export const deleteComment = (comment_id) => {
  return axios
    .delete(`https://craigs-nc-news.herokuapp.com/api/comments/${comment_id}`)
    .then((response) => {
      return response;
    });
};
