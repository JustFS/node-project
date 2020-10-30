import React, { useState, useContext } from "react";
import DeleteCard from "./DeleteCard";
import { UidContext } from "../AppContext";
import LikeButton from "./LikeButton";
import CardComments from "./CardComments";
import { dateParser } from "../Utils";
import FollowHandler from "../Profil/FollowHandler";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "../../actions/postActions";
import { useEffect } from "react";
import { getUsers } from "../../actions/userActions";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [picture, setPicture] = useState("");
  const dispatch = useDispatch();
  const [playOnce, setPlayOnce] = useState(true);
  const usersData = useSelector((state) => state.userReducer.users);

  const uid = useContext(UidContext);

  const handleShowComments = () => setShowComments(!showComments);

  const updateItem = async () => {
    if (textUpdate) {
      await dispatch(updatePost(post._id, textUpdate)).then(() =>
        dispatch(getPosts())
      );
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    if (playOnce) {
      dispatch(getUsers());
      setPlayOnce(false);
    }

    usersData.map((user) => {
      if (user._id === post.posterId) {
        setPseudo(user.pseudo);
        setPicture(user.picture);
        setIsLoading(false);
      }
    });
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img src={picture} alt="" />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>{pseudo}</h3>
                {post.posterId !== uid && (
                  <FollowHandler idToFollow={post.posterId} type={'card'} />
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
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
            {post.picture && <img src={post.picture} alt="" />}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
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
          </div>
          <span></span>

        </>
      )}
    </li>
  );
};

export default Card;
