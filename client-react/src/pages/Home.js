import React, { useContext } from "react";
import Log from "../components/Log";
import NewQuoteForm from "../components/Crud/NewQuoteForm";
import Thread from "../components/Crud/Thread";
import { UidContext } from "../components/AppContext";
import FriendsHint from "../components/Profil/FriendsHint";
import Trends from "../components/Crud/Trends";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      <div className="main">
        <div className="home-header">{uid ? <NewQuoteForm /> : <Log />}</div>
        <Thread />
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

export default Home;
