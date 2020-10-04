import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import NotFound from "./pages/NotFound";
import { UidContext } from "./components/AppContext";
import Navbar from "./components/Navbar";
import Api from "./pages/Api";
import MostLiked from "./pages/MostLiked";

const App = () => {
  const [uid, setUid] = useState(null);

  return (
    <UidContext.Provider value={null}>
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
