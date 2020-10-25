import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/actionsRoot";

const FollowHandler = ({ posterId, followerId }) => {
  const [alreadyFollow, setAlreadyFollow] = useState(false);
  const [followingList, setFollowingList] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handleFollow = (url, bool) => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/` + url + `/` + followerId,
      data: {
        idTo: posterId,
      },
    })
      .then(() => setAlreadyFollow(bool))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
// A REVOIR

    if (followingList && followerId) {
      if (followingList.includes(posterId)) setAlreadyFollow(true);
    }
  }, [posterId, followingList]);

  return (
    <>
      {alreadyFollow && (
        <span onClick={() => handleFollow("unfollow", false)}>
          <i className="fas fa-check-circle"></i>
        </span>
      )}
      {alreadyFollow === false && (
        <span onClick={() => handleFollow("follow", true)}>
          <i className="far fa-check-circle"></i>
        </span>
      )}
    </>
  );
};

export default FollowHandler;
