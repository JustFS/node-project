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
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => setUid(res.data))
        .catch((err) => {
          console.log("Get Error : " + err);
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
