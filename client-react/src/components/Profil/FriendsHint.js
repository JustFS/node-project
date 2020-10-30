import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FollowHandler from "./FollowHandler";

const FriendsHint = () => {
  const [playOnce, setPlayOnce] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.userReducer.users);
  const userData = useSelector((state) => state.userReducer.user);
  const [friendsHint, setFriendsHint] = useState([""]);

  const notFriendList = () => {
    let array = [];
    usersData.map((user) => {
      if (!user.followers.includes(userData._id) && user._id !== userData._id) {
        array.push(user._id);
      }
    });
    array.sort(() => 0.5 - Math.random());
    array.length = 10;
    setFriendsHint(array);
  };

  useEffect(() => {
    if (playOnce && userData._id && usersData[0]._id) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData]);

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <ul>
          {friendsHint &&
            friendsHint.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                if (user === usersData[i]._id) {
                  return (
                    <li className="user-hint" key={user}>
                      <img src={usersData[i].picture} alt="user-pic" />
                      <p>{usersData[i].pseudo}</p>
                      <FollowHandler
                        idToFollow={usersData[i]._id}
                        type={"suggestion"}
                      />
                    </li>
                  );
                }
              }
            })}
        </ul>
      )}
    </div>
  );
};

export default FriendsHint;
