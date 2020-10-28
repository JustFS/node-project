import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/userActions";

const GetFriends = () => {
  const usersData = useSelector((state) => state.userReducer.users);
  const userData = useSelector((state) => state.userReducer.user);
  const [friendHint, setFriendHint] = useState([""]);
  const dispatch = useDispatch();

  const notFriendList = () => {
    let array = [];
    if (usersData) {
      usersData.map((user) => {
        if (!user.following.includes(userData._id)) {
          array.push(user._id);
        }
      });
    }
    array.sort(() => 0.5 - Math.random())
    array.length = 10;
    setFriendHint(array);
  };

  useEffect(() => {
    dispatch(getUsers());
    notFriendList();
  }, [userData]);

  return (
    <div className="get-friends-container">
      <h4>Vous connaissez peut-être</h4>
      <ul>
        {friendHint && friendHint.map((user) => {
          
        })}
      </ul>
    </div>
  );
};

export default GetFriends;
