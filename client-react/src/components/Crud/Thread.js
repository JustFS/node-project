import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./Cards";

const Thread = () => {
  const [thread, setThread] = useState();

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/post`)
        .then((res) => res.data)
        .then((res) => {
          setThread(res);
        });
    };
    getData();
  });

  return (
    <div className="thread-container">
      <ul>
        {thread && thread.map((card) => <Cards card={card} key={card._id} />)}
      </ul>
    </div>
  );
};

export default Thread;
