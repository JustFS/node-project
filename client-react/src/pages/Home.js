import React, { useContext } from "react";
import Log from "../components/Log";
import NewQuoteForm from "../components/QuotesCrud/NewQuoteForm";
import Thread from "../components/QuotesCrud/Thread";
import { UidContext } from "../components/AppContext";

const Home = () => {

  const uid = useContext(UidContext);

  return (
    <div className="home">
      <div className="home-header">
        <h1>Quote App</h1>
        {uid ? <NewQuoteForm /> : <Log />}
      </div>
      <Thread />
    </div>
  );
};

export default Home;
