import React from "react";
import NewQuoteForm from "../components/NewQuoteForm";
import Thread from "../components/Thread";

const Home = () => {
  return (
    <div>
      <h1>Home, let me come home</h1>
      <NewQuoteForm />
      <Thread />
    </div>
  );
};

export default Home;
