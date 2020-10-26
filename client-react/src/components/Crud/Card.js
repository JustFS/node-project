import React, { useState, useContext } from "react";
import DeleteCard from "./DeleteCard";
import { UidContext } from "../AppContext";
import LikeButton from "./LikeButton";
import CardComments from "./CardComments";
import { dateParser } from "../Utils";
import FollowHandler from "../Profil/FollowHandler";
import { useDispatch } from "react-redux";
import { getPosts, updatePost } from "../../actions/actionsRoot";

const Card = ({ post }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();

  const uid = useContext(UidContext);

  const handleShowComments = () => setShowComments(!showComments);

  const updateItem = async () => {
    if (textUpdate) {
      await dispatch(updatePost(post._id, textUpdate));
      dispatch(getPosts())
    }
    setIsUpdated(false);
  };

  return (
    <li className="card-container" key={post._id}>
      <div className="card-left">
        <img src={post.posterPic} alt="" />
      </div>
      <div className="card-right">
        <div className="card-header">
          <div className="pseudo">
            <h3>{post.posterPseudo}</h3>
            {post.posterId !== uid && (
              <FollowHandler posterId={post.posterId} followerId={uid} />
            )}
          </div>
          <span>publié le {dateParser(post.createdAt)}</span>
        </div>
        {isUpdated === false && (
          <>
            <p>{post.message}</p>
            {uid === post.posterId && (
              <div className="button-container">
                <button onClick={() => setIsUpdated(true)}>Modifier</button>
                <DeleteCard id={post._id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <i
                  onClick={handleShowComments}
                  className="far fa-comment-alt"
                ></i>
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <i className="fas fa-share-alt"></i>
            </div>
            {showComments && <CardComments post={post} />}
          </>
        )}
      </div>
      <span></span>
      {isUpdated && (
        <div className="update-post">
          <textarea
            defaultValue={post.message}
            onChange={(e) => setTextUpdate(e.target.value)}
          />
          <div className="button-container">
            <button onClick={updateItem}>Valider modification</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default Card;
