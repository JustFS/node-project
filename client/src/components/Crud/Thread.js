import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { isEmpty } from "../Utils";
import { getPosts } from "../../actions/post.actions";

const Thread = () => {
  const [play, setPlay] = useState(true);
  const posts = useSelector((state) => state.postReducer);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 4 >=
      document.scrollingElement.scrollHeight
    )
      setPlay(true);
  };

  useEffect(() => {
    if (play) {
      dispatch(getPosts(count));
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
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
