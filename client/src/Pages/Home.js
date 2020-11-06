import React, { useContext } from "react";
import Log from "../components/Log";
import NewPostForm from "../components/Crud/NewPostForm";
import Thread from "../components/Crud/Thread";
import { UidContext } from "../components/AppContext";
import FriendsHint from "../components/Profil/FriendsHint";
import Trends from "../components/Crud/Trends";
import LeftNav from "../components/LeftNav";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">{uid ? <NewPostForm /> : <Log signin={true} signup={false} />}</div>
        <Thread />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
            {uid && <FriendsHint />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
