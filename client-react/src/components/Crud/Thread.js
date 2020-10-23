import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from "../../actions/postsActions";

const Thread = () => {
  // get State
  const test = useSelector(state => state.userReducer.allUsers);
  // send action
  const dispatch = useDispatch();


  return (
    <div className="thread-container">
      <ul>Yo {test}</ul>
      <button onClick={() => dispatch(getPosts())}>APPUIE !</button>
    </div>
  );
};

export default Thread;