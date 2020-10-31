import React, { useState, useContext, useEffect } from "react";
import { UidContext } from "../AppContext";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const uid = useContext(UidContext);

  const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true);
  };
  const unlike = () => {
    dispatch(unlikePost(post._id, uid))
    setLiked(false);
  }

  useEffect(() => {
      if (post.likers.includes(uid)) setLiked(true);
      else setLiked(false);

  }, [uid, post.likers, liked]);

  return (
    <div className="like-container">
      {uid === null &&
          <Popup trigger={<i className="far fa-heart"></i>} position={['bottom center', 'bottom right', 'bottom left']} closeOnDocumentClick>
          <div>Connectez-vous pour aimer un post !</div>
        </Popup>
      }
      {uid && liked === false && (
        <i onClick={like} className="far fa-heart"></i>
      )}
      {uid && liked && (
        <i onClick={unlike} className="fas fa-heart"></i>
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
