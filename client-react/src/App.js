import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import Routes from "./components/Routes";

const App = () => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const isAuth = async () => {
      await axios({
        method: "get",
        url: "http://localhost:5500/jwtid",
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => {
          console.log("Post Error : " + err);
        });
    };
    isAuth();
  }, [uid]);
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
