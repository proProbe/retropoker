import React from "react";
import { Provider } from "react-redux";
import ReactDom from "react-dom";
import Store from "./redux/store";
import Main from "./components/Main";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Provider store={Store}>
      <Router>
        <Route path="/" component={Main} />
      </Router>
    </ Provider>
  );
};

ReactDom.render(
  <App />,
  window.document.getElementById("react-app"),
);
