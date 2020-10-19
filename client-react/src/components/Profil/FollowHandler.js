import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const FollowHandler = ({ authorId, followerId }) => {
  const [alreadyFollow, setAlreadyFollow] = useState(false);
  const [followingList, setFollowingList] = useState([]);

  const handleFollow = (url, bool) => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/` + url + `/` + followerId,
      data: {
        idTo: authorId,
      },
    })
      .then(() => setAlreadyFollow(bool))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const followCheck = async () => {
      if (followerId) {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}api/user/` + followerId,
        })
          .then((res) => {
            setFollowingList(res.data.following);
          })
          .catch((err) => console.log(err));
      }
    };
    followCheck();

    if (followingList && followerId) {
      if (followingList.includes(authorId)) setAlreadyFollow(true);
    }
  }, [authorId, followerId, followingList]);

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
