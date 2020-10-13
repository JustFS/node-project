import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Navbar from "../Navbar";
import MostLiked from "../../pages/MostLiked";

const index = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profil" exact component={Profil} />
        <Route path="/liked" exact component={MostLiked} />
        <Redirect to='/' />
      </Switch>
    </Router>
  );
};

export default index;
