import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.actions";
import { isEmpty } from "../Utils";

const FollowHandler = ({ idToFollow, type }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.user);

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed ? (
        <span onClick={handleUnfollow}>
          {type === "suggestion" && (
            <button className="unfollow-btn">Abonné</button>
          )}
          {type === "card" && <i className="fas fa-check-circle"></i>}
        </span>
      ) : (
        <span onClick={handleFollow}>
          {type === "suggestion" && (
            <button className="follow-btn">Suivre</button>
          )}
          {type === "card" && <i className="far fa-check-circle"></i>}
        </span>
      )}
    </>
  );
};

export default FollowHandler;
