import React from "react";
import MyNav from "./components/Navbar/MyNav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import SignUp from "./components/Auth/SignUp";

const App = () => {
  return (
    <div className="app">
      <Router>
        <MyNav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/auth/signup" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
