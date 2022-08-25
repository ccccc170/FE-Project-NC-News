import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../utils/api";

const Comments = (article_id) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((fetchedComments) => {
      setComments(fetchedComments);
    });
  }, [article_id]);

  return (
    <section>
      <h4>Comments:</h4>
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
