import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Trends = () => {
  const [trendList, setTrendList] = useState();
  console.log("trendList:", trendList);
  const posts = useSelector((state) => state.postReducer);

  const handleTrendList = () => {
    const postsArr = Object.keys(posts).map((i) => posts[i]);
    let sortedArray = postsArr.sort((a, b) => {
      return b.likers.length - a.likers.length;
    });
    sortedArray.length = 5;
    setTrendList(sortedArray);
  };

  useEffect(() => {
    handleTrendList();
  }, [posts]);

  return (
    <div className="trending-container">
      <h4>Trending</h4>
      <ul>
        {trendList &&
          trendList.map((post) => {
            return (
              <li key={post._id}>
                <p>{post.message}</p>
                {post.picture && <img src={post.picture} alt="post-pic" />}
                {post.video && (
                  <iframe
                    src={post.video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Trends;
