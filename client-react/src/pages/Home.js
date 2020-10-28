import React, { useContext } from "react";
import Log from "../components/Log";
import NewQuoteForm from "../components/Crud/NewQuoteForm";
import Thread from "../components/Crud/Thread";
import { UidContext } from "../components/AppContext";
// import GetFriends from "../components/Profil/GetFriends";

const Home = () => {

  const uid = useContext(UidContext);

  return (
    <div className="home">
      <div className="home-header">
        {uid ? <NewQuoteForm /> : <Log />}
      </div>
      {/* <GetFriends /> */}
      <Thread />
    </div>
  );
};

export default Home;
