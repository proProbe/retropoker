import React from "react";
import { Provider } from "react-redux";
import ReactDom from "react-dom";
import Store from "./client/redux/store";
import App from "./client/App";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

const Application = () => {
  return (
    <Provider store={Store}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </ Provider>
  );
};

ReactDom.render(
  <Application />,
  window.document.getElementById("react-app"),
);
registerServiceWorker();
