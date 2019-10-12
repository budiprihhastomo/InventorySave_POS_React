import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./Views/Dashboard/Dashboard";
import Transaction from "./Views/Transaction/Transaction";
import "antd/dist/antd.css";

// React Redux Initialize
import { Provider } from "react-redux";
import Store from "./Public/Redux/Store";

// Create Route App
const RouterPage = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" exact render={props => <Dashboard {...props} />} />
          <Route path="/transaction" exact render={props => <Transaction {...props} />} />
          <Redirect to="/dashboard"/>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<RouterPage />, document.getElementById("root"));
