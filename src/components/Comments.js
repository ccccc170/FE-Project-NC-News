import { useEffect, useState } from "react";
import {
  deleteComment,
  getCommentsByArticleId,
  postComment,
} from "../utils/api";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Comments = (article_id) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((fetchedComments) => {
      const sortedComments = fetchedComments.sort((a, b) => {
        return a.created_at > b.created_at
          ? -1
          : a.created_at < b.created_at
          ? 1
          : 0;
      });
      setComments(sortedComments);
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
        setIsError(true);
        setComments((currComments) => {
          return currComments.filter((currCom) => {
            return currCom.body !== commentText;
          });
        });
      });
      setCommentText("");
    } else {
      window.alert("Please type a comment before trying to post!");
    }
  };

  const handleDelete = (event, comment) => {
    event.preventDefault();
    setComments((currComments) => {
      return currComments.filter((currCom) => {
        return currCom.comment_id !== comment.comment_id;
      });
    });
    deleteComment(comment.comment_id).catch((err) => {
      setComments((currComments) => {
        return [comment, ...currComments];
      });
    });
  };

  return (
    <section>
      <h4>Comments:</h4>
      {user === "Logged Out" ? (
        <h5>
          Please <Link to="/login">sign in</Link> to post a comment
        </h5>
      ) : (
        <label htmlFor="comment-box">
          Post a comment as <Link to="/user">{user.username}</Link>:
          <form id="comment-box" className="comment-form">
            <textarea
              className="comment-input"
              maxLength="500"
              value={commentText}
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
            {isError ? (
              <h5>
                Unable to post comment, please refresh the page and try again!
              </h5>
            ) : null}
          </form>
        </label>
      )}
      {comments.map((comment) => {
        return (
          <div className="comment" key={comment.created_at}>
            <h5 className="comment-author">{comment.author}</h5>
            <h6>Posted: {comment.created_at}</h6>
            <p>{comment.body}</p>
            <h6>votes: {comment.votes}</h6>
            {comment.author === user.username ? (
              <div className="delete-comment-section">
                <label htmlFor="delete-button">Delete comment:</label>
                <button
                  id="delete-button"
                  onClick={(event) => {
                    handleDelete(event, comment);
                  }}
                >
                  x
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
    </section>
  );
};

export default Comments;
