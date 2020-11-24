import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";
import { getPosts } from "../actions/post.actions";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const posts = useSelector((state) => state.postReducer);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop +1 >
      document.scrollingElement.scrollHeight
    )
    setLoadPost(true);
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => {
      window.removeEventListener("scroll", loadMore);
    };
  }, [loadPost]);

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
