import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Router from "./config";
import HomePage from "../page/home";

class RouterComponent extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePage} exact />
          {Router.map((item) => (
            <Route
              exact
              path={item.path}
              key={item.path}
              component={item.component}
            />
          ))}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouterComponent;
