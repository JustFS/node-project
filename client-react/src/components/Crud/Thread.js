import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const Thread = () => {
  const posts = useSelector((state) => state.postReducer);

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
