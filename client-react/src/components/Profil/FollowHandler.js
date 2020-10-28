import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userActions";

const FollowHandler = ({ authorId }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.user);

  const handleFollow = () => {
    dispatch(followUser(userData._id, authorId));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, authorId));
    setIsFollowed(false);
  };

  useEffect(() => {
      if (userData.following) {
        if (userData.following.includes(authorId)){
          setIsFollowed(true);
        } else setIsFollowed(false);
      } 
  }, [userData, authorId])

  return (
    <>
      {isFollowed ? (
        <span onClick={handleUnfollow}>
          <i className="fas fa-check-circle"></i>
        </span>
      ) : (
        <span onClick={handleFollow}>
          <i className="far fa-check-circle"></i>
        </span>
      )}
    </>
  );
};

export default FollowHandler;
