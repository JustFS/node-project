import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import NotFound from "../../pages/NotFound";
import Navbar from "../Navbar";
import MostLiked from "../../pages/MostLiked";

const index = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profil" component={Profil} />
        <Route path="/liked" component={MostLiked} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default index;
