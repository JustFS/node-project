import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { getThread } from "../../actions/thread.actions";
import { isEmpty } from "../Utils";

const Thread = () => {
  const [play, setPlay] = useState(true);
  const thread = useSelector((state) => state.threadReducer);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();

  const loadMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop ===
      document.scrollingElement.scrollHeight) setPlay(true);
  };

  useEffect(() => {
    if (play) {
      dispatch(getThread(count));
      setPlay(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => {
      window.removeEventListener("scroll", loadMore);
    };
  }, [play]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(thread[0]) &&
          thread.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
