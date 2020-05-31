import React from "react";
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Users from "../components/Users";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import SplitHome from "../components/split/SplitHome";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/users" exact component={Users} />
      <Route path="/sign_up" exact component={SignUp} />
      <Route path="/login" exact component={Login} />

      <Route path="/split" exact component={SplitHome} />
    </Switch>
  </Router>
);