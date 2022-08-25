import { useEffect, useState } from "react";
import { getCommentsByArticleId, postComment } from "../utils/api";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Comments = (article_id) => {
  const { user, setUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    getCommentsByArticleId(article_id).then((fetchedComments) => {
      setComments(fetchedComments);
    });
  }, [article_id]);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    if (commentText) {
      const newComment = { username: user.username, body: commentText };
      setComments((currComments) => {
        const newCommentData = {
          author: user.username,
          body: commentText,
          created_at: new Date().toISOString(),
          article_id: article_id,
        };
        return [newCommentData, ...currComments];
      });
      postComment(newComment, article_id).catch((err) => {
        // do I need a .then block, reset state?
        setComments((currComments) => {
          // will this work??? do i then need to update page again after???
          return currComments.map((currCom) => {
            return currCom.body !== commentText;
          });
        });
      });
    } else {
      window.alert("Please type a comment before trying to post!");
      // what instead of window alerts?
    }
  };

  return user === "Logged Out" ? (
    <section>
      <h4>Comments:</h4>
      <h5>
        Please <Link to="/login">sign in</Link> to post a comment
      </h5>
      {comments.map((comment) => {
        return (
          <div className="comment" key={comment.comment_id}>
            <h5 className="comment-author">{comment.author}</h5>
            <h6>Posted: {comment.created_at}</h6>
            <p>{comment.body}</p>
            <h6>votes: {comment.votes}</h6>
          </div>
        );
      })}
    </section>
  ) : (
    <section>
      <h4>Comments:</h4>
      <label htmlFor="comment-box">
        Post a comment as <Link to="/user">{user.username}</Link>:
        <form id="comment-box" className="comment-form">
          <textarea
            className="comment-input"
            onChange={(event) => {
              handleCommentChange(event);
            }}
          />
          <button
            className="comment-submit"
            type="sumbit"
            onClick={(event) => handleSubmitComment(event)}
          >
            Post
          </button>
        </form>
      </label>
      {comments.map((comment) => {
        return (
          <div className="comment" key={comment.comment_id}>
            <h5 className="comment-author">{comment.author}</h5>
            <h6>Posted: {comment.created_at}</h6>
            <p>{comment.body}</p>
            <h6>votes: {comment.votes}</h6>
          </div>
        );
      })}
    </section>
  );
};

export default Comments;
