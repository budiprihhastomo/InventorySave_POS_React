import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Views/Home/Home";
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
          <Route path="/" exact component={props => <Home {...props} />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<RouterPage />, document.getElementById("root"));
