import React, { useContext } from "react";
import Log from "../components/Log";
import NewQuoteForm from "../components/QuotesCrud/NewQuoteForm";
import Thread from "../components/QuotesCrud";
import { UidContext } from "../components/AppContext";

const Home = () => {

  const uid = useContext(UidContext);

  return (
    <div className="home">
      <div className="home-header">
        <h1>Le cercle des poètes disparus</h1>
        {uid ? <NewQuoteForm /> : <Log />}
      </div>
      <Thread />
    </div>
  );
};

export default Home;
