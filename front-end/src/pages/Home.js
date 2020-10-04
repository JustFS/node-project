import React, { useContext } from "react";
import Login from "../components/Login";
import NewQuoteForm from "../components/NewQuoteForm";
import Thread from "../components/Thread";
import { UidContext } from "../components/AppContext";

const Home = () => {

  const uid = useContext(UidContext);

  return (
    <div className="home">
      <div className="home-header">
        <h1>Le cercle des poètes disparus</h1>
        {uid ? <NewQuoteForm /> : <Login />}
      </div>
      <Thread />
    </div>
  );
};

export default Home;
