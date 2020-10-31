import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTrends } from '../../actions/trending.actions';

const Trends = () => {
  const [playOnce, setPlayOnce] = useState(true);
  const posts = useSelector((state) => state.postReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (posts.length && playOnce) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });
      sortedArray.length = 5;
      console.log(sortedArray);
      dispatch(getTrends(sortedArray));
      setPlayOnce(false);
    }
  }, [posts]);

  return (
    <div className="trending-container">
      <h4>Trending</h4>
      <NavLink exact to="/trending">
        <ul>
          {trendList.length &&
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
      </NavLink>
    </div>
  );
};

export default Trends;
