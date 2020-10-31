import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const Thread = () => {
  const [postsList, setPostsList] = useState(null)
  const [playOnce, setPlayOnce] = useState(true);
  const posts = useSelector((state) => state.postReducer);

  // const postsShowed = () => {
  //   let postsArr = posts;
  //   setPostsList(postsArr);
  // }
  // useEffect(() => {
  //   if (posts.length && playOnce){
  //     postsShowed();
  //     setPlayOnce(false);
  //   }
  // }, [posts])

  return (
    <div className="thread-container">
      <ul>
        {posts.length &&
          posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
