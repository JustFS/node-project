import React, { useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { dateParser } from "../Utils";
import LikeButton from "./LikeButton";
import CardComments from "./CardComments";
import { useEffect } from "react";
import { getUsers } from "../../actions";


const Thread = () => {
  const posts = useSelector((state) => state.postReducer);
  const [isUpdated, setIsUpdated] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();

  const handleShowComments = () => setShowComments(!showComments);

  useEffect(() => {
    dispatch(getUsers);
  }, [])
  
  return (
    <div className="thread-container">
      <ul>
        {posts.length &&
          posts.map((post) => {
            return (
              <li className="card-container" key={post._id}>
                <div className="card-left">
                  <img src={post.userPic} alt="" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{post.pseudo}</h3>
                      {/* {card.userId !== uid && (
                        <FollowHandler
                          authorId={card.userId}
                          followerId={uid}
                        />
                      )} */}
                    </div>
                    <span>publié le {dateParser(post.createdAt)}</span>
                  </div>
                  {isUpdated === false && (
                    <>
                      <p>{post.message}</p>
                      {/* {uid === card.userId && ( */}
                        <div className="button-container">
                          <button onClick={() => setIsUpdated(true)}>
                            Modifier
                          </button>
                          {/* <DeleteCard id={card._id} /> */}
                        </div>
                      {/* )} */}
                      <div className="card-footer">
                        <div className="comment-icon">
                          <i
                            onClick={handleShowComments}
                            className="far fa-comment-alt"
                          ></i>
                          {/* <span>{card.comments.length}</span> */}
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
                      // onChange={(e) => setTextUpdate(e.target.value)}
                    />
                    <div className="button-container">
                      {/* <button onClick={updateItem}>Valider modification</button> */}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Thread;
{
  /* <Card card={card} key={card._id} */
}
