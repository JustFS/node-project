import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Card from "../components/Crud/Card";
import Trends from "../components/Crud/Trends";
import LeftNav from "../components/LeftNav";
import FriendsHint from "../components/Profil/FriendsHint";

const Trending = () => {
  const trendList = useSelector((state) => state.trendingReducer);

  return (
    <div className="trending-page">
      <LeftNav />
      <div className="main">
        <ul>
          {trendList.length && trendList.map((post) => <Card post={post} key={post._id} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <Trends />
          <FriendsHint />
        </div>
      </div>
    </div>
  );
};

export default Trending;
