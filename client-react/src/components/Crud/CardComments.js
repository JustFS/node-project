import React, { useEffect, useState, useContext } from "react";
import { UidContext } from "../AppContext";
import EditDeleteComment from "./EditDeleteComment";
import { timestampParser } from "../Utils";
import FollowHandler from "../Profil/FollowHandler";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts, getUser } from "../../actions/actionsRoot";

const CardComments = ({ post, followers }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.user);
  const uid = useContext(UidContext);

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, uid, text, userData.picture, userData.pseudo));
      dispatch(getPosts());
      setText("")    
  };
}

  useEffect(() => {
    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid]);

  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <div className="comment-container" key={comment._id}>
            <div className="left-part">
              <img src={comment.commenterPic} alt="profil-pic" />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.pseudo}</h3>
                  {comment.commenterId !== uid && (
                    <FollowHandler
                      authorId={comment.commenterId}
                      followerId={uid}
                    />
                  )}
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} cardId={post._id} />
            </div>
          </div>
        );
      })}
      {uid && (
        <form onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laissez un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComments;
