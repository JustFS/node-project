import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Api from "./pages/Api";
import MostLiked from "./pages/MostLiked";
import { UidContext } from "./components/AppContext";
import axios from 'axios';

const App = () => {
  const [uid, setUid] = useState(null);

  const getData = async() => {
    await axios
      .get("http://localhost:5500/api/user/jwtid")
      .then(res => console.log(res))
      .then((res) => res)
      .then((res) => {
        setUid(res);
      });
  };

  useEffect(() => {
    let isMount = true
    getData().then(data => {
      if (isMount) setUid(data);
    })
    return () => isMount = false;
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profil" component={Profil} />
          <Route path="/api" component={Api} />
          <Route path="/liked" component={MostLiked} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </UidContext.Provider>
  );
};

export default App;
