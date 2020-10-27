import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../actions/userActions';

const GetFriends = () => {
  const usersData = useSelector((state) => state.userReducer.users);
  const userData = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [])

  return (
    <div className="get-friends-container">
      <h4>Vous connaissez peut-être</h4>
      {usersData && usersData.map(user => {
        user.filter(user._id !== userData._id)
      })}
    </div>
  );
};

export default GetFriends;