import React, { useEffect, useState, useContext } from "react";
import { UidContext } from "../AppContext";
import axios from "axios";
import EditDeleteComment from "./EditDeleteComment";
import { timestampParser } from "../Utils";
import FollowHandler from "../Profil/FollowHandler";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/actionsRoot";

const CardComments = ({ post, followers }) => {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const uid = useContext(UidContext);

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      axios({
        method: "patch",
        url:
          `${process.env.REACT_APP_API_URL}api/post/comment-post/` + post._id,
        data: {
          commenterId: uid,
          commenterPic: pic,
          pseudo: name,
          text,
        },
      })
        .then((res) => setText(""))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (uid) {
      dispatch(getUser(uid));
    }
    setName(userData.pseudo);
    setPic(userData.picture);
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
