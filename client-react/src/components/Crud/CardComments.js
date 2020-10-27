import React, { useState } from "react";
import EditDeleteComment from "./EditDeleteComment";
import { timestampParser } from "../Utils";
import FollowHandler from "../Profil/FollowHandler";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/postActions";

const CardComments = ({ post, followers }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.user);

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.picture, userData.pseudo))
      .then(() => dispatch(getPosts()))
      .then(() => setText(""))  
  };
}

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
                  <h3>{comment.commenterPseudo}</h3>
                  {comment.commenterId !== userData._id && (
                    <FollowHandler
                      authorId={comment.commenterId}
                      followerId={userData._id}
                    />
                  )}
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}
      {userData._id && (
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
