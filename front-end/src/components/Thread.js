import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./Cards";

const Thread = () => {
  const [thread, setThread] = useState();

  const getData = async() => {
    await axios
      .get("http://localhost:5500/api/post")
      .then((res) => res.data)
      .then((res) => {
        setThread(res);
      });
  };

  useEffect(() => {
    let isMount = true
    getData().then(data => {
      if (isMount) setThread(data);
    })
    return () => isMount = false;
  }, [thread]);

  return (
    <div className="thread-container">
      <ul>
        {thread &&
          thread.map((card, index) => <Cards card={card} key={index} />)}
      </ul>
    </div>
  );
};

export default Thread;
