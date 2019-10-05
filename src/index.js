import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Home from "./views/HomeView";
import Login from "./views/LoginView";
import Register from "./views/RegisterView";

const logoutUser = () => {
  localStorage.removeItem('auth-token')
  return window.location.href = `${process.env.REACT_APP_SERVER_HOST}`
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact render={props => <Home {...props} />} />
      <Route path="/login" exact render={props => <Login />} />
      <Route path="/logout" exact render={() => logoutUser()} />
      <Route path="/register" exact render={props => <Register />} />
      <Redirect to="/" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
